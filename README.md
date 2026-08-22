# 🇮🇳 BharatAI Healthcare Assistant

> **Multilingual • AI-Powered • Voice-Enabled • Prescription & Medical Report Understanding**

An AI-powered, multilingual healthcare information assistant designed for Bharat, offering prescription OCR, medical lab report analysis, voice interaction, text-to-speech, and context-aware conversational health guidance in 14 regional Indian languages.

---

![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?logo=python&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-3.6--Flash-8E44AD?logo=google-gemini&logoColor=white)

---

## 📌 Table of Contents
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [Key Features](#-key-features)
- [How It Works](#-how-it-works)
- [Multilingual Support](#-multilingual-support)
- [AI Healthcare Chat](#-ai-healthcare-chat)
- [Conversation Memory](#-conversation-memory)
- [Medicine Information](#-medicine-information)
- [Prescription OCR \& Analysis](#-prescription-ocr--analysis)
- [Medical Report Analysis](#-medical-report-analysis)
- [Voice Interaction](#-voice-interaction)
- [Text-to-Speech (TTS)](#-text-to-speech-tts)
- [Healthcare Safety](#-healthcare-safety)
- [System Architecture](#-system-architecture)
- [Technical Architecture](#-technical-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation \& Setup](#-installation--setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Environment Variables](#-environment-variables)
- [Running the Project](#-running-the-project)
- [API Endpoints](#-api-endpoints)
- [Prescription/Report Upload Flow](#-prescriptionreport-upload-flow)
- [Example User Conversations](#-example-user-conversations)
- [Security](#-security)
- [Bharat-Focused Design](#-bharat-focused-design)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Future Scope](#-future-scope)
- [Healthcare Disclaimer](#-healthcare-disclaimer)
- [Team](#-team)
- [License](#-license)

---

## 🎯 Problem Statement

Healthcare information across India is often inaccessible and difficult to comprehend due to:

- **Complex Medical Terminology**: Diagnostic lab reports contain technical values (e.g., *HbA1c*, *Platelet Count*, *SGPT*) with reference ranges that patients struggle to interpret.
- **English-Heavy Digital Portals**: Most medical apps and patient portals only provide information in English, creating a language barrier for non-English speakers.
- **Handwritten Prescriptions**: Doctor prescriptions contain handwriting, Latin dosage codes (*BD*, *TDS*, *PC*), and abbreviated brand names.
- **Language Barriers**: Millions of Indian citizens prefer conversing in regional languages (Hindi, Bengali, Tamil, Telugu, Marathi, Punjabi, etc.).
- **Limited Technical Literacy**: Complex UI navigation prevents rural and elderly patients from getting quick answers about their medications and symptoms.

---

## 💡 Our Solution

**BharatAI Healthcare Assistant** bridges the healthcare comprehension gap by providing an intuitive, multilingual, and voice-assisted digital health companion.

Users can:
- **Ask Health Queries**: Receive empathetic, structured health guidance in their native dialect.
- **Upload Handwritten Prescriptions**: Extract medicine brand names, generic formulas, dosage schedules, and timing instructions using AI Vision OCR.
- **Upload Diagnostic Reports**: Analyze CBC, Diabetes, Lipid Profile, and Blood test reports to receive plain-language reference range evaluations.
- **Multi-Turn Context Conversations**: Continue natural healthcare dialogues where the assistant remembers previous symptom details.
- **Voice-Enabled Input \& Output**: Speak queries aloud and listen to synthesized regional voice responses.

---

## ✨ Key Features

| Feature Icon | Feature | Implemented Capability |
| :--- | :--- | :--- |
| 🧠 | **AI Healthcare Chat** | Real-time clinical AI conversational assistant powered by Google GenAI SDK. |
| 🌐 | **Multilingual Support** | Full translation & dialogue support across **14 regional Indian languages**. |
| 💬 | **Context-Aware Memory** | Multi-turn conversation tracking using `conversation_id` session mapping. |
| 💊 | **Medicine Knowledge Base** | Detailed generic composition, uses, side effects, and warnings for Indian pharmacopoeia medicines. |
| 📷 | **Prescription Vision OCR** | AI Vision pipeline extracting medicine names, dosage, frequency, and timing from Rx images. |
| 📄 | **Medical Report Analyzer** | Classifies lab reports (CBC, Diabetes, Lipid, Thyroid) and highlights values outside normal reference ranges. |
| 🎤 | **Voice Recognition** | Web Speech API speech-to-text allowing hands-free regional voice input. |
| 🔊 | **Text-to-Speech (TTS)** | Native cross-browser regional voice synthesis with BCP-47 locale matching and speed control. |
| 🛡️ | **Clinical Safety Gateway** | Emergency symptom detection (chest pain, stroke) triggering urgent red-flag alerts. |
| 📊 | **Structured Data Outputs** | All AI responses formatted in strict, validated JSON schemas. |

---

## ⚙️ How It Works

```
   +-------------------------------------------------------------+
   |                       USER INTERACTION                      |
   |           (Voice Query / Text / Image / PDF Upload)         |
   +------------------------------+------------------------------+
                                  |
                                  v
   +-------------------------------------------------------------+
   |                 FRONTEND (React 19 + TypeScript)             |
   |  - Regional Language State (Default: English)              |
   |  - Web Speech API (Speech Recognition & Speech Synthesis)   |
   |  - Client-Side Validation & Fallback Rules Engine           |
   +------------------------------+------------------------------+
                                  |
                                  | HTTP REST API (JSON / Base64)
                                  v
   +-------------------------------------------------------------+
   |                 FASTAPI BACKEND (Python 3.10+)               |
   |  - Host Binding: 0.0.0.0:$PORT                             |
   |  - In-Memory Conversation Memory Store                       |
   |  - System Prompts & Safety Guardrails                       |
   +------------------------------+------------------------------+
                                  |
                                  | Google GenAI SDK (gemini-3.6-flash)
                                  v
   +-------------------------------------------------------------+
   |                  GOOGLE GEMINI MULTIMODAL AI                |
   |  - Natural Language Reasoning & Context Processing          |
   |  - Multimodal Vision OCR (Prescriptions & Lab Reports)       |
   +------------------------------+------------------------------+
                                  |
                                  v
   +-------------------------------------------------------------+
   |                 STRUCTURED JSON RESPONSE                    |
   |  - Intent Classification & Clinical Explanation             |
   |  - Extracted Medicines & Reference Range Evaluations        |
   |  - Emergency Red Flags & Doctor Follow-up Questions         |
   +-------------------------------------------------------------+
```

---

## 🌐 Multilingual Support

BharatAI supports **14 regional languages**:

| Code | Language Name | Native Script | Voice Locale (BCP-47) |
| :--- | :--- | :--- | :--- |
| `en` | English *(Default)* | English | `en-IN` |
| `hi` | Hindi | हिन्दी | `hi-IN` |
| `bn` | Bengali | বাংলা | `bn-IN` |
| `te` | Telugu | తెలుగు | `te-IN` |
| `mr` | Marathi | मराठी | `mr-IN` |
| `ta` | Tamil | தமிழ் | `ta-IN` |
| `gu` | Gujarati | ગુજરાતી | `gu-IN` |
| `kn` | Kannada | ಕನ್ನಡ | `kn-IN` |
| `ml` | Malayalam | മലയാളം | `ml-IN` |
| `pa` | Punjabi | ਪੰਜਾਬੀ | `pa-IN` |
| `or` | Odia | ଓଡ଼ିଆ | `or-IN` |
| `as` | Assamese | অসমীয়া | `as-IN` |
| `ur` | Urdu | اردو | `ur-IN` |
| `bho` | Bhojpuri | भोजपुरी | `hi-IN` |

Language settings persist locally via `localStorage` (`swasthya_selected_language`) and fall back seamlessly to English.

---

## 💬 AI Healthcare Chat

The AI Chat system processes queries through the backend FastAPI service via `POST /api/health/chat`:

1. **System Prompt Guardrails**: Strictly instructs the model to act as an educational health assistant, avoid unsafe medical instructions, and format output as strict JSON.
2. **Server-Side API Key**: The `GEMINI_API_KEY` is loaded from server environment variables and is **never** exposed to the browser client.
3. **Offline Fallback Engine**: If the backend service is offline or unreachable, the frontend automatically falls back to an intelligent client-side rules engine (`AIChatAssistant.tsx`) to answer common symptom and medication questions safely.

---

## 🧠 Conversation Memory

BharatAI supports multi-turn dialogue memory:
- Every session generates a unique `conversation_id`.
- The FastAPI backend maintains an in-memory dictionary tracking up to **20 message exchanges** per session.
- Context is passed into subsequent Gemini prompts, allowing natural follow-up questions.

### Example Context Flow:
- **User (Turn 1)**: `"मुझे 2 दिन से तेज बुखार है"` *(I have had a high fever for 2 days)*
- **Assistant (Turn 1)**: Responds with fever care advice and asks if there are other symptoms like headache or body pain.
- **User (Turn 2)**: `"सिर में भी दर्द है"` *(Also have a headache)*
- **Assistant (Turn 2)**: Automatically understands that *"headache"* relates to the fever reported in Turn 1.

---

## 💊 Medicine Information

The application includes structured knowledge for Indian pharmacopoeia medications (e.g., *Paracetamol*, *Metformin*, *Glycomet*, *Dolo 650*):
- **Brand vs. Generic Name**: Identifies active pharmaceutical ingredients.
- **Indications \& Uses**: Clear explanation of what the medicine treats.
- **Dosage \& Precautions**: Best practices (e.g., take after meals, avoid alcohol).
- **Warnings \& Side Effects**: Warnings for high doses, liver safety, or hypoglycemia risks.

---

## 📷 Prescription OCR & Analysis

Uploaded prescription images or PDFs are processed via `POST /api/health/scan-prescription` (or multimodal endpoint `/api/health/analyze-document`):

```
Upload Image/PDF  --->  Base64 Encoding  --->  FastAPI Endpoint  --->  Gemini Vision Prompt
                                                                               |
User Interface  <---  Structured JSON  <---  Confidence Scoring  <--------------+
```

### Extracted Fields:
- **Patient & Doctor Details**: Extracted patient name, doctor/clinic name, and prescription date.
- **Medicine List**: Brand name, generic composition, dosage strength (e.g. *500mg*), frequency (*BD/Twice daily*), timing (*After food*), and duration.
- **Confidence Scoring**: Per-medicine confidence score (0.0–1.0). If overall confidence is `< 0.70`, the UI displays a **Low Confidence Warning** advising pharmacist verification.

---

## 📄 Medical Report Analysis

Diagnostic reports (CBC, Blood Sugar, Lipid Profile, Thyroid, LFT, KFT) uploaded as images or PDFs are processed via `POST /api/health/analyze-document`:

- **Document Classification**: Automatically classifies documents as `PRESCRIPTION`, `CBC_REPORT`, `DIABETES_REPORT`, `LIPID_PROFILE`, etc.
- **Test Item Extraction**: Extracts test name, result value, unit, and **exact reference range** printed on the report.
- **Reference Range Evaluation**: Categorizes status into:
  - `NORMAL`: Result is within report's reference limits.
  - `NEEDS_ATTENTION`: Result is slightly outside normal range.
  - `CRITICAL`: Result is significantly out of range (e.g., Glucose > 250 mg/dL or Platelets < 50,000 /cumm).
- **Patient Action Plan**: Generates a plain-language summary, key observations, safety alerts, and **3–5 specific questions** the patient can ask their doctor.

---

## 🎤 Voice Interaction

BharatAI features voice-first accessibility using the browser's native **Web Speech API**:
- **Speech-to-Text (`SpeechRecognition`)**: Converts spoken audio into text in the user's selected regional dialect.
- **Visual Feedback**: Real-time microphone listening state animations.

---

## 🔊 Text-to-Speech (TTS)

Replies can be spoken aloud in regional dialects using `window.speechSynthesis`:
- **BCP-47 Locale Mapping**: Automatically maps language codes (`hi` → `hi-IN`, `ta` → `ta-IN`, `bn` → `bn-IN`, `en` → `en-IN`).
- **Text Sanitization**: Strips Markdown formatting, code blocks, and emojis via `cleanTextForSpeech()` for clear pronunciation.
- **Audio Control**: Supports play, pause, stop, and speech rate adjustment (0.8x to 1.2x).

---

## 🛡️ Healthcare Safety

Safety is paramount in BharatAI:
- **Red-Flag Emergency Detection**: Automatically detects life-threatening emergency keywords (e.g., *chest pain*, *stroke symptoms*, *unconscious*, *severe bleeding*).
- **Safety Alerts**: Displays prominent alert banners recommending immediate emergency response (108 / 112) or urgent clinic visits.
- **Non-Diagnostic Disclaimer**: Clearly emphasizes that generated responses are for informational purposes only.

---

## 🏗️ System Architecture

```
+-----------------------------------------------------------------------+
|                             CLIENT LAYER                              |
|                                                                       |
|   +---------------------------------------------------------------+   |
|   |                   React 19 + Vite Frontend                    |   |
|   |  - App Workspace Navigation & Multi-Tab UI                    |   |
|   |  - State Management & Regional Localization Data              |   |
|   |  - Web Speech API Integration (Recognition & Synthesis)       |   |
|   +-------------------------------+-------------------------------+   |
+-----------------------------------|-----------------------------------+
                                    |
                    REST API Calls (VITE_API_URL)
                                    |
+-----------------------------------|-----------------------------------+
|                            SERVER LAYER                               |
|                                                                       |
|   +-------------------------------+-------------------------------+   |
|   |                    FastAPI Backend Server                     |   |
|   |  - Host: 0.0.0.0  |  Port: $PORT                              |   |
|   |  - CORS Middleware Enabled                                    |   |
|   |  - In-Memory Conversation History Store                       |   |
|   +-------------------------------+-------------------------------+   |
|                                   |                                   |
|                     Google GenAI SDK 2.x (Async)                      |
|                                   |                                   |
|   +-------------------------------+-------------------------------+   |
|   |                  Google Gemini 3.6 Flash                      |   |
|   |  - Text Prompt Reasoning                                      |   |
|   |  - Multimodal Vision OCR (Prescriptions & Reports)            |   |
|   +---------------------------------------------------------------+   |
+-----------------------------------------------------------------------+
```

---

## 💻 Tech Stack

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.8` | User Interface Component Framework |
| **TypeScript** | `~6.0.2` | Type Safety & Developer Experience |
| **Vite** | `^8.2.0` | Fast Development Server & Bundler |
| **Tailwind CSS** | `^3.4.17` | Responsive Design & Styling |
| **Lucide React** | `^1.33.0` | Modern UI Icons |
| **Canvas Confetti** | `^1.9.4` | Visual Interaction Animations |
| **Oxlint** | `^1.75.0` | Ultra-fast Linter |

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Python** | `3.10+` | Backend Runtime Environment |
| **FastAPI** | `>=0.100.0` | High-performance Async Web Framework |
| **Uvicorn** | `>=0.22.0` | ASGI Server Implementation |
| **Pydantic** | `>=2.0.0` | Data Validation & Schema Settings |
| **Google GenAI SDK**| `>=0.1.0` | Official `google-genai` SDK for Gemini 3.6 Flash |
| **Python Dotenv** | `>=1.0.0` | Environment Variable Management |

---

## 📁 Project Structure

```
hackathon/
├── backend/
│   ├── main.py                     # FastAPI server, endpoints, Gemini integration
│   └── requirements.txt            # Python dependencies for backend
├── data/                           # Local offline knowledge base
│   └── healthcare/
│       ├── medicines/              # JSON medication data (Metformin, Paracetamol, etc.)
│       ├── nutrition/              # Diet recommendations by condition
│       ├── safety/                 # Emergency protocols
│       └── symptoms/               # Symptom lookup databases
├── public/                         # Static assets (Favicon, icons)
├── scripts/                        # Evaluation & chatbot test scripts
├── src/
│   ├── assets/                     # Hero & UI image assets
│   ├── components/                 # React UI components
│   │   ├── AIChatAssistant.tsx      # Regional AI Chat & Voice Assistant
│   │   ├── AuthView.tsx            # ABHA ID Authentication Modal
│   │   ├── DashboardView.tsx       # Health Vitals & Overview Dashboard
│   │   ├── DiseaseGuidance.tsx     # Disease & Diet Guidance
│   │   ├── DoctorDirectory.tsx     # Regional Doctor Directory & Booking
│   │   ├── DocumentViewerModal.tsx  # Interactive Document Viewer
│   │   ├── EmergencySOSModal.tsx   # 1-Tap Emergency SOS Modal
│   │   ├── EvaluationSuite.tsx     # 20-Case Test Suite Evaluator
│   │   ├── Header.tsx              # Workspace Top Navigation Bar
│   │   ├── HealthMemoryView.tsx    # Health Memory Wallet & EHR
│   │   ├── LangGraphDrawer.tsx     # Execution Pipeline Inspector
│   │   ├── MedicalDocumentUploader.tsx # Camera & File Upload Handler
│   │   ├── PrescriptionScanner.tsx # Prescription OCR & Report Analyzer
│   │   ├── RemindersTimeline.tsx   # Medicine Schedule Reminders
│   │   ├── ScanProgressTracker.tsx # Scan Step Progress Visualizer
│   │   ├── Sidebar.tsx             # Main Application Sidebar Navigation
│   │   └── SystemMetricsView.tsx   # Agent & System Performance Metrics
│   ├── config/
│   │   └── api.ts                  # Centralized API configuration (VITE_API_URL)
│   ├── data/
│   │   ├── healthcareResponses.ts  # Fallback offline chat knowledge base
│   │   ├── localization.ts        # Multilingual UI text translations
│   │   └── mockData.ts             # Supported languages & mock prescriptions
│   ├── utils/
│   │   ├── medicalDocumentEngine.ts# Clinical report analysis logic & fallbacks
│   │   └── speechUtils.ts          # Speech recognition & synthesis utilities
│   ├── App.css                     # Custom styles & animations
│   ├── App.tsx                     # Main App component & page router
│   ├── index.css                   # Tailwind CSS base styles
│   ├── main.tsx                    # React DOM entrypoint
│   └── types.ts                    # TypeScript interfaces & type definitions
├── .env.example                    # Template environment variables
├── .gitignore                      # Git exclusion rules
├── index.html                      # HTML entrypoint
├── package.json                    # Node dependencies & scripts
├── Procfile                        # Deployment process file (Uvicorn)
├── requirements.txt                # Root Python dependencies
├── tailwind.config.js              # Tailwind CSS configuration
└── vite.config.ts                  # Vite build & proxy configuration
```

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js**: v18.0 or higher
- **Python**: v3.10 or higher
- **Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com)

---

### Frontend Setup

1. **Clone Repository**:
   ```bash
   git clone https://github.com/AshuKumari21/Hackathon.git
   cd Hackathon
   ```

2. **Install Node Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`.

---

### Backend Setup

1. **Create Virtual Environment**:
   ```bash
   python -m venv venv
   ```

2. **Activate Virtual Environment**:
   - **Windows**:
     ```cmd
     venv\Scripts\activate
     ```
   - **macOS / Linux**:
     ```bash
     source venv/bin/activate
     ```

3. **Install Python Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

4. **Start FastAPI Backend**:
   ```bash
   python backend/main.py
   ```
   *or using Uvicorn directly:*
   ```bash
   uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
   ```
   The backend server will run at `http://localhost:8000`.

---

## 🔑 Environment Variables

Create a `.env` file in the root directory (refer to `.env.example`):

```env
# ============================================================
# BharatAI Environment Configuration
# ============================================================

# FastAPI Backend Environment (Required on Server)
GEMINI_API_KEY=your_actual_gemini_api_key_here
PORT=8000

# Frontend Environment (Required on Production Frontend Host)
# Leave empty for local Vite dev proxying
VITE_API_URL=
```

> ⚠️ **SECURITY WARNING**: Never commit your `.env` file containing actual secrets. `.env` is listed in `.gitignore`.

---

## 🚀 Running the Project

1. **Run Backend** (Terminal 1):
   ```bash
   python backend/main.py
   ```
2. **Run Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## 📡 API Endpoints

FastAPI backend routes:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health/status` | Verifies server readiness, SDK version, and API key configuration status. |
| `POST` | `/api/health/scan-prescription` | Accepts base64 prescription image/PDF, returns extracted medicines and confidence scores. |
| `POST` | `/api/health/analyze-document` | Accepts base64 lab report or prescription, returns classification, test items, reference ranges, and summaries. |
| `POST` | `/api/health/chat` | Processes multilingual user health questions with conversation context memory. |

---

### Request / Response Examples

#### 1. Chat Endpoint (`POST /api/health/chat`)

**Request**:
```json
{
  "message": "मुझे 2 दिन से बुखार है, क्या करूँ?",
  "language": "hi",
  "conversation_id": "session-101"
}
```

**Response**:
```json
{
  "reply": "नमस्ते! 2 दिन से बुखार होने पर पर्याप्त पानी पिएं और विश्राम करें। यदि बुखार 101°F से अधिक है या सांस लेने में तकलीफ है, तो तुरंत डॉक्टर से संपर्क करें। क्या आपको सिरदर्द या शरीर में दर्द भी है?",
  "language": "hi",
  "intent": "SYMPTOM",
  "confidence": 0.96,
  "red_flag": false,
  "sources": ["BharatAI Knowledge Base"]
}
```

---

#### 2. Document Analysis Endpoint (`POST /api/health/analyze-document`)

**Request**:
```json
{
  "base64_image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "mime_type": "image/jpeg",
  "language": "en",
  "document_hint": "report"
}
```

**Response**:
```json
{
  "document_type": "CBC_REPORT",
  "document_type_label": "Complete Blood Count (CBC) Report",
  "document_type_confidence": 0.95,
  "is_prescription": false,
  "is_lab_report": true,
  "patient_info": {
    "name": "Ramesh Kumar",
    "age": "45",
    "gender": "Male",
    "date": "2026-08-20"
  },
  "test_results": [
    {
      "name": "Hemoglobin",
      "value": "11.2",
      "unit": "g/dL",
      "reference_range": "13.0 - 17.0 g/dL",
      "status": "NEEDS_ATTENTION",
      "explanation": "Hemoglobin is an iron-rich protein in red blood cells that carries oxygen throughout your body.",
      "confidence": 0.97
    }
  ],
  "overall_summary": {
    "plain_language_overview": "Your Hemoglobin result is slightly below the reference range printed on the report.",
    "within_range_count": 4,
    "needs_attention_count": 1,
    "important_count": 0,
    "what_stands_out": [
      { "level": "attention", "text": "Hemoglobin is below the report reference range." }
    ],
    "safety_alert": null
  },
  "doctor_questions": [
    "What could be causing my hemoglobin level to be slightly below the normal range?",
    "Do I need any dietary modifications or iron supplements?"
  ],
  "confidence_score": 0.95,
  "is_low_confidence": false
}
```

---

## 📑 Prescription/Report Upload Flow

```
1. Select Document File / Capture Photo
   └─ Supported formats: JPEG, PNG, WEBP, PDF

2. Document Hint Selection
   └─ Options: Auto-detect, Prescription, Diagnostic Lab Report

3. Base64 Client Payload Generation
   └─ Converts file locally via FileReader API

4. FastAPI Multi-Modal Vision Processing
   └─ Gemini 3.6 Flash Vision model analyzes layout & text

5. Structured UI Rendering
   ├─ Medicines: Brand, Generic, Dosage, Timing, Confidence
   ├─ Lab Values: Measured Value vs. Reference Range Badge
   └─ Audio Synthesis: "Listen Aloud" button reads output in regional voice
```

---

## 💬 Example User Conversations

### Example 1: Multi-Turn Conversation (Hindi)

> **User**: *"नमस्ते, मुझे डायबिटीज के बारे में जानना है।"*  
> **BharatAI**: *"नमस्ते! टाइप 2 डायबिटीज में ब्लड शुगर का स्तर नियंत्रित रखना आवश्यक है। क्या आप अपनी हालिया खाली पेट (Fasting) शुगर रिपोर्ट जानना चाहते हैं या आहार सलाह?"*  
> 
> **User (Follow-up)**: *"खाने में क्या परहेज रखें?"*  
> **BharatAI**: *"डायबिटीज में रिफाइंड चीनी, मिठाई, मीठे पेय और मैदा से बचें। भोजन में बाजरा, रागी, हरी सब्जियां, और दालें शामिल करें। अपनी दवाइयां समय पर लें।"*

---

### Example 2: Medicine Information (English)

> **User**: *"What is Glycomet 500mg used for?"*  
> **BharatAI**: *"💊 **Glycomet 500mg** contains **Metformin Hydrochloride**.  
> 📌 **Uses**: Manages high blood sugar in Type 2 Diabetes.  
> 🛡️ **Precautions**: Take with or immediately after meals to reduce stomach upset.  
> 🚨 **Warnings**: Do not skip meals after taking it to prevent low blood sugar (hypoglycemia)."*

---

## 🔒 Security

- **Server-Side API Key Storage**: The `GEMINI_API_KEY` is restricted to server-side process environments and is never exposed in client JS bundles.
- **CORS Protection**: FastAPI backend explicitly manages CORS middleware origins.
- **Input & Payload Validation**: Strict Pydantic model validation on all incoming JSON payloads, base64 sizes, and MIME types.
- **Error Sanitization**: API error handlers redact API keys from error outputs before returning HTTP exceptions.
- **Git Exclusion**: `.env` is explicitly ignored in `.gitignore`.

---

## 🇮🇳 Bharat-Focused Design

- **Voice-First Accessibility**: Designed for users who find typing difficult.
- **14 Regional Languages**: Native language UI support for broad demographic reach across states.
- **Simplified Clinical Output**: Converts complex medical terms into clear everyday language.
- **Proximity Doctor Directory**: Regional doctor listing with spatial geohash proximity filtering.
- **Responsive Layout**: Designed for seamless operation on mobile devices.

---

## 📸 Screenshots

*(Application Interface Screenshots)*

| Marketing Landing Page | Dashboard & Health Vitals |
| :---: | :---: |
| ![Landing Page](src/assets/hero.png) | ![Dashboard Overview](src/assets/hero.png) |

---

## 🚢 Deployment

### 1. Deploy Frontend (Vercel / Netlify / Cloudflare Pages)
- **Framework Preset**: Vite / React
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Environment Variable**:
  ```env
  VITE_API_URL=https://your-fastapi-backend.onrender.com
  ```

### 2. Deploy Backend (Render / Railway / Fly.io / GCP Cloud Run)
- **Environment**: Python 3.10+
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`
- **Environment Variables**:
  ```env
  GEMINI_API_KEY=your_actual_gemini_api_key
  PORT=8000
  ```

---

## 🔮 Future Scope

The following features represent planned roadmap extensions for future releases:
- 📶 **Full Offline WASM Models**: On-device local GGUF model execution for 100% internet-free environments.
- 📱 **WhatsApp & Telegram Bot Integration**: Health guidance directly via messaging platforms.
- ⌚ **Wearable BLE Sync**: Real-time heart rate and continuous glucose monitor integration.
- 🎙️ **Server-Side Regional Voice Models**: Fine-tuned Indian dialect text-to-speech synthesis models.

---

## ⚠️ Healthcare Disclaimer

> **IMPORTANT MEDICAL DISCLAIMER**:  
> **BharatAI Healthcare Assistant** is an artificial intelligence-based educational and informational tool. It is **NOT** a medical diagnostic tool and does **NOT** provide medical diagnoses, treatment plans, or prescriptions.  
> 
> Always consult a qualified medical professional, physician, or pharmacist for medical advice, treatment decisions, or urgent health conditions. In case of a medical emergency, immediately call your local emergency services (108 / 112) or visit the nearest hospital.

---

## 👥 Team

Developed with ❤️ by the **BharatAI Hackathon Team**.

---

## 📄 License

This project is licensed under the **MIT License**.
