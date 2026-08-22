import type {
  LanguageInfo,
  PrescriptionScan,
  MedicalDocumentSession,
  Doctor,
  ReminderItem,
  EvaluationCase,
  FailureLogEntry,
  PatientVitals,
  ChatMessage,
} from '../types';

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', flag: '🇮🇳' },
];

export const MOCK_VITALS: PatientVitals = {
  bloodPressureSystolic: 128,
  bloodPressureDiastolic: 82,
  fastingBloodSugar: 138,
  postPrandialSugar: 184,
  pulseRate: 74,
  weightKg: 68.5,
  lastUpdated: 'Today, 07:30 AM'
};

export const INITIAL_CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  en: [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'Hello Ramesh! I am your offline health assistant. You can ask me anything about your prescriptions, medications, or diet recommendations.',
      timestamp: '08:00 AM',
      suggestedActions: ['When to take Glycomet?', 'What to eat in diabetes?', 'High BP symptoms']
    }
  ],
  hi: [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'नमस्ते रमेश जी! मैं आपका ऑफलाइन स्वास्थ्य सहायक हूँ। आप अपनी बीमारी, दवाइयों या खान-पान के बारे में कुछ भी पूछ सकते हैं।',
      timestamp: '08:00 AM',
      suggestedActions: ['ग्लाइकोमेट कब खानी है?', 'डायबिटीज में क्या खाएं?', 'बीपी बढ़ने के लक्षण']
    }
  ],
  bho: [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: 'प्रणाम रमेश जी! हम रउआ के ऑफलाइन सेहत सलाहकार बानी। कवनो दवाई या बीमारी खातिर सवाल पूछीं।',
      timestamp: '08:00 AM',
      suggestedActions: ['ग्लाइकोमेट कब खाए के बा?', 'चीनी में का खाए के बा?', 'बीपी के दवाई']
    }
  ]
};

export const MOCK_PRESCRIPTIONS: PrescriptionScan[] = [
  {
    id: 'rx-001',
    title: 'Type 2 Diabetes & Hypertension Rx',
    patientName: 'Ramesh Kumar (Age 54)',
    clinicName: 'Jan Swasthya Kendra, Muzzafarpur (Bihar)',
    date: '2026-08-20',
    imageUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
    rawOcrText: 'Rx: Metformin 500mg BD p.c. | Telmisartan 40mg OD a.m. | Glimepiride 1mg OD a.c. | Follow up in 14 days.',
    confidenceScore: 0.94,
    isLowConfidence: false,
    detectedConditions: ['Type 2 Diabetes Mellitus', 'Essential Hypertension'],
    medicines: [
      { id: 'm1', brandName: 'Glycomet 500', genericName: 'Metformin HCl', dosage: '500 mg', frequency: '2 times daily (BD)', timing: 'After food', duration: '30 Days', confidence: 0.96 },
      { id: 'm2', brandName: 'Telma 40', genericName: 'Telmisartan', dosage: '40 mg', frequency: '1 time daily (OD)', timing: 'Morning empty stomach', duration: '30 Days', confidence: 0.95 },
      { id: 'm3', brandName: 'Amaryl 1mg', genericName: 'Glimepiride', dosage: '1 mg', frequency: '1 time daily (OD)', timing: 'Before breakfast', duration: '30 Days', confidence: 0.91 },
    ],
    regionalTranscripts: {
      en: {
        summaryText: 'This prescription is for Type 2 Diabetes and Hypertension medications.',
        regionalVoiceScript: 'Hello Ramesh. Your first medicine is Glycomet 500, to be taken twice daily after meals. Your second medicine is Telma 40, to be taken once daily in the morning on an empty stomach. Your third medicine is Amaryl 1mg, to be taken once daily before breakfast.',
        dietTips: ['Reduce white polished rice, replace with Ragi or Bajra millets.', 'Avoid sugary fruits and jaggery.', 'Drink at least 2-3 liters of water daily.'],
        lifestyleTips: ['Walk for 30 minutes every morning.', 'Inspect feet daily for any cuts or wounds and report immediately to your doctor.']
      },
      hi: {
        summaryText: 'यह पर्चा टाइप-2 मधुमेह और उच्च रक्तचाप की दवाओं के लिए है।',
        regionalVoiceScript: 'नमस्ते रमेश जी। आपकी पहली दवा ग्लाइकोमेट 500 है, जिसे सुबह और शाम खाना खाने के बाद लेना है। दूसरी दवा तेलमा 40 है, जिसे सुबह खाली पेट एक बार लें। तीसरी दवा अमैरिल 1mg है, जिसे नाश्ते से पहले लें।',
        dietTips: ['पालिश वाला सफेद चावल कम खाएं, उसकी जगह रागी और बाजरा लें।', 'मीठे फल और गुड़ का सेवन बंद करें।', 'रोजाना कम से कम 2-3 लीटर पानी पिएं।'],
        lifestyleTips: ['रोजाना सुबह 30 मिनट हल्की सैर करें।', 'पैर में चोट या घाव होने पर तुरंत डॉक्टर को दिखाएं।']
      },
      pa: {
        summaryText: 'ਇਹ ਪਰਚਾ ਸ਼ੂਗਰ (ਟਾਈਪ-2) ਅਤੇ ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਦੀਆਂ ਦਵਾਈਆਂ ਲਈ ਹੈ।',
        regionalVoiceScript: 'ਸਤਿ ਸ਼੍ਰੀ ਅਕਾਲ ਰਮੇਸ਼ ਜੀ। ਤੁਹਾਡੀ ਪਹਿਲੀ ਦਵਾਈ ਗਲਾਈਕੋਮੇਟ 500 ਹੈ, ਜੋ ਸਵੇਰੇ ਅਤੇ ਸ਼ਾਮ ਰੋਟੀ ਤੋਂ ਬਾਅਦ ਲੈਣੀ ਹੈ। ਦੂਜੀ ਦਵਾਈ ਤੇਲਮਾ 40 ਹੈ, ਜੋ ਸਵੇਰੇ ਖਾਲੀ ਪੇਟ ਲੈਣੀ ਹੈ।',
        dietTips: ['ਚਿੱਟੇ ਚੌਲਾਂ ਦੀ ਜਗ੍ਹਾ ਬਾਜਰਾ ਅਤੇ ਜੁਆਰ ਖਾਓ।', 'ਮੀਠੇ ਅਤੇ ਤਲੇ ਭੋਜਨ ਤੋਂ ਬਚੋ।'],
        lifestyleTips: ['ਰੋਜ਼ਾਨਾ 30 ਮਿੰਟ ਸੈਰ ਕਰੋ।']
      },
      ta: {
        summaryText: 'இந்த மருந்துச் சீட்டு நீரிழிவு நோய் மற்றும் இரத்த அழுத்தத்திற்கான மருந்துகளாகும்.',
        regionalVoiceScript: 'வணக்கம் ரமேஷ். உங்கள் முதல் மருந்து கிளைகோமெட் 500, இதை காலை மற்றும் மாலை உணவுக்குப் பிறகு சாப்பிட வேண்டும். இரண்டாவது மருந்து டெல்மா 40, காலை வெறும் வயிற்றில் எடுக்க வேண்டும்.',
        dietTips: ['வெள்ளை அரிசி உணவை குறைத்து ராகி, கம்பு சேர்க்கவும்.', 'இனிப்பு பண்டங்களை தவிர்க்கவும்.'],
        lifestyleTips: ['தினமும் 30 நிமிடங்கள் நடைபயிற்சி செய்யவும்.']
      },
      bn: {
        summaryText: 'এই প্রেসক্রিপশনটি টাইপ-২ ডায়াবেটিস এবং উচ্চ রক্তচাপের ওষুধের জন্য।',
        regionalVoiceScript: 'নমস্কার রমেশ বাবু। আপনার প্রথম ওষুধ গ্লাইকোমেট ৫০০, সকালে এবং রাতে খাবারের পর খেতে হবে। দ্বিতীয় ওষুধ তেলমা ৪০, সকালে খালি পেটে খাবেন।',
        dietTips: ['সাদা চালের পরিবর্তে জোয়ার ও বাজরা খান।', 'মিষ্টি ও অতিরিক্ত লবণ খাওয়া বন্ধ করুন।'],
        lifestyleTips: ['প্রতিদিন সকালে ৩০ মিনিট হাঁটুন।']
      },
      mr: {
        summaryText: 'हे औषध पत्रक मधुमेह आणि उच्च रक्तदाबाच्या औषधांसाठी आहे.',
        regionalVoiceScript: 'नमस्कार रमेश जी. तुमचे पहिले औषध ग्लायकोमेट ५०० हे सकाळी आणि संध्याकाळी जेवणानंतर घ्यायचे आहे. दुसरे औषध तेलमा ४० सकाळी उपाशीपोटी घ्या.',
        dietTips: ['पांढऱ्या तांदळाऐवजी ज्वारी आणि बाजरीची भाकरी खा.', 'गोड पदार्थ टाळा.'],
        lifestyleTips: ['रोज सकाळी ३० मिनिटे चाला.']
      },
      or: {
        summaryText: 'ଏହି ପ୍ରେସକ୍ରିପସନ୍ ଡାଏବେଟିସ୍ ଏବଂ ହାଇ ବ୍ଲଡପ୍ରେସର ପାଇଁ ଅଟେ।',
        regionalVoiceScript: 'ନମସ୍କାର ରମେଶ ଜୀ। ଆପଣଙ୍କର ପ୍ରଥମ ଔଷଧ ଗ୍ଲାଇକୋମେଟ ୫୦୦ ସକାଳ ଓ ସନ୍ଧ୍ୟାରେ ଖାଇବା ପରେ ନିଅନ୍ତୁ।',
        dietTips: ['ଧଳା ଭାତ ବଦଳରେ ମାଣ୍ଡିଆ ଖାଆନ୍ତୁ।'],
        lifestyleTips: ['ପ୍ରତିଦିନ ସକାଳେ ୩୦ ମିନିଟ୍ ଚାଲନ୍ତୁ।']
      },
      kn: {
        summaryText: 'ಈ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್ ಮಧುಮೇಹ ಮತ್ತು ರಕ್ತದೊತ್ತಡದ ಔಷಧಿಗಳಿಗಾಗಿದೆ.',
        regionalVoiceScript: 'ನಮಸ್ಕಾರ ರಮೇಶ್ ಅವರೇ. ನಿಮ್ಮ ಮೊದಲ ಔಷಧಿ ಗ್ಲೈಕೋಮೆಟ್ 500 ಅನ್ನು ಬೆಳಿಗ್ಗೆ ಮತ್ತು ರಾತ್ರಿ ಊಟದ ನಂತರ ತೆಗೆದುಕೊಳ್ಳಿ.',
        dietTips: ['ಬಿಳಿ ಅಕ್ಕಿ ಬದಲು ರಾಗಿ ಬಳಸಿ.'],
        lifestyleTips: ['ದಿನವೂ 30 ನಿಮಿಷ ನಡಿಗೆ ಮಾಡಿ.']
      },
      ml: {
        summaryText: 'ഈ കുറിപ്പ് പ്രമേഹത്തിനും അമിത രക്തസമ്മർദ്ദത്തിനുമുള്ള മരുന്നുകളാണ്.',
        regionalVoiceScript: 'നമസ്കാരം രമേഷ്. ഗ്ലൈക്കോമറ്റ് 500 രാവിലെയും വൈകുന്നേരവും ഭക്ഷണത്തിന് ശേഷം കഴിക്കുക.',
        dietTips: ['വെള്ള അരിക്ക് പകരം റാഗി ഉപയോഗിക്കുക.'],
        lifestyleTips: ['ദിവസവും 30 മിനിറ്റ് നടക്കുക.']
      },
      as: {
        summaryText: 'এই প্ৰেছক্ৰিপশ্বনটো ডায়াবেটিছ আৰু উচ্চ ৰক্তচাপৰ ঔষধৰ বাবে।',
        regionalVoiceScript: 'নমস্কাৰ ৰমেশ ডাঙৰীয়া। প্ৰথম ঔষধ গ্লাইকোমেট ৫০০ পুৱা আৰু গধূলি আহাৰৰ পিছত খাব।',
        dietTips: ['বগা চাউলৰ পৰিৱৰ্তে ৰাগী বা বাজৰা খাক।'],
        lifestyleTips: ['প্ৰতিদিনে ৩০ মিনিট খোজ কাঢ়ক।']
      },
      bho: {
        summaryText: 'ई परचा चीनी के बीमारी (डायबिटीज) आ बीपी के दवाई खातिर बा।',
        regionalVoiceScript: 'प्रणाम रमेश जी। रउआ पहिलका दवाई ग्लाइकोमेट 500 बिहान आ साँझ के खाना खइला के बाद लेवे के बा। दूसरा दवाई तेलमा 40 बिहान खाली पेट लेईं।',
        dietTips: ['उज्जर चावल कम खाईं, ओकरा जगह मडुआ (रागी) आ बाजरा खाईं।', 'मीठा आ गुड़ बिल्कुल मत खाईं।'],
        lifestyleTips: ['रोज बिहान 30 मिनट टहले के आदत डालीं।']
      }
    }
  },
  {
    id: 'rx-002',
    title: 'Acute Respiratory Fever & Infection Rx',
    patientName: 'Sunita Devi (Age 32)',
    clinicName: 'Primary Health Centre, Villupuram (Tamil Nadu)',
    date: '2026-08-21',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80',
    rawOcrText: 'Rx: Amoxicillin 500mg TDS x 5d | Paracetamol 650mg SOS | Cetirizine 10mg HS x 5d | Drink warm fluids.',
    confidenceScore: 0.91,
    isLowConfidence: false,
    detectedConditions: ['Acute Upper Respiratory Tract Infection', 'Pyrexia (Fever)'],
    medicines: [
      { id: 'm4', brandName: 'Mox 500', genericName: 'Amoxicillin Trihydrate', dosage: '500 mg', frequency: '3 times daily (TDS)', timing: 'After food', duration: '5 Days', confidence: 0.94 },
      { id: 'm5', brandName: 'Dolo 650', genericName: 'Paracetamol', dosage: '650 mg', frequency: 'When fever occurs (SOS)', timing: 'After food', duration: 'As needed', confidence: 0.98 },
      { id: 'm6', brandName: 'Cetzine 10', genericName: 'Cetirizine HCl', dosage: '10 mg', frequency: '1 time daily (HS)', timing: 'At bedtime', duration: '5 Days', confidence: 0.92 },
    ],
    regionalTranscripts: {
      en: {
        summaryText: 'This prescription is for respiratory infection and fever recovery.',
        regionalVoiceScript: 'Hello Sunita. Your first medicine is Mox 500 antibiotic, to be taken three times daily after meals for a full 5-day course. Take Dolo 650 only when you have high fever. Take Cetzine 10 once daily at bedtime.',
        dietTips: ['Drink warm water and warm soups.', 'Have ginger and tulsi tea.'],
        lifestyleTips: ['Get plenty of rest and avoid cold exposure.']
      },
      hi: {
        summaryText: 'यह पर्चा बुखार और सांस की नली में संक्रमण (इन्फेक्शन) की दवाओं के लिए है।',
        regionalVoiceScript: 'नमस्ते सुनीता जी। पहली दवा मॉक्स 500 एंटीबायोटिक है, जिसे दिन में 3 बार खाना खाने के बाद 5 दिन तक पूरा कोर्स लेना है। डोलो 650 केवल तेज बुखार आने पर लें।',
        dietTips: ['हल्का गुनगुना पानी पिएं।', 'अदरक और तुलसी की चाय लें।'],
        lifestyleTips: ['पर्याप्त आराम करें और ठंडी हवा से बचें।']
      },
      pa: { summaryText: 'ਇਹ ਪਰਚਾ ਬੁਖਾਰ ਲਈ ਹੈ।', regionalVoiceScript: 'ਮੌਕਸ 500 5 ਦਿਨਾਂ ਲਈ ਲਵੋ।', dietTips: [], lifestyleTips: [] },
      ta: { summaryText: 'இது காய்ச்சல் மருந்துச் சீட்டாகும்.', regionalVoiceScript: 'மொக்ஸ் 500 5 நாட்கள் சாப்பிடுங்கள்.', dietTips: [], lifestyleTips: [] },
      bn: { summaryText: 'এটি জ্বরের প্রেসক্রিপশন।', regionalVoiceScript: 'মক্স ৫০০ দিনে ৩ বার খাবেন।', dietTips: [], lifestyleTips: [] },
      mr: { summaryText: 'हे औषध पत्रक तापासाठी आहे.', regionalVoiceScript: 'मॉक्स ५०० दिवसातून ३ वेळा घ्या.', dietTips: [], lifestyleTips: [] },
      or: { summaryText: 'ଏହା ଜ୍ୱର ପାଇଁ ଔଷଧ।', regionalVoiceScript: 'ମକ୍ସ ୫୦୦ ୫ ଦିନ ଖାଆନ୍ତୁ।', dietTips: [], lifestyleTips: [] },
      kn: { summaryText: 'ಇದು ಜ್ವರದ ಔಷಧಿಯಾಗಿದೆ.', regionalVoiceScript: 'ಮೊಕ್ಸ್ 500 ತೆಗೆದುಕೊಳ್ಳಿ.', dietTips: [], lifestyleTips: [] },
      ml: { summaryText: 'ഇത് പനിക്കുള്ള മരുന്നാണ്.', regionalVoiceScript: 'മോക്സ് 500 കഴിക്കുക.', dietTips: [], lifestyleTips: [] },
      as: { summaryText: 'এইটো জ্বৰৰ ঔষধ।', regionalVoiceScript: 'মক্স ৫০০ দিনত ৩ বাৰ খাব।', dietTips: [], lifestyleTips: [] },
      bho: { summaryText: 'ई परचा बुखार के बा।', regionalVoiceScript: 'सुनैना जी, मॉक्स 500 दिन में 3 बार खाना खा के लेईं।', dietTips: [], lifestyleTips: [] }
    }
  },
  {
    id: 'rx-003',
    title: 'Smudged Low Confidence Prescription (Fallback Demo)',
    patientName: 'Anil Prasad (Age 48)',
    clinicName: 'Rural Health Camp, Kalahandi (Odia)',
    date: '2026-08-19',
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80',
    rawOcrText: 'Rx: Cipro??? 500mg (?) | Ranitidine (?) 150mg BD (?) | [Smudged Text Unreadable]',
    confidenceScore: 0.58,
    isLowConfidence: true,
    detectedConditions: ['Unverified Gastrointestinal Distress'],
    medicines: [
      { id: 'm7', brandName: 'Cipro???', genericName: 'Ciprofloxacin (Uncertain)', dosage: '500 mg (?)', frequency: 'Unclear', timing: 'Unclear', duration: 'Unclear', confidence: 0.52 },
      { id: 'm8', brandName: 'Rantac (?)', genericName: 'Ranitidine', dosage: '150 mg', frequency: '2 times daily (BD)', timing: 'Before food', duration: 'Unclear', confidence: 0.64 }
    ],
    regionalTranscripts: {
      en: {
        summaryText: '⚠️ Warning: Handwriting is smudged and unreadable (58% confidence).',
        regionalVoiceScript: 'Attention Anil. The prescription image is unclear. The dosage instructions are not verified. Please consult your doctor or pharmacist.',
        dietTips: ['Eat simple light porridge or khichdi.'],
        lifestyleTips: ['Visit the nearest medical camp immediately.']
      },
      hi: {
        summaryText: '⚠️ चेतावनी: पर्चे की लिखावट धुंधली है (विश्वसनीयता 58%)।',
        regionalVoiceScript: 'ध्यान दें अनिल जी। पर्चा धुंधला होने के कारण दवा की मात्रा पूरी तरह स्पष्ट नहीं है। कृपया नजदीकी फार्मासिस्ट या डॉक्टर से पुष्टि करें।',
        dietTips: ['सादा खिचड़ी खाएं।'],
        lifestyleTips: ['तुरंत नजदीकी स्वास्थ्य केंद्र जाएं।']
      },
      pa: { summaryText: '⚠️ ਚੇਤਾਵਨੀ', regionalVoiceScript: 'ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।', dietTips: [], lifestyleTips: [] },
      ta: { summaryText: '⚠️ எச்சரிக்கை', regionalVoiceScript: 'மருத்துவரை அணுகவும்.', dietTips: [], lifestyleTips: [] },
      bn: { summaryText: '⚠️ সতর্কবার্তা', regionalVoiceScript: 'ডাক্তারের সাথে কথা বলুন।', dietTips: [], lifestyleTips: [] },
      mr: { summaryText: '⚠️ इशारा', regionalVoiceScript: 'डॉक्टरांचा सल्ला घ्या.', dietTips: [], lifestyleTips: [] },
      or: { summaryText: '⚠️ ସାବଧାନ', regionalVoiceScript: 'ଡାକ୍ତରଙ୍କ ସହ ପରାମର୍ଶ କରନ୍ତୁ।', dietTips: [], lifestyleTips: [] },
      kn: { summaryText: '⚠️ ಎಚ್ಚರಿಕೆ', regionalVoiceScript: 'ವೈದ್ಯರನ್ನು ಸಂಪರ್ಕಿಸಿ.', dietTips: [], lifestyleTips: [] },
      ml: { summaryText: '⚠️ മുന്നറിയിപ്പ്', regionalVoiceScript: 'ഡോക്ടറെ കാണുക.', dietTips: [], lifestyleTips: [] },
      as: { summaryText: '⚠️ সকীয়নী', regionalVoiceScript: 'চিকিৎসকৰ পৰামৰ্শ লওক।', dietTips: [], lifestyleTips: [] },
      bho: { summaryText: '⚠️ चेतावनी', regionalVoiceScript: 'डॉक्टर साहब से पूछ लेईं।', dietTips: [], lifestyleTips: [] }
    }
  }
];

export const MOCK_DOCUMENT_SESSIONS: MedicalDocumentSession[] = [
  {
    documentId: 'demo-rx-001',
    analysisSessionId: 'session-demo-rx-001',
    fileName: 'prescription_ramesh_kumar.jpg',
    fileType: 'image/jpeg',
    previewUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    pagesCount: 1,
    pages: [
      {
        pageNumber: 1,
        rawText: 'Rx: Glycomet 500mg BD p.c. | Telma 40mg OD a.m. | Amaryl 1mg OD a.c. | Follow up in 14 days.',
        boundingBoxes: [
          { id: 'bb-rx-1', page: 1, x: 12, y: 22, width: 76, height: 8, label: 'Glycomet 500mg BD (96%)', confidence: 0.96, type: 'medicine' },
          { id: 'bb-rx-2', page: 1, x: 12, y: 34, width: 72, height: 8, label: 'Telma 40mg OD (95%)', confidence: 0.95, type: 'medicine' },
          { id: 'bb-rx-3', page: 1, x: 12, y: 46, width: 74, height: 8, label: 'Amaryl 1mg OD (91%)', confidence: 0.91, type: 'medicine' },
        ],
      },
    ],
    documentType: 'PRESCRIPTION',
    documentTypeLabel: "Doctor's Prescription (Diabetes & Hypertension)",
    documentTypeConfidence: 0.94,
    isPrescription: true,
    isLabReport: false,
    patientInfo: {
      name: 'Ramesh Kumar',
      age: '54 Years',
      gender: 'Male',
      date: '2026-08-20',
    },
    doctorInfo: {
      doctorName: 'Dr. Anand Verma',
      clinicName: 'Jan Swasthya Kendra, Muzzafarpur (Bihar)',
      date: '2026-08-20',
      specialization: 'Diabetologist & Physician',
    },
    medicines: [
      { id: 'm1', brandName: 'Glycomet 500', genericName: 'Metformin HCl', dosage: '500 mg', frequency: '2 times daily (BD)', timing: 'After food', duration: '30 Days', confidence: 0.96, specialInstructions: 'Take after principal meals with water.' },
      { id: 'm2', brandName: 'Telma 40', genericName: 'Telmisartan', dosage: '40 mg', frequency: '1 time daily (OD)', timing: 'Morning empty stomach', duration: '30 Days', confidence: 0.95, specialInstructions: 'Take every morning at regular time.' },
      { id: 'm3', brandName: 'Amaryl 1mg', genericName: 'Glimepiride', dosage: '1 mg', frequency: '1 time daily (OD)', timing: 'Before breakfast', duration: '30 Days', confidence: 0.91, specialInstructions: 'Take 15 minutes before morning breakfast.' },
    ],
    testResults: [],
    importantInstructions: [
      'Reduce white polished rice; replace with millets (Ragi, Bajra).',
      'Walk for 30 minutes every morning.',
      'Check feet daily for any cuts or wounds.',
      'Follow up at the clinic in 14 days with fasting blood sugar reading.'
    ],
    overallSummary: {
      plainLanguageOverview: 'This prescription contains 3 active medications for Type-2 Diabetes and Blood Pressure management. All medicines are well-established Indian pharmaceutical brands.',
      withinRangeCount: 0,
      needsAttentionCount: 0,
      importantCount: 0,
      whatStandsOut: [
        { level: 'normal', text: 'Prescription is legible with 94% OCR extraction confidence.' },
        { level: 'normal', text: 'Medication schedule includes morning empty stomach, pre-breakfast, and post-meal timings.' }
      ],
      safetyAlert: undefined,
    },
    doctorQuestions: [
      'Should I continue Glycomet 500 at the same dosage if my fasting blood sugar drops below 100 mg/dL?',
      'Are there any specific dietary precautions while taking Telma 40 with potassium-rich foods?',
      'When should I perform my next HbA1c test?'
    ],
    contextualAnalysis: 'Your prescription includes Metformin (Glycomet) and Telmisartan. If blood glucose or kidney function lab tests are performed, they provide important monitoring data for this regimen.',
    regionalTranscripts: {
      en: {
        summaryText: 'This prescription is for Type 2 Diabetes and Hypertension medications.',
        voiceScript: 'Hello Ramesh. Your first medicine is Glycomet 500, to be taken twice daily after meals. Your second medicine is Telma 40, to be taken once daily in the morning on an empty stomach. Your third medicine is Amaryl 1mg, to be taken once daily before breakfast.',
      },
      hi: {
        summaryText: 'यह पर्चा टाइप-2 मधुमेह और उच्च रक्तचाप की दवाओं के लिए है।',
        voiceScript: 'नमस्ते रमेश जी। आपकी पहली दवा ग्लाइकोमेट 500 है, जिसे सुबह और शाम खाना खाने के बाद लेना है। दूसरी दवा तेलमा 40 है, जिसे सुबह खाली पेट लें। तीसरी दवा अमैरिल 1mg है, जिसे नाश्ते से पहले लें।',
      },
      ta: {
        summaryText: 'இந்த மருந்துச் சீட்டு நீரிழிவு நோய் மற்றும் இரத்த அழுத்தத்திற்கான மருந்துகளாகும்.',
        voiceScript: 'வணக்கம் ரமேஷ். உங்கள் முதல் மருந்து கிளைகோமெட் 500, இதை காலை மற்றும் மாலை உணவுக்குப் பிறகு சாப்பிட வேண்டும். இரண்டாவது மருந்து டெல்மா 40, காலை வெறும் வயிற்றில் எடுக்க வேண்டும்.',
      },
      bn: {
        summaryText: 'এই প্রেসক্রিপশনটি টাইপ-২ ডায়াবেটিস এবং উচ্চ রক্তচাপের ওষুধের জন্য।',
        voiceScript: 'নমস্কার রমেশ বাবু। আপনার প্রথম ওষুধ গ্লাইকোমেট ৫০০, সকালে এবং রাতে খাবারের পর খেতে হবে। দ্বিতীয় ওষুধ তেলমা ৪০, সকালে খালি পেটে খাবেন।',
      }
    },
    overallConfidence: 0.94,
    isLowConfidence: false,
    rawOcrText: 'Rx: Metformin (Glycomet) 500mg BD p.c. | Telmisartan (Telma) 40mg OD a.m. | Glimepiride (Amaryl) 1mg OD a.c. | Follow up in 14 days.',
    isDemo: true,
    createdAt: '2026-08-20T08:00:00Z',
  },
  {
    documentId: 'demo-report-002',
    analysisSessionId: 'session-demo-report-cbc',
    fileName: 'cbc_blood_report_sunita.pdf',
    fileType: 'application/pdf',
    previewUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    pagesCount: 2,
    pages: [
      {
        pageNumber: 1,
        rawText: 'PATIENT: Sunita Devi | AGE/SEX: 32 Yrs / Female | CBC REPORT | Hemoglobin: 10.2 g/dL (Ref: 12.0-16.0) | Total WBC Count: 11,800 /cumm (Ref: 4,000-11,000) | RBC Count: 4.10 mill/cumm (Ref: 3.8-5.2)',
        boundingBoxes: [
          { id: 'bb-cbc-1', page: 1, x: 10, y: 22, width: 80, height: 7, label: 'Hemoglobin: 10.2 g/dL [Low] (97%)', confidence: 0.97, type: 'warning' },
          { id: 'bb-cbc-2', page: 1, x: 10, y: 32, width: 80, height: 7, label: 'Total WBC: 11,800 /cumm [High] (95%)', confidence: 0.95, type: 'warning' },
          { id: 'bb-cbc-3', page: 1, x: 10, y: 42, width: 80, height: 7, label: 'RBC Count: 4.10 mill/cumm [Normal] (94%)', confidence: 0.94, type: 'test' },
        ],
      },
      {
        pageNumber: 2,
        rawText: 'Platelet Count: 1.65 Lakhs/cumm (Ref: 1.50-4.50) | PCV/Hematocrit: 32.5 % (Ref: 36.0-46.0) | ESR: 28 mm/hr (Ref: 0-20)',
        boundingBoxes: [
          { id: 'bb-cbc-4', page: 2, x: 10, y: 18, width: 80, height: 7, label: 'Platelet Count: 1.65 Lakhs/cumm [Normal] (96%)', confidence: 0.96, type: 'test' },
          { id: 'bb-cbc-5', page: 2, x: 10, y: 28, width: 80, height: 7, label: 'PCV / Hematocrit: 32.5 % [Low] (92%)', confidence: 0.92, type: 'warning' },
          { id: 'bb-cbc-6', page: 2, x: 10, y: 38, width: 80, height: 7, label: 'ESR (1 hr): 28 mm/hr [Elevated] (93%)', confidence: 0.93, type: 'warning' },
        ],
      }
    ],
    documentType: 'CBC_REPORT',
    documentTypeLabel: 'Complete Blood Count (CBC) Lab Report',
    documentTypeConfidence: 0.96,
    isPrescription: false,
    isLabReport: true,
    patientInfo: {
      name: 'Sunita Devi',
      age: '32 Years',
      gender: 'Female',
      date: '2026-08-21',
      uhid: 'LAB-2026-8841',
    },
    doctorInfo: {
      doctorName: 'Dr. Priya Sundaram',
      clinicName: 'Apex Diagnostic & Pathology Center',
      date: '2026-08-21',
      specialization: 'Consultant Pathologist',
    },
    medicines: [],
    testResults: [
      { id: 't1', name: 'Hemoglobin', value: '10.2', numericValue: 10.2, unit: 'g/dL', referenceRange: '12.0 - 16.0 g/dL', status: 'NEEDS_ATTENTION', confidence: 0.97, page: 1, category: 'Erythrocyte Indices', explanation: 'Hemoglobin carries oxygen in your red blood cells throughout your body.' },
      { id: 't2', name: 'Total Leukocyte Count (WBC)', value: '11,800', numericValue: 11800, unit: '/cumm', referenceRange: '4,000 - 11,000 /cumm', status: 'NEEDS_ATTENTION', confidence: 0.95, page: 1, category: 'Leukocyte Indices', explanation: 'White blood cells defend against infections and acute inflammation.' },
      { id: 't3', name: 'RBC Count', value: '4.10', numericValue: 4.10, unit: 'mill/cumm', referenceRange: '3.80 - 5.20 mill/cumm', status: 'NORMAL', confidence: 0.94, page: 1, category: 'Erythrocyte Indices', explanation: 'Total red blood cells circulating in blood.' },
      { id: 't4', name: 'Platelet Count', value: '1.65', numericValue: 1.65, unit: 'Lakhs/cumm', referenceRange: '1.50 - 4.50 Lakhs/cumm', status: 'NORMAL', confidence: 0.96, page: 2, category: 'Platelet Indices', explanation: 'Platelets are responsible for healthy blood clotting.' },
      { id: 't5', name: 'PCV / Hematocrit', value: '32.5', numericValue: 32.5, unit: '%', referenceRange: '36.0 - 46.0 %', status: 'NEEDS_ATTENTION', confidence: 0.92, page: 2, category: 'Erythrocyte Indices', explanation: 'Percentage of blood volume occupied by red blood cells.' },
      { id: 't6', name: 'Erythrocyte Sedimentation Rate (ESR)', value: '28', numericValue: 28, unit: 'mm/1st hr', referenceRange: '0 - 20 mm/1st hr', status: 'NEEDS_ATTENTION', confidence: 0.93, page: 2, category: 'Inflammatory Markers', explanation: 'Indicates presence of mild inflammation or temporary infection.' },
    ],
    importantInstructions: [
      'Correlate findings with clinical symptoms and history.',
      'Consult treating physician for interpretation regarding mild anemia or infection.',
    ],
    overallSummary: {
      plainLanguageOverview: 'This CBC report shows 2 normal parameters (RBC Count, Platelet Count) and 4 parameters outside printed reference limits (Hemoglobin is slightly low; WBC and ESR are mildly elevated, which can occur during recovery from a viral/bacterial episode).',
      withinRangeCount: 2,
      needsAttentionCount: 4,
      importantCount: 0,
      whatStandsOut: [
        { level: 'attention', text: '🟡 Hemoglobin (10.2 g/dL) is below the stated reference range (12.0 - 16.0 g/dL).' },
        { level: 'attention', text: '🟡 Total WBC Count (11,800 /cumm) and ESR (28 mm/hr) are slightly above the reference range.' },
        { level: 'normal', text: '🟢 Platelet Count (1.65 Lakhs/cumm) is within the normal healthy range.' },
      ],
      safetyAlert: undefined,
    },
    doctorQuestions: [
      'Is my mildly low hemoglobin (10.2 g/dL) due to dietary iron intake or recent infection?',
      'Do the elevated WBC and ESR levels suggest an ongoing or resolving respiratory infection?',
      'Should I repeat this CBC test after completing my antibiotic course?'
    ],
    changesOverTime: [
      { testName: 'Hemoglobin', previousValue: '9.8 g/dL', latestValue: '10.2 g/dL', unit: 'g/dL', trend: 'IMPROVED', trendDescription: 'Improved by +0.4 g/dL since previous test (2026-06-15)' },
      { testName: 'Total WBC Count', previousValue: '14,200 /cumm', latestValue: '11,800 /cumm', unit: '/cumm', trend: 'IMPROVED', trendDescription: 'Decreased towards normal from acute peak' }
    ],
    regionalTranscripts: {
      en: {
        summaryText: 'CBC Report: Hemoglobin is slightly below reference range (10.2 g/dL), WBC is mildly elevated (11,800 /cumm), and Platelet count is normal.',
        voiceScript: 'Hello Sunita. Your blood report has been scanned. Your platelet count is normal at 1.65 lakhs. Your hemoglobin is slightly below the reference range at 10.2, and your white blood cell count is mildly elevated at 11,800. Please discuss these findings with your doctor.',
      },
      hi: {
        summaryText: 'सीबीसी रिपोर्ट: हीमोग्लोबिन संदर्भ सीमा से थोड़ा कम (10.2 g/dL) है, डब्ल्यूबीसी हल्का बढ़ा हुआ (11,800) है, और प्लेटलेट्स सामान्य हैं।',
        voiceScript: 'नमस्ते सुनीता जी। आपकी रक्त रिपोर्ट का विश्लेषण पूरा हो गया है। आपका प्लेटलेट काउंट 1.65 लाख के साथ सामान्य है। हीमोग्लोबिन 10.2 पर संदर्भ सीमा से कुछ कम है, और डब्ल्यूबीसी हल्का बढ़ा हुआ है। कृपया अपने डॉक्टर से इस पर सलाह लें।',
      },
      ta: {
        summaryText: 'இரத்த பரிசோதனை அறிக்கை: ஹீமோகுளோபின் 10.2, பிளேட்லெட்டுகள் இயல்பானவை.',
        voiceScript: 'வணக்கம் சுனிதா. உங்கள் இரத்த பரிசோதனையில் பிளேட்லெட் எண்ணிக்கை சாதாரணமாக உள்ளது. ஹீமோகுளோபின் சற்றே குறைவாக உள்ளது. மருத்துவரிடம் ஆலோசிக்கவும்.',
      }
    },
    overallConfidence: 0.95,
    isLowConfidence: false,
    rawOcrText: 'PATIENT: Sunita Devi | AGE/SEX: 32 Yrs / Female | CBC REPORT | Hemoglobin: 10.2 g/dL (Ref: 12.0-16.0) | Total WBC Count: 11,800 /cumm (Ref: 4,000-11,000) | RBC Count: 4.10 mill/cumm (Ref: 3.8-5.2) | Platelet Count: 1.65 Lakhs/cumm (Ref: 1.50-4.50) | PCV: 32.5 % (Ref: 36.0-46.0) | ESR: 28 mm/hr (Ref: 0-20)',
    isDemo: true,
    createdAt: '2026-08-21T09:30:00Z',
  },
  {
    documentId: 'demo-report-003',
    analysisSessionId: 'session-demo-report-lipid',
    fileName: 'lipid_and_diabetes_panel.pdf',
    fileType: 'application/pdf',
    previewUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    pagesCount: 1,
    pages: [
      {
        pageNumber: 1,
        rawText: 'PATIENT: Ramesh Kumar | AGE: 54 Yrs | FASTING GLUCOSE & LIPID PANEL | Fasting Blood Sugar: 148 mg/dL (Ref: 70-100) | HbA1c: 7.8 % (Ref: 4.0-5.6) | Total Cholesterol: 230 mg/dL (Ref: 125-200) | LDL: 145 mg/dL (Ref: 50-100) | HDL: 42 mg/dL (Ref: 40-80) | Triglycerides: 215 mg/dL (Ref: 50-150) | Serum Creatinine: 0.95 mg/dL (Ref: 0.6-1.2)',
        boundingBoxes: [
          { id: 'bb-lip-1', page: 1, x: 10, y: 15, width: 80, height: 7, label: 'Fasting Blood Sugar: 148 mg/dL [High] (98%)', confidence: 0.98, type: 'warning' },
          { id: 'bb-lip-2', page: 1, x: 10, y: 25, width: 80, height: 7, label: 'HbA1c: 7.8 % [High] (97%)', confidence: 0.97, type: 'warning' },
          { id: 'bb-lip-3', page: 1, x: 10, y: 35, width: 80, height: 7, label: 'Total Cholesterol: 230 mg/dL [High] (95%)', confidence: 0.95, type: 'warning' },
          { id: 'bb-lip-4', page: 1, x: 10, y: 45, width: 80, height: 7, label: 'Serum Creatinine: 0.95 mg/dL [Normal] (96%)', confidence: 0.96, type: 'test' },
        ],
      }
    ],
    documentType: 'DIABETES_REPORT',
    documentTypeLabel: 'Comprehensive Diabetes & Lipid Profile',
    documentTypeConfidence: 0.97,
    isPrescription: false,
    isLabReport: true,
    patientInfo: {
      name: 'Ramesh Kumar',
      age: '54 Years',
      gender: 'Male',
      date: '2026-08-20',
      uhid: 'LAB-2026-4419',
    },
    doctorInfo: {
      doctorName: 'Dr. Anand Verma',
      clinicName: 'Muzzafarpur Clinical Laboratories',
      date: '2026-08-20',
      specialization: 'Consultant Biochemist',
    },
    medicines: [],
    testResults: [
      { id: 't-d1', name: 'Fasting Blood Glucose', value: '148', numericValue: 148, unit: 'mg/dL', referenceRange: '70 - 100 mg/dL', status: 'NEEDS_ATTENTION', confidence: 0.98, page: 1, category: 'Diabetes Profile', explanation: 'Measures blood sugar level after fasting.', convertedValue: '8.2', convertedUnit: 'mmol/L' },
      { id: 't-d2', name: 'HbA1c (Glycated Hemoglobin)', value: '7.8', numericValue: 7.8, unit: '%', referenceRange: '4.0 - 5.6 %', status: 'NEEDS_ATTENTION', confidence: 0.97, page: 1, category: 'Diabetes Profile', explanation: 'Reflects average blood sugar levels over the last 3 months.' },
      { id: 't-d3', name: 'Total Cholesterol', value: '230', numericValue: 230, unit: 'mg/dL', referenceRange: '125 - 200 mg/dL', status: 'NEEDS_ATTENTION', confidence: 0.95, page: 1, category: 'Lipid Profile', explanation: 'Total circulating blood cholesterol.', convertedValue: '5.9', convertedUnit: 'mmol/L' },
      { id: 't-d4', name: 'LDL Cholesterol (Bad)', value: '145', numericValue: 145, unit: 'mg/dL', referenceRange: '50 - 100 mg/dL', status: 'NEEDS_ATTENTION', confidence: 0.94, page: 1, category: 'Lipid Profile', explanation: 'Low-density lipoprotein cholesterol.' },
      { id: 't-d5', name: 'HDL Cholesterol (Good)', value: '42', numericValue: 42, unit: 'mg/dL', referenceRange: '40 - 80 mg/dL', status: 'NORMAL', confidence: 0.95, page: 1, category: 'Lipid Profile', explanation: 'High-density protective cholesterol.' },
      { id: 't-d6', name: 'Triglycerides', value: '215', numericValue: 215, unit: 'mg/dL', referenceRange: '50 - 150 mg/dL', status: 'NEEDS_ATTENTION', confidence: 0.93, page: 1, category: 'Lipid Profile', explanation: 'Blood fats stored from caloric intake.' },
      { id: 't-d7', name: 'Serum Creatinine', value: '0.95', numericValue: 0.95, unit: 'mg/dL', referenceRange: '0.60 - 1.20 mg/dL', status: 'NORMAL', confidence: 0.96, page: 1, category: 'Renal Function', explanation: 'Kidney filtration marker.' },
    ],
    importantInstructions: [
      'Maintain fasting state for 10-12 hours prior to repeat lipid evaluations.',
      'Review blood sugar and lipid results with treating physician.'
    ],
    overallSummary: {
      plainLanguageOverview: 'This report indicates elevated Fasting Blood Glucose (148 mg/dL) and HbA1c (7.8%), alongside elevated Total Cholesterol (230 mg/dL) and Triglycerides (215 mg/dL). Kidney filtration (Serum Creatinine 0.95 mg/dL) and protective HDL (42 mg/dL) are within normal reference ranges.',
      withinRangeCount: 2,
      needsAttentionCount: 5,
      importantCount: 0,
      whatStandsOut: [
        { level: 'attention', text: '🟡 Fasting Blood Sugar (148 mg/dL) and HbA1c (7.8%) are above standard reference limits.' },
        { level: 'attention', text: '🟡 Total Cholesterol (230 mg/dL) and Triglycerides (215 mg/dL) are above the printed reference range.' },
        { level: 'normal', text: '🟢 Serum Creatinine (0.95 mg/dL) is healthy and within normal range.' }
      ],
      safetyAlert: undefined,
    },
    doctorQuestions: [
      'Given my HbA1c of 7.8%, should we adjust my current Glycomet or diet plan?',
      'Do I need lipid-lowering medication (such as a statin) for my LDL of 145 mg/dL?',
      'How frequently should I check my fasting and post-prandial blood sugar at home?'
    ],
    contextualAnalysis: 'AI Contextual Analysis: Your active prescription contains Glycomet 500 (Metformin) and Amaryl 1mg (Glimepiride). This report shows Fasting Glucose of 148 mg/dL and HbA1c of 7.8%. Bringing both documents to your physician will assist them in reviewing your glycemic control.',
    changesOverTime: [
      { testName: 'HbA1c', previousValue: '8.4 %', latestValue: '7.8 %', unit: '%', trend: 'IMPROVED', trendDescription: 'Decreased by -0.6% from previous quarter' },
      { testName: 'Fasting Blood Sugar', previousValue: '172 mg/dL', latestValue: '148 mg/dL', unit: 'mg/dL', trend: 'IMPROVED', trendDescription: 'Improved by -24 mg/dL towards target' }
    ],
    regionalTranscripts: {
      en: {
        summaryText: 'Diabetes & Lipid Report: Fasting Glucose is 148 mg/dL, HbA1c is 7.8%, and Creatinine is normal at 0.95 mg/dL.',
        voiceScript: 'Hello Ramesh. Your diabetes and lipid panel shows a fasting blood sugar of 148 and an HbA1c of 7.8 percent. Your kidney creatinine level is normal at 0.95. Please discuss these results with your doctor.',
      },
      hi: {
        summaryText: 'डायबिटीज व लिपिड रिपोर्ट: फास्टिंग शुगर 148 mg/dL, एचबीए1सी 7.8%, क्रिएटिनिन 0.95 सामान्य।',
        voiceScript: 'नमस्ते रमेश जी। आपकी रिपोर्ट में फास्टिंग शुगर 148 और एचबीए1सी 7.8 प्रतिशत है। आपके गुर्दे का क्रिएटिनिन मान 0.95 पर पूरी तरह सामान्य है। कृपया इन परिणामों पर अपने डॉक्टर से परामर्श करें।',
      },
      ta: {
        summaryText: 'சர்க்கரை மற்றும் கொழுப்பு அறிக்கை: சர்க்கரை அளவு 148, HbA1c 7.8%.',
        voiceScript: 'வணக்கம் ரமேஷ். உங்கள் இரத்த சர்க்கரை 148 மற்றும் HbA1c 7.8 ஆக உள்ளது. மருத்துவரிடம் ஆலோசிக்கவும்.',
      }
    },
    overallConfidence: 0.97,
    isLowConfidence: false,
    rawOcrText: 'PATIENT: Ramesh Kumar | AGE: 54 Yrs | FASTING GLUCOSE & LIPID PANEL | Fasting Blood Sugar: 148 mg/dL (Ref: 70-100) | HbA1c: 7.8 % (Ref: 4.0-5.6) | Total Cholesterol: 230 mg/dL (Ref: 125-200) | LDL: 145 mg/dL (Ref: 50-100) | HDL: 42 mg/dL (Ref: 40-80) | Triglycerides: 215 mg/dL (Ref: 50-150) | Serum Creatinine: 0.95 mg/dL (Ref: 0.6-1.2)',
    isDemo: true,
    createdAt: '2026-08-20T10:00:00Z',
  }
];

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-101',
    name: 'Dr. Anand Verma',
    specialty: 'General Physician & Diabetologist',
    experienceYears: 14,
    qualifications: 'MBBS, MD (Medicine)',
    clinicAddress: 'Station Road, Near Bus Stand, Muzzafarpur',
    district: 'Muzzafarpur',
    distanceKm: 2.4,
    geohash: 'tus81y',
    languages: ['Hindi', 'Bhojpuri', 'English'],
    phoneNumber: '+91 98350 12345',
    consultationFee: 200,
    rating: 4.8,
    availableOffline: true
  },
  {
    id: 'doc-102',
    name: 'Dr. Priya Sundaram',
    specialty: 'Pediatrician & Child Health',
    experienceYears: 9,
    qualifications: 'MBBS, DCH',
    clinicAddress: 'Main Road, Villupuram Market',
    district: 'Villupuram',
    distanceKm: 4.1,
    geohash: 'tf34xz',
    languages: ['Tamil', 'English'],
    phoneNumber: '+91 94441 67890',
    consultationFee: 150,
    rating: 4.9,
    availableOffline: true
  },
  {
    id: 'doc-103',
    name: 'Dr. Harpreet Singh',
    specialty: 'Cardiologist',
    experienceYears: 18,
    qualifications: 'MBBS, DM (Cardiology)',
    clinicAddress: 'GT Road, Near Civil Hospital, Ludhiana',
    district: 'Ludhiana',
    distanceKm: 7.8,
    geohash: 'ttq29v',
    languages: ['Punjabi', 'Hindi', 'English'],
    phoneNumber: '+91 98140 54321',
    consultationFee: 300,
    rating: 4.7,
    availableOffline: true
  },
  {
    id: 'doc-104',
    name: 'Dr. Subhashish Mohanty',
    specialty: 'General Physician',
    experienceYears: 11,
    qualifications: 'MBBS',
    clinicAddress: 'Town Hall Square, Kalahandi',
    district: 'Kalahandi',
    distanceKm: 12.5,
    geohash: 'tg611m',
    languages: ['Odia', 'Hindi'],
    phoneNumber: '+91 99371 99887',
    consultationFee: 100,
    rating: 4.6,
    availableOffline: true
  },
  {
    id: 'doc-105',
    name: 'Dr. Debabrata Banerjee',
    specialty: 'Pulmonologist & Chest Specialist',
    experienceYears: 15,
    qualifications: 'MBBS, DTCD, MD',
    clinicAddress: 'College Road, Siliguri',
    district: 'Siliguri',
    distanceKm: 18.2,
    geohash: 'tun99x',
    languages: ['Bengali', 'Hindi', 'Assamese'],
    phoneNumber: '+91 98310 44332',
    consultationFee: 250,
    rating: 4.8,
    availableOffline: true
  }
];

export const MOCK_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    time: '08:00 AM',
    period: 'Morning',
    medicineName: 'Glycomet 500 (Metformin)',
    dosage: '1 Tablet',
    foodRelation: 'After Breakfast',
    taken: true,
    regionalAudioText: 'सुबह 8 बजे ग्लाइकोमेट 500 खाने का समय हो गया है।'
  },
  {
    id: 'rem-2',
    time: '08:15 AM',
    period: 'Morning',
    medicineName: 'Telma 40 (Telmisartan)',
    dosage: '1 Tablet',
    foodRelation: 'Before Breakfast',
    taken: false,
    regionalAudioText: 'सुबह 8:15 बजे बीपी की दवा तेलमा 40 लेने का समय है।'
  },
  {
    id: 'rem-3',
    time: '02:00 PM',
    period: 'Afternoon',
    medicineName: 'Mox 500 (Amoxicillin)',
    dosage: '1 Capsule',
    foodRelation: 'After Lunch',
    taken: false,
    regionalAudioText: 'दोपहर 2 बजे एंटीबायोटिक मॉक्स 500 खाने का समय हो गया है।'
  },
  {
    id: 'rem-4',
    time: '08:30 PM',
    period: 'Night',
    medicineName: 'Glycomet 500 (Metformin)',
    dosage: '1 Tablet',
    foodRelation: 'After Dinner',
    taken: false,
    regionalAudioText: 'रात 8:30 बजे ग्लाइकोमेट 500 खाने का समय हो गया है।'
  }
];

export const EVALUATION_CASES: EvaluationCase[] = [
  { id: 1, category: 'OCR', title: 'Low-light handwritten prescription', scenario: 'Blurry photo taken on $50 Android phone', expectedResult: 'Confidence < 60%, triggers Voice Refusal Modal', status: 'PASS' },
  { id: 2, category: 'OCR', title: 'Thermal printed bill script', scenario: 'Faded receipt printout from PHC dispensary', expectedResult: 'Adaptive binarization filter cleans text before OCR', status: 'PASS' },
  { id: 3, category: 'OCR', title: 'Mixed Hindi-English brand names', scenario: 'Dr writes "Crocin 500mg din me 2 baar"', expectedResult: 'Extracted frequency BD, generic Paracetamol mapped', status: 'PASS' },
  { id: 4, category: 'OCR', title: 'Abbreviated Latin dosage', scenario: 'Prescription contains "t.i.d. p.c."', expectedResult: 'Standardized to "3 times daily after food"', status: 'PASS' },
  { id: 5, category: 'OCR', title: 'Missing dosage numbers', scenario: 'Handwriting smudged over dosage column', expectedResult: 'Flagged as unverified, prompts user voice input', status: 'PASS' },
  { id: 6, category: 'Translation', title: 'Medical jargon translation', scenario: 'Translating "Postprandial Hyperglycemia" to Bhojpuri', expectedResult: 'Renders as "खाना खइला के बाद चीनी के मात्रा बढ़ल"', status: 'PASS' },
  { id: 7, category: 'Translation', title: 'Gender agreement in Marathi', scenario: 'Male vs Female patient voice instructions', expectedResult: 'Correct verb suffixes in TTS synthesis', status: 'PASS' },
  { id: 8, category: 'Translation', title: 'Missing regional font package', scenario: 'Device lacks native Odia font rendering', expectedResult: 'Fallback to embedded Noto Sans Odia Woff2', status: 'PASS' },
  { id: 9, category: 'Translation', title: 'Long instruction audio chunking', scenario: 'Multi-drug instruction > 200 words', expectedResult: 'Pipelined chunking avoids Web Audio buffer overflow', status: 'PASS' },
  { id: 10, category: 'Translation', title: 'Regional dialect phrase mapping', scenario: 'User says "छाती में धाक-धाक होत बा" (Chest fluttering)', expectedResult: 'Mapped to Palpitations symptom category', status: 'PASS' },
  { id: 11, category: 'Disease Safety', title: 'Diabetes + CKD Contraindication', scenario: 'Metformin scanned for patient with kidney history', expectedResult: 'Warning banner: "Consult doctor for renal dosage adjustment"', status: 'PASS' },
  { id: 12, category: 'Disease Safety', title: 'High-risk pediatric antibiotic', scenario: 'Adult antibiotic dosage scanned for 3yo child', expectedResult: 'High severity alert blocks auto-reminder', status: 'PASS' },
  { id: 13, category: 'Disease Safety', title: 'Pregnancy Category X drug', scenario: 'Statin or Isotretinoin scanned for pregnant user', expectedResult: 'Immediate Red Alert Modal: Unsafe in pregnancy', status: 'PASS' },
  { id: 14, category: 'Disease Safety', title: 'Active drug interaction', scenario: 'Scanned NSAID while active Anticoagulant saved', expectedResult: 'Bleeding risk alert generated', status: 'PASS' },
  { id: 15, category: 'Disease Safety', title: 'Unrecognized chemical compound', scenario: 'Completely unreadable drug name', expectedResult: 'Zero hallucinated medical advice; direct pharmacist referral', status: 'PASS' },
  { id: 16, category: 'Offline Doctor', title: 'No doctor within 50km radius', scenario: 'Remote tribal village location', expectedResult: 'Expands radius to tele-health kiosk database', status: 'PASS' },
  { id: 17, category: 'Offline Doctor', title: 'Airplane mode without GPS lock', scenario: 'Device offline in basement clinic', expectedResult: 'Falls back to user saved district/pincode database', status: 'PASS' },
  { id: 18, category: 'Offline Doctor', title: 'Outdated offline cache badge', scenario: 'Doctor directory last updated 45 days ago', expectedResult: 'Shows Amber "Offline Cache (Needs Sync)" badge', status: 'PASS' },
  { id: 19, category: 'Offline Doctor', title: 'Emergency specialty mismatch', scenario: 'Cardiac SOS triggered near dental clinic', expectedResult: 'Filters out dental clinics, routes to 24/7 Casualty Hospital', status: 'PASS' },
  { id: 20, category: 'Offline Doctor', title: 'Network flip mid-booking transaction', scenario: 'Booking initiated offline, network connects mid-step', expectedResult: 'Outbox idempotency key prevents duplicate booking', status: 'PASS' }
];

export const FAILURE_LOG_SEEDS: FailureLogEntry[] = [
  { id: 'FL-101', timestamp: '2026-08-21 14:02:11', component: 'ONNX_OCR_ENGINE', errorSignature: 'WASM_MEM_ALLOC_FAIL', rootCause: 'Raw 12MP camera image passed uncompressed into WASM heap', mitigation: 'Added 1024x1024 client-side canvas downscaler' },
  { id: 'FL-102', timestamp: '2026-08-21 15:22:45', component: 'PIPER_TTS_AUDIO', errorSignature: 'AUDIO_CTX_DECODE_ERR', rootCause: 'Unsupported Unicode accent character in Bhojpuri script payload', mitigation: 'Added glyph sanitizer regex filter prior to TTS synthesis' },
  { id: 'FL-103', timestamp: '2026-08-21 17:10:04', component: 'SQLITE_SPATIAL_INDEX', errorSignature: 'DB_LOCKED_TIMEOUT', rootCause: 'Sync outbox and UI read worker lock collision', mitigation: 'Enabled SQLite WAL (Write-Ahead-Logging) mode' },
  { id: 'FL-104', timestamp: '2026-08-21 19:40:19', component: 'LANGGRAPH_GATEKEEPER', errorSignature: 'CONFIDENCE_THRESHOLD_BYPASS', rootCause: 'Null confidence score evaluated as truthy in Javascript', mitigation: 'Enforced explicit strict number validation schema' }
];
