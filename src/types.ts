export type RegionalLanguageCode = 
  | 'hi' // Hindi
  | 'pa' // Punjabi
  | 'ta' // Tamil
  | 'bn' // Bengali
  | 'te' // Telugu
  | 'mr' // Marathi
  | 'or' // Odia
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'as' // Assamese
  | 'gu' // Gujarati
  | 'ur' // Urdu
  | 'bho' // Bhojpuri
  | 'en'; // English

export type NavTab = 
  | 'dashboard'
  | 'scanner'
  | 'chatbot'
  | 'guidance'
  | 'doctors'
  | 'reminders'
  | 'memory'
  | 'metrics'
  | 'eval';

export interface LanguageInfo {
  code: RegionalLanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export type MedicalDocumentType =
  | 'PRESCRIPTION'
  | 'BLOOD_REPORT'
  | 'CBC_REPORT'
  | 'DIABETES_REPORT'
  | 'LIPID_PROFILE'
  | 'LIVER_FUNCTION_TEST'
  | 'KIDNEY_FUNCTION_TEST'
  | 'THYROID_REPORT'
  | 'URINE_TEST'
  | 'VITAMIN_REPORT'
  | 'X_RAY_REPORT'
  | 'OTHER_LAB_REPORT'
  | 'UNKNOWN';

export type TestResultStatus = 'NORMAL' | 'NEEDS_ATTENTION' | 'CRITICAL';

export interface OCRBoundingBox {
  id: string;
  page: number;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  width: number; // Percentage 0-100
  height: number; // Percentage 0-100
  label: string;
  confidence: number;
  type: 'medicine' | 'test' | 'value' | 'patient' | 'doctor' | 'header' | 'warning' | 'range';
}

export interface MedicineItem {
  id: string;
  brandName: string;
  genericName: string;
  dosage: string;
  frequency: string;
  timing: string; // e.g. "After food"
  duration: string;
  confidence: number;
  specialInstructions?: string;
  page?: number;
  boundingBox?: OCRBoundingBox;
}

export interface TestResultItem {
  id: string;
  name: string;
  value: string;
  numericValue?: number;
  unit: string;
  referenceRange: string;
  status: TestResultStatus;
  confidence: number;
  page: number;
  category?: string;
  explanation?: string;
  convertedValue?: string;
  convertedUnit?: string;
  boundingBox?: OCRBoundingBox;
}

export interface DocumentPageData {
  pageNumber: number;
  dataUrl?: string;
  rawText: string;
  boundingBoxes: OCRBoundingBox[];
}

export interface WhatStandsOutItem {
  level: 'normal' | 'attention' | 'critical';
  text: string;
  regionalText?: string;
  testName?: string;
}

export interface MedicalDocumentSession {
  documentId: string;
  analysisSessionId: string;
  fileName: string;
  fileType: string;
  previewUrl?: string;
  pagesCount: number;
  pages: DocumentPageData[];
  documentType: MedicalDocumentType;
  documentTypeLabel: string;
  documentTypeConfidence: number;
  isPrescription: boolean;
  isLabReport: boolean;
  patientInfo: {
    name?: string;
    age?: string;
    gender?: string;
    uhid?: string;
    date?: string;
  };
  doctorInfo: {
    doctorName?: string;
    clinicName?: string;
    date?: string;
    specialization?: string;
  };
  medicines: MedicineItem[];
  testResults: TestResultItem[];
  importantInstructions: string[];
  overallSummary: {
    plainLanguageOverview: string;
    withinRangeCount: number;
    needsAttentionCount: number;
    importantCount: number;
    whatStandsOut: WhatStandsOutItem[];
    safetyAlert?: string;
  };
  doctorQuestions: string[];
  contextualAnalysis?: string;
  changesOverTime?: {
    testName: string;
    previousValue: string;
    latestValue: string;
    unit: string;
    trend: 'IMPROVED' | 'DECLINED' | 'STABLE';
    trendDescription: string;
  }[];
  regionalTranscripts: Partial<Record<RegionalLanguageCode, {
    summaryText: string;
    voiceScript: string;
    overviewHeading?: string;
    withinRangeHeading?: string;
    needsAttentionHeading?: string;
    importantHeading?: string;
    questionsHeading?: string;
    doctorQuestions?: string[];
    whatStandsOut?: string[];
  }>> & Record<string, any>;
  overallConfidence: number;
  isLowConfidence: boolean;
  rawOcrText: string;
  isDemo: boolean;
  createdAt: string;
}

export interface PrescriptionScan {
  id: string;
  title: string;
  patientName: string;
  clinicName: string;
  date: string;
  imageUrl: string;
  rawOcrText: string;
  confidenceScore: number;
  isLowConfidence: boolean;
  detectedConditions: string[];
  medicines: MedicineItem[];
  regionalTranscripts: Partial<Record<RegionalLanguageCode, {
    summaryText: string;
    regionalVoiceScript: string;
    dietTips: string[];
    lifestyleTips: string[];
  }>> & Record<string, any>;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  qualifications: string;
  clinicAddress: string;
  district: string;
  distanceKm: number;
  geohash: string;
  languages: string[];
  phoneNumber: string;
  consultationFee: number;
  rating: number;
  availableOffline: boolean;
}

export interface ReminderItem {
  id: string;
  time: string;
  period: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  medicineName: string;
  dosage: string;
  foodRelation: string;
  taken: boolean;
  regionalAudioText: string;
}

export interface EvaluationCase {
  id: number;
  category: 'OCR' | 'Translation' | 'Disease Safety' | 'Offline Doctor';
  title: string;
  scenario: string;
  expectedResult: string;
  status: 'PASS' | 'FAIL' | 'EDGE_CASE';
}

export interface FailureLogEntry {
  id: string;
  timestamp: string;
  component: string;
  errorSignature: string;
  rootCause: string;
  mitigation: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  regionalText?: string;
  timestamp: string;
  suggestedActions?: string[];
}

export interface PatientVitals {
  bloodPressureSystolic: number;
  bloodPressureDiastolic: number;
  fastingBloodSugar: number;
  postPrandialSugar: number;
  pulseRate: number;
  weightKg: number;
  lastUpdated: string;
}
