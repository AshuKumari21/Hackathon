import os
import sys
import json
import base64
import asyncio
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai
from google.genai import types
from fastapi.middleware.cors import CORSMiddleware

# Ensure UTF-8 output on Windows consoles
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')
if hasattr(sys.stderr, 'reconfigure'):
    sys.stderr.reconfigure(encoding='utf-8', errors='replace')

# ============================================================
# STARTUP
# ============================================================

load_dotenv()

app = FastAPI(title="BharatAI Healthcare API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================================
# GEMINI CLIENT — google-genai SDK 2.x
# ============================================================

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
_PLACEHOLDERS = {"", "your_actual_key", "YOUR_KEY_HERE"}
KEY_VALID = bool(GEMINI_API_KEY and GEMINI_API_KEY not in _PLACEHOLDERS)

# gemini-3.6-flash: current fast model for this account
GEMINI_MODEL = "gemini-3.6-flash"

gemini_client: genai.Client | None = None

if KEY_VALID:
    gemini_client = genai.Client(api_key=GEMINI_API_KEY)
    print(f"[STARTUP] google-genai SDK initialized. Model: {GEMINI_MODEL}")
else:
    gemini_client = None
    print("[STARTUP] WARNING: GEMINI_API_KEY is missing or is the placeholder.")
    print("[STARTUP] Edit .env -> set GEMINI_API_KEY=<your key> -> restart server.")

# ============================================================
# REQUEST SCHEMAS
# ============================================================

class ChatRequest(BaseModel):
    message: str
    language: str = "hi"
    conversation_id: str

class PrescriptionScanRequest(BaseModel):
    base64_image: str          # base64-encoded image or PDF data
    mime_type: str = "image/jpeg"   # e.g. image/jpeg, image/png, application/pdf
    language: str = "hi"       # preferred output language code

class MedicalDocumentAnalyzeRequest(BaseModel):
    base64_image: str          # base64-encoded image or PDF data
    mime_type: str = "image/jpeg"   # image/jpeg, image/png, application/pdf
    language: str = "hi"       # preferred output language code
    document_hint: str = "auto" # "prescription", "report", or "auto"

# ============================================================
# IN-MEMORY CONVERSATION STORE (keyed by conversation_id)
# ============================================================

conversations: dict = {}

# ============================================================
# SYSTEM INSTRUCTION — CHAT
# ============================================================

SYSTEM_INSTRUCTION = """
You are BharatAI — a multilingual Indian healthcare information assistant.

RULES:
1. Answer the user's CURRENT message using the conversation history for context.
2. NEVER restart with a welcome message. NEVER repeat your introduction.
3. NEVER invent diagnoses, prescriptions, dosages, or medical facts you are unsure of.
4. NEVER provide unsafe medical instructions.
5. If the user's message is unclear, ask a relevant clarifying question.
6. If emergency symptoms are detected (chest pain, stroke, severe bleeding, etc.),
   clearly advise urgent professional medical attention and set red_flag: true.
7. Respond in the user's selected/detected language (Hindi, English, Tamil, etc.).
8. Keep responses medically responsible, practical, and easy to understand.

OUTPUT FORMAT — respond ONLY in this exact JSON:
{
  "reply": "Your conversational response in the user's language",
  "language": "detected language code (e.g. hi, en, ta, te, bn, mr, pa)",
  "intent": "one of: SYMPTOM | MEDICINE_INFORMATION | DIET | MEDICAL_REPORT | FIRST_AID | GREETING | GENERAL_HEALTH | EMERGENCY",
  "confidence": 0.95,
  "red_flag": false,
  "sources": ["BharatAI"]
}
"""

# ============================================================
# SYSTEM INSTRUCTION — PRESCRIPTION VISION OCR
# ============================================================

PRESCRIPTION_VISION_PROMPT = """
You are an expert clinical OCR system specializing in reading handwritten and printed Indian medical prescriptions.

TASK: Analyze the provided prescription image and extract all medicine information.

STRICT RULES:
1. Extract ONLY what is clearly visible in the image. Do NOT invent or assume medicine names.
2. If the handwriting is unclear or a field is unreadable, use null for that field and lower the confidence score.
3. If the image does NOT appear to be a prescription (e.g. it's a blood report, food photo, or random image), set is_prescription: false.
4. Detected conditions must be inferred only from clearly stated diagnoses or medicine classes (e.g. Metformin → Type 2 Diabetes).
5. Assign a per-medicine confidence score (0.0–1.0) based on how clearly each line was read.
6. Overall confidence_score is the average of all medicine confidences.
7. is_low_confidence = true when overall confidence_score < 0.70.

OUTPUT FORMAT — respond ONLY in this exact JSON (no markdown, no extra text):
{
  "is_prescription": true,
  "patient_name": "Name from Rx or null",
  "clinic_name": "Doctor/Clinic name from Rx or null",
  "date": "Date from Rx or null",
  "raw_ocr_text": "The full raw text extracted from the image verbatim",
  "confidence_score": 0.92,
  "is_low_confidence": false,
  "detected_conditions": ["Type 2 Diabetes", "Hypertension"],
  "medicines": [
    {
      "brand_name": "Glycomet",
      "generic_name": "Metformin",
      "dosage": "500mg",
      "frequency": "Twice daily",
      "timing": "After food",
      "duration": "30 days",
      "confidence": 0.97
    }
  ],
  "pharmacist_note": "Any note if something was unclear or safety concern"
}
"""

# ============================================================
# DIAGNOSTIC ENDPOINT
# ============================================================

@app.get("/api/health/status")
async def health_status():
    """Open in browser to verify key + SDK status."""
    return {
        "status": "ok",
        "gemini_key_configured": KEY_VALID,
        "sdk": "google-genai",
        "sdk_version": "2.19.0",
        "model": GEMINI_MODEL if KEY_VALID else None,
        "vision_endpoint": "/api/health/scan-prescription",
        "message": "Ready" if KEY_VALID else (
            "GEMINI_API_KEY is missing or is still the placeholder. "
            "Edit .env and restart the server."
        )
    }

# ============================================================
# PRESCRIPTION VISION SCAN ENDPOINT
# ============================================================

@app.post("/api/health/scan-prescription")
async def scan_prescription(request: PrescriptionScanRequest):
    """
    Accept a base64-encoded prescription image/PDF, run it through Gemini Vision,
    and return structured medicine extraction results.
    """
    if not gemini_client:
        raise HTTPException(
            status_code=503,
            detail=(
                "Gemini API key is not configured. "
                "Open .env in the project root, set GEMINI_API_KEY, "
                "then restart the backend server."
            )
        )

    # Validate base64 payload
    try:
        image_bytes = base64.b64decode(request.base64_image)
        if len(image_bytes) < 100:
            raise ValueError("Image too small")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 image data.")

    # Validate MIME type
    allowed_mimes = {"image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"}
    if request.mime_type not in allowed_mimes:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported MIME type '{request.mime_type}'. Supported: {allowed_mimes}"
        )

    try:
        # Build multimodal content: inline image + text prompt
        response = await asyncio.wait_for(
            gemini_client.aio.models.generate_content(
                model=GEMINI_MODEL,
                contents=[
                    types.Part.from_bytes(
                        data=image_bytes,
                        mime_type=request.mime_type,
                    ),
                    types.Part.from_text(text=PRESCRIPTION_VISION_PROMPT),
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1,      # Very low temp for deterministic OCR extraction
                    max_output_tokens=2048,
                ),
            ),
            timeout=45.0   # Vision calls are slower; 45s is safe
        )

        response_text = response.text or ""

        try:
            data = json.loads(response_text)
        except json.JSONDecodeError:
            # Try stripping markdown fences if model disobeyed
            cleaned = response_text.replace("```json", "").replace("```", "").strip()
            try:
                data = json.loads(cleaned)
            except json.JSONDecodeError:
                raise HTTPException(
                    status_code=500,
                    detail="Gemini returned non-JSON response. Please try again."
                )

        # Normalize medicine keys to match frontend types (camelCase → snake_case already done)
        medicines_out = []
        for med in data.get("medicines", []):
            medicines_out.append({
                "id": f"rx-{len(medicines_out)+1}",
                "brandName":   med.get("brand_name") or med.get("brandName") or "Unknown",
                "genericName": med.get("generic_name") or med.get("genericName") or "",
                "dosage":      med.get("dosage") or "",
                "frequency":   med.get("frequency") or "",
                "timing":      med.get("timing") or "",
                "duration":    med.get("duration") or "",
                "confidence":  float(med.get("confidence", 0.85)),
            })

        confidence = float(data.get("confidence_score", 0.85))
        is_low = bool(data.get("is_low_confidence", confidence < 0.70))

        return {
            "is_prescription":      bool(data.get("is_prescription", True)),
            "patient_name":         data.get("patient_name"),
            "clinic_name":          data.get("clinic_name"),
            "date":                 data.get("date"),
            "raw_ocr_text":         data.get("raw_ocr_text", ""),
            "confidence_score":     confidence,
            "is_low_confidence":    is_low,
            "detected_conditions":  data.get("detected_conditions", []),
            "medicines":            medicines_out,
            "pharmacist_note":      data.get("pharmacist_note"),
        }

    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="Gemini Vision did not respond within 45 seconds. Please try again."
        )

    except HTTPException:
        raise  # Re-raise our own HTTP errors

# ============================================================
# SYSTEM INSTRUCTION — MEDICAL DOCUMENT & REPORT ANALYZER
# ============================================================

MEDICAL_DOCUMENT_ANALYZE_PROMPT = """
You are an expert clinical OCR and medical document analysis system specializing in reading Indian medical prescriptions, diagnostic reports, and laboratory test reports (CBC, Blood tests, Diabetes panels, Lipid profiles, Thyroid panels, LFT, KFT, Urine analysis, Vitamin profiles, etc.).

TASK:
1. Classify the document type accurately.
   Possible document_type values:
   "PRESCRIPTION", "BLOOD_REPORT", "CBC_REPORT", "DIABETES_REPORT", "LIPID_PROFILE", "LIVER_FUNCTION_TEST", "KIDNEY_FUNCTION_TEST", "THYROID_REPORT", "URINE_TEST", "VITAMIN_REPORT", "X_RAY_REPORT", "OTHER_LAB_REPORT", "UNKNOWN".
2. Extract Patient & Doctor/Clinic information if present (name, age, gender, date, doctor/clinic name).
3. If it is a PRESCRIPTION:
   - is_prescription: true, is_lab_report: false
   - Extract all medicines (brand_name, generic_name, dosage, frequency, timing, duration, confidence 0.0-1.0, special_instructions).
   - Extract important instructions printed on the Rx.
4. If it is a MEDICAL / LAB REPORT:
   - is_prescription: false, is_lab_report: true
   - Extract every test item:
     - name: Name of the test (e.g. Hemoglobin, Fasting Blood Glucose, HbA1c, Total Cholesterol, Platelets, SGPT, Creatinine, etc.)
     - value: Extracted test result value (e.g. "11.2", "148", "7.8")
     - unit: Unit of measurement (e.g. "g/dL", "mg/dL", "%", "/cumm")
     - reference_range: The reference range printed on the uploaded report (e.g. "13.0 - 17.0 g/dL"). IMPORTANT: Use the exact range printed on the report. Do NOT invent if missing!
     - status: "NORMAL" if within reference range, "NEEDS_ATTENTION" if outside reference range, or "CRITICAL" if significantly out of range (e.g. Platelets < 50000 or Glucose > 250).
     - explanation: 1 short sentence in simple non-medical educational language explaining what this test measures.
     - confidence: OCR extraction confidence (0.0 to 1.0).
5. Generate Overall Summary:
   - plain_language_overview: Clear, respectful, educational summary. NEVER diagnose diseases ("You definitely have diabetes"). Use wording: "This value is outside the reference range shown on the report. A clinician should interpret it together with your symptoms and history."
   - within_range_count: number of tests within reference range
   - needs_attention_count: number of tests outside reference range
   - important_count: number of critical or urgent tests
   - what_stands_out: 2-5 clear observations highlighting normal, attention, and critical findings.
   - doctor_questions: 3-5 specific questions the patient can ask their doctor based on these results.
   - safety_alert: If critical findings exist, state "PLEASE SEEK MEDICAL ATTENTION: Specific values are significantly outside normal limits. Consult a qualified physician promptly." Otherwise null.
6. Provide raw_ocr_text and confidence_score (average 0.0-1.0).

OUTPUT FORMAT — respond ONLY in this exact JSON (no markdown, no backticks, no extra text):
{
  "document_type": "CBC_REPORT",
  "document_type_label": "Complete Blood Count (CBC) Report",
  "document_type_confidence": 0.94,
  "is_prescription": false,
  "is_lab_report": true,
  "patient_info": {
    "name": "Patient Name or null",
    "age": "Age or null",
    "gender": "Gender or null",
    "date": "Date or null"
  },
  "doctor_info": {
    "doctor_name": "Doctor Name or null",
    "clinic_name": "Lab / Clinic name or null",
    "date": "Date or null"
  },
  "medicines": [],
  "test_results": [
    {
      "name": "Hemoglobin",
      "value": "11.2",
      "unit": "g/dL",
      "reference_range": "13.0 - 17.0 g/dL",
      "status": "NEEDS_ATTENTION",
      "explanation": "Hemoglobin carries oxygen from your lungs to the rest of your body.",
      "confidence": 0.96
    }
  ],
  "important_instructions": [],
  "overall_summary": {
    "plain_language_overview": "Summary text...",
    "within_range_count": 4,
    "needs_attention_count": 1,
    "important_count": 0,
    "what_stands_out": [
      {"level": "attention", "text": "Hemoglobin is below the report's reference range."},
      {"level": "normal", "text": "Platelet count is within the reference range."}
    ],
    "safety_alert": null
  },
  "doctor_questions": [
    "What could explain this result being outside the reference range?",
    "Do I need any follow-up tests or repeat evaluations?"
  ],
  "raw_ocr_text": "Verbatim text extracted from document",
  "confidence_score": 0.94,
  "is_low_confidence": false
}
"""

# ============================================================
# MEDICAL DOCUMENT ANALYZE ENDPOINT (PRESCRIPTIONS & REPORTS)
# ============================================================

@app.post("/api/health/analyze-document")
async def analyze_document(request: MedicalDocumentAnalyzeRequest):
    """
    Accepts base64 encoded document (image or PDF), performs AI OCR, classifies document
    type (Prescription vs Lab Report vs CBC vs Diabetes vs Lipid, etc.), extracts test values,
    reference ranges, medicines, safety warnings, and doctor questions.
    """
    if not gemini_client:
        raise HTTPException(
            status_code=503,
            detail=(
                "Gemini API key is not configured. "
                "Open .env in the project root, set GEMINI_API_KEY, "
                "then restart the backend server."
            )
        )

    # Validate base64 payload
    try:
        image_bytes = base64.b64decode(request.base64_image)
        if len(image_bytes) < 100:
            raise ValueError("Image payload too small")
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid base64 image data.")

    # Validate MIME type
    allowed_mimes = {"image/jpeg", "image/png", "image/webp", "image/heic", "application/pdf"}
    if request.mime_type not in allowed_mimes:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported MIME type '{request.mime_type}'. Supported: {allowed_mimes}"
        )

    hint_instruction = ""
    if request.document_hint == "prescription":
        hint_instruction = "\nHINT: The user uploaded this file as a PRESCRIPTION. Focus on medicine extraction, doctor instructions, and dosage schedules."
    elif request.document_hint == "report":
        hint_instruction = "\nHINT: The user uploaded this file as a MEDICAL / LAB REPORT. Focus on lab test values, reference ranges, and test status."

    full_prompt = f"{MEDICAL_DOCUMENT_ANALYZE_PROMPT}\n{hint_instruction}\nPREFERRED LANGUAGE: {request.language}"

    try:
        response = await asyncio.wait_for(
            gemini_client.aio.models.generate_content(
                model=GEMINI_MODEL,
                contents=[
                    types.Part.from_bytes(
                        data=image_bytes,
                        mime_type=request.mime_type,
                    ),
                    types.Part.from_text(text=full_prompt),
                ],
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.1,
                    max_output_tokens=3072,
                ),
            ),
            timeout=45.0
        )

        response_text = response.text or ""

        try:
            data = json.loads(response_text)
        except json.JSONDecodeError:
            cleaned = response_text.replace("```json", "").replace("```", "").strip()
            try:
                data = json.loads(cleaned)
            except json.JSONDecodeError:
                raise HTTPException(
                    status_code=500,
                    detail="Gemini returned a non-JSON response for document analysis. Please try again."
                )

        # Normalize medicines
        medicines_out = []
        for i, med in enumerate(data.get("medicines", [])):
            medicines_out.append({
                "id": f"med-{i+1}",
                "brandName": med.get("brand_name") or med.get("brandName") or "Unknown",
                "genericName": med.get("generic_name") or med.get("genericName") or "",
                "dosage": med.get("dosage") or "",
                "frequency": med.get("frequency") or "",
                "timing": med.get("timing") or "",
                "duration": med.get("duration") or "",
                "confidence": float(med.get("confidence", 0.85)),
                "specialInstructions": med.get("special_instructions") or med.get("specialInstructions") or "",
                "page": 1,
            })

        # Normalize test results
        test_results_out = []
        for i, test in enumerate(data.get("test_results", [])):
            val_str = str(test.get("value", ""))
            num_val = None
            try:
                # Try parsing numeric part
                import re
                match = re.search(r"[-+]?\d*\.?\d+", val_str)
                if match:
                    num_val = float(match.group())
            except Exception:
                num_val = None

            test_results_out.append({
                "id": f"test-{i+1}",
                "name": test.get("name") or "Unknown Test",
                "value": val_str,
                "numericValue": num_val,
                "unit": test.get("unit") or "",
                "referenceRange": test.get("reference_range") or test.get("referenceRange") or "Not Specified",
                "status": test.get("status") or "NORMAL",
                "confidence": float(test.get("confidence", 0.90)),
                "page": 1,
                "explanation": test.get("explanation") or "",
            })

        confidence = float(data.get("confidence_score", 0.90))
        is_low = bool(data.get("is_low_confidence", confidence < 0.70))

        doc_type = data.get("document_type", "UNKNOWN")
        is_prescription = bool(data.get("is_prescription", doc_type == "PRESCRIPTION"))
        is_lab_report = bool(data.get("is_lab_report", doc_type != "PRESCRIPTION" and len(test_results_out) > 0))

        return {
            "document_type": doc_type,
            "document_type_label": data.get("document_type_label") or doc_type.replace("_", " ").title(),
            "document_type_confidence": float(data.get("document_type_confidence", confidence)),
            "is_prescription": is_prescription,
            "is_lab_report": is_lab_report,
            "patient_info": data.get("patient_info", {}),
            "doctor_info": data.get("doctor_info", {}),
            "medicines": medicines_out,
            "test_results": test_results_out,
            "important_instructions": data.get("important_instructions", []),
            "overall_summary": data.get("overall_summary", {
                "plain_language_overview": "Analysis completed.",
                "within_range_count": len([t for t in test_results_out if t["status"] == "NORMAL"]),
                "needs_attention_count": len([t for t in test_results_out if t["status"] != "NORMAL"]),
                "important_count": 0,
                "what_stands_out": [],
                "safety_alert": None,
            }),
            "doctor_questions": data.get("doctor_questions", []),
            "raw_ocr_text": data.get("raw_ocr_text", ""),
            "confidence_score": confidence,
            "is_low_confidence": is_low,
        }

    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="Gemini Vision did not respond within 45 seconds. Please try again."
        )
    except HTTPException:
        raise
    except Exception as e:
        safe_err = str(e).replace(GEMINI_API_KEY, "[REDACTED]") if KEY_VALID else str(e)
        print(f"[ERROR] Gemini Vision document analysis failed: {safe_err}")
        raise HTTPException(
            status_code=500,
            detail=f"Gemini Vision API error: {safe_err[:400]}"
        )

# ============================================================
# CHAT ENDPOINT
# ============================================================

@app.post("/api/health/chat")
async def chat(request: ChatRequest):
    if not gemini_client:
        raise HTTPException(
            status_code=503,
            detail=(
                "Gemini API key is not configured. "
                "Open .env in the project root, set GEMINI_API_KEY, "
                "then restart the backend server."
            )
        )

    conv_id = request.conversation_id
    if conv_id not in conversations:
        conversations[conv_id] = []

    history = conversations[conv_id]
    history_text = (
        json.dumps(history, ensure_ascii=False) if history else "No previous messages."
    )

    prompt = (
        f"SYSTEM INSTRUCTION:\n{SYSTEM_INSTRUCTION}\n\n"
        f"CONVERSATION HISTORY (context only):\n{history_text}\n\n"
        f"LANGUAGE PREFERENCE: {request.language}\n\n"
        f"CURRENT USER MESSAGE:\n{request.message}\n\n"
        f"Respond ONLY with valid JSON as specified above."
    )

    try:
        # Strict 20-second timeout — never hangs indefinitely
        response = await asyncio.wait_for(
            gemini_client.aio.models.generate_content(
                model=GEMINI_MODEL,
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_mime_type="application/json",
                    temperature=0.4,
                    max_output_tokens=1024,
                ),
            ),
            timeout=20.0
        )

        response_text = response.text or ""
        print(f"[CHAT] raw response_text (first 300): {response_text[:300]!r}")

        try:
            data = json.loads(response_text)
        except json.JSONDecodeError:
            # Strip markdown code fences if model wrapped the JSON in them
            cleaned = response_text.replace("```json", "").replace("```", "").strip()
            try:
                # Second attempt: parse the cleaned text as JSON
                data = json.loads(cleaned)
                print(f"[CHAT] JSON parsed successfully after stripping fences.")
            except json.JSONDecodeError:
                # Final fallback: treat the entire cleaned text as a plain-text reply
                print(f"[CHAT] Could not parse as JSON; treating as plain-text reply.")
                data = {
                    "reply": cleaned or "I could not generate a response. Please try again.",
                    "language": request.language,
                    "intent": "GENERAL_HEALTH",
                    "confidence": 0.5,
                    "red_flag": False,
                    "sources": ["BharatAI"]
                }

        # Safety: if data.reply is itself a JSON string (double-encoded), unwrap it
        raw_reply = data.get("reply", "")
        if isinstance(raw_reply, str) and raw_reply.strip().startswith("{"):
            try:
                inner = json.loads(raw_reply)
                if isinstance(inner, dict) and "reply" in inner:
                    print(f"[CHAT] Detected double-encoded reply; unwrapping inner JSON.")
                    data = inner
            except json.JSONDecodeError:
                pass

        # Update conversation history
        conversations[conv_id].append({"role": "user", "message": request.message})
        conversations[conv_id].append({"role": "assistant", "message": data.get("reply", "")})

        # Keep last 20 turns (10 exchanges) to stay within context limits
        if len(conversations[conv_id]) > 20:
            conversations[conv_id] = conversations[conv_id][-20:]

        return {
            "reply":      data.get("reply", "No response generated."),
            "language":   data.get("language", request.language),
            "intent":     data.get("intent", "GENERAL_HEALTH"),
            "confidence": data.get("confidence", 0.95),
            "red_flag":   data.get("red_flag", False),
            "sources":    data.get("sources", ["BharatAI"]),
        }

    except asyncio.TimeoutError:
        raise HTTPException(
            status_code=504,
            detail="Gemini did not respond within 20 seconds. Please try again."
        )

    except Exception as e:
        safe_err = str(e).replace(GEMINI_API_KEY, "[REDACTED]") if KEY_VALID else str(e)
        print(f"[ERROR] Gemini call failed: {safe_err}")
        raise HTTPException(
            status_code=500,
            detail=f"Gemini API error: {safe_err[:400]}"
        )

# ============================================================
# PRODUCTION ENTRYPOINT
# ============================================================
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    print(f"[STARTUP] Starting server on 0.0.0.0:{port}...")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=False)
