export interface MedicineDetail {
  name: string;
  generic: string;
  uses: string;
  sideEffects: string;
  precautions: string;
  warnings: string;
}

export interface SymptomDetail {
  name: string;
  causes: string;
  recommendations: string;
  questions: string[];
}

export const EMERGENCY_RESPONSES: Record<string, string> = {
  en: "🚨 URGENT MEDICAL ATTENTION REQUIRED: This could indicate a life-threatening medical emergency. Please seek immediate professional medical attention at the nearest emergency room or hospital, or call emergency services (108/112) immediately. Do not delay.",
  hi: "🚨 तत्काल चिकित्सा सहायता की आवश्यकता है: यह एक जानलेवा आपातकालीन स्थिति का संकेत हो सकता है। कृपया तुरंत नजदीकी अस्पताल के आपातकालीन विभाग में जाएं या आपातकालीन सेवाओं (108/112) से संपर्क करें। देरी न करें।",
  bho: "🚨 तुरंत डाक्टर से मिलीं: ई जानलेवा इमरजेंसी के संकेत हो सकेला। तुरंत नजदीकी अस्पताल के इमरजेंसी में जाईं या 108/112 पर फोन करीं। देरी मत करीं।",
  pa: "🚨 ਤੁਰੰਤ ਡਾਕਟਰੀ ਸਹਾਇਤਾ ਦੀ ਲੋੜ ਹੈ: ਇਹ ਇੱਕ ਜਾਨਲੇਵਾ ਐਮਰਜੈਂਸੀ ਦਾ ਸੰਕੇਤ ਹੋ ਸਕਦਾ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਨਜ਼ਦੀਕੀ ਹਸਪਤਾਲ ਜਾਓ ਜਾਂ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ (108/112) 'ਤੇ ਕਾਲ ਕਰੋ। ਦੇਰੀ ਨਾ ਕਰੋ।",
  ta: "🚨 அவசர மருத்துவ உதவி தேவை: இது உயிருக்கு ஆபத்தான அவசர நிலையைக் குறிக்கலாம். தயవుசெய்து உடனடியாக அருகிலுள்ள அவசர சிகிச்சைப் பிரிவிற்குச் செல்லவும் அல்லது அவசர சேவைகளை (108/112) அழைக்கவும். தாமதிக்க வேண்டாம்.",
  te: "🚨 అత్యవసర వైద్య సహాయం అవసరం: ఇది ప్రాణాంతక అత్యవసర పరిస్థితిని సూచించవచ్చు. దయచేసి వెంటనే సమీపంలోని ఆసుపత్రికి వెళ్ళండి లేదా అత్యవసర సేవలను (108/112) సంప్రదించండి. ఆలస్యం చేయవద్దు.",
  bn: "🚨 জরুরী চিকিৎসা মনোযোগ প্রয়োজন: এটি একটি জীবনঘাতী জরুরী অবস্থার ইঙ্গিত হতে পারে। অনুগ্রহ করে অবিলম্বে নিকটস্থ হাসপাতালের জরুরী বিভাগে যান অথবা জরুরী পরিষেবাগুলিতে (108/112) কল করুন। দেরি করবেন না।",
  mr: "🚨 त्वरित वैद्यकीय मदतीची आवश्यकता आहे: हे प्राणघातक आपत्कालीन परिस्थितीचे संकेत असू शकते. कृपया त्वरित जवळच्या रुग्णालयात जा किंवा आपत्कालीन सेवांशी (108/112) संपर्क साधा. उशीर करू नका.",
  gu: "🚨 તાત્કાલિક તબીબી સહાયની જરૂર છે: આ જીવલેણ કટોકટીનો સંકેત હોઈ શકે છે. કૃપા કરીને તરત જ નજીકની હોસ્પિટલના ઇમરજન્સી વિભાગમાં જાઓ અથવા ઇમરજન્સી સેવાઓ (108/112) નો સંપર્ક કરો.",
  kn: "🚨 ತುರ್ತು ವೈದ್ಯಕೀಯ ನೆರವು ಅಗತ್ಯವಿದೆ: ಇದು ಪ್ರಾಣಾಪಾಯದ ತುರ್ತು ಪರಿಸ್ಥಿತಿಯನ್ನು ಸೂಚಿಸಬಹುದು. ದಯವಿಟ್ಟು ತಕ್ಷಣ ಹತ್ತಿರದ ಆಸ್ಪತ್ರೆಗೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ತುರ್ತು ಸೇವೆಗಳಿಗೆ (108/112) ಕರೆ ಮಾಡಿ.",
  ml: "🚨 അടിയന്തിര വൈദ്യസഹായം ആവശ്യമാണ്: ഇത് ജീവന് തന്നെ ഭീഷണിയായേക്കാവുന്ന അവസ്ഥയെ സൂചിപ്പിക്കുന്നു. ദയവായി ഉടൻ തന്നെ അടുത്തുള്ള ആശുപത്രിയിൽ പോകുകയോ അടിയന്തിര സേവനങ്ങളെ (108/112) ബന്ധപ്പെടുത്തുകയോ ചെയ്യുക.",
  or: "🚨 ତୁରନ୍ତ ଚିକିତ୍ସା ସହାୟତା ଆବଶ୍ୟਕ: ଏହା ଏକ ପ୍ରାଣଘာତକ ଜରուରୀ ପରିସ୍ଥିତି ହୋଇପାରେ। ଦୟାକରି ତୁରନ୍ତ ନିକଟସ୍ଥ ଡାକ୍ତରଖାନାକୁ ଯାଆନ୍ତು କିମ୍ବା ଜରուରୀକାଳୀਨ ସେବା (108/112) କୁ କଲ୍ କରନ୍ତು।",
  as: "🚨 জৰুৰীকালীন চিকিৎসাৰ প্ৰয়োজন: ই এক বিপদজনক স্থিতিৰ ইংগিত হ’ব পাৰে। অনুগ্ৰহ কৰি পলম নকৰি ওচৰৰ চিকিৎসালয়লৈ যাওক বা ১০৮/১১২ নম্বৰত যোগাযোগ কৰক।",
  ur: "🚨 فوری طبی امداد کی ضرورت ہے: یہ ایک جان لیوا ہنگامی صورتحال کا اشارہ ہو سکتا ہے۔ براہ کرم تاخیر کیے بغیر فوری طور پر قریبی اسپتال کے ایمرجنسی وارڈ میں جائیں یا ہنگامی سروس (108/112) سے رابطہ کریں۔",
  hinglish: "🚨 URGENT MEDICAL ATTENTION REQUIRED: Ye ek emergency situation ho sakti hai. Please turant paas ke hospital ke emergency ward me jaye ya 108/112 emergency services ko call kare. Late mat kare.",
  tanglish: "🚨 URGENT MEDICAL ATTENTION REQUIRED: Idhu oru emergency situation. Udane pakkatula irukura hospital emergency-ku ponga, illa 108/112-ku call pannunga. Delay pannadhinga.",
  tenglish: "🚨 URGENT MEDICAL ATTENTION REQUIRED: Idhi emergency situation kavachhu. Ventane daggarlo unna hospital emergency department ki vellandi, leda 108/112 ki call cheyandi. Delay cheyoddu.",
  benglish: "🚨 URGENT MEDICAL ATTENTION REQUIRED: Eta emergency situation hote pare. Please ekhuni kacher hospital-er emergency department-e jaan, ba 108/112-te call korun. Deri korben na.",
  manglish: "🚨 URGENT MEDICAL ATTENTION REQUIRED: Ithu oru emergency situation aayekkam. Thayavayi udan thanne arivaaya emergency departmentil pokuka, allenkil 108/112 vilikkuka. Vaikippikaruthu."
};

export const PRESCRIPTION_RESPONSES: Record<string, string> = {
  en: "Please upload a clear image or PDF of your prescription using the upload button so that I can scan and explain it to you.",
  hi: "कृपया अपलोड बटन का उपयोग करके अपने पर्चे (Prescription) की एक स्पष्ट तस्वीर या पीडीएफ अपलोड करें ताकि मैं इसे स्कैन करके आपको समझा सकूं।",
  bho: "पर्चा के साफ फोटो या पीडीएफ अपलोड करीं ताकि हम ओकरा के जांच करके रउआ के समझा सकीं।",
  pa: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪਰਚੇ (Prescription) ਦੀ ਇੱਕ ਸਾਫ਼ ਤਸਵੀਰ ਜਾਂ ਪੀਡੀਐਫ ਅਪਲੋਡ ਕਰੋ ਤਾਂ ਜੋ ਮੈਂ ਇਸਨੂੰ ਸਕੈਨ ਕਰਕੇ ਤੁਹਾਨੂੰ ਸਮਝਾ ਸਕਾਂ।",
  ta: "தயவுசெய்து உங்கள் மருந்துச் சீட்டின் (Prescription) தெளிவான படம் அல்லது PDF ஐ பதிவேற்றவும், அதை நான் ஸ்கேன் செய்து உங்களுக்கு விளக்குகிறேன்.",
  te: "దయచేసి మీ ప్రిస్క్రిప్షన్ యొక్క స్పష్టమైన చిత్రం లేదా PDF ని అప్‌లోడ్ చేయండి, తద్వారా నేను దానిని స్కాన్ చేసి మీకు వివరించగలను.",
  bn: "দয়া করে আপনার প্রেসক্রিপশনের একটি পরিষ্কার ছবি বা পিডিএফ আপলোড করুন যাতে আমি এটি স্ক্যান করে আপনাকে বুঝিয়ে বলতে পারি।",
  mr: "कृपया आपल्या प्रिस्क्रिप्शनचे स्पष्ट चित्र किंवा पीडीएफ अपलोड करा जेणेकरून मी ते स्कॅन करून तुम्हाला समजावून सांगू शकेन.",
  gu: "કૃપા કરીને તમારા પ્રિસ્ક્રિપ્શનની સ્પષ્ટ છબી અથવા પીડીએફ અપલોડ કરો જેથી હું તેને સ્કેન કરીને તમને સમજાવી શકું.",
  kn: "ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಿಸ್ಕ್ರಿಪ್ಷನ್‌ನ ಸ್ಪಷ್ಟ ಚಿತ್ರ ಅಥವಾ ಪಿಡಿಎಫ್ ಅನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ, ಇದರಿಂದ ನಾನು ಅದನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ನಿಮಗೆ ವಿವರಿಸಬಲ್ಲೆ.",
  ml: "നിങ്ങളുടെ കുറിപ്പടി സ്കാൻ ചെയ്യാനും വിശദീകരിക്കാനും ദയവായി അതിന്റെ വ്യക്തമായ ചിത്രമോ പിഡിഎഫോ അപ്‌ലോഡ് ചെയ്യുക.",
  or: "ଦୟାକରି ଆପଣଙ୍କର ପ୍ରେସକ୍ରିପସନର ଏକ ସ୍ପଷ୍ଟ ଚିତ୍ର କିମ୍ବା PDF ଅପଲୋଡ୍ କରନ୍ତୁ ଯାହା ଦ୍ୱାରା ମୁଁ ଏହାକୁ ସ୍କାନ୍ କରି ଆପଣଙ୍କୁ ବୁଝାଇ ପାରିବି।",
  as: "অনুগ্ৰহ কৰি আপোনাৰ প্ৰেছক্ৰিপশ্বনৰ এখন স্পষ্ট ফটো বা পিডিএফ আপলোড কৰক যাতে মই ইয়াৰ স্কেন কৰি আপোনাক বুজাই দিব পাৰোঁ।",
  ur: "برائے مہربانی اپلوڈ بٹن کا استعمال کرتے ہوئے اپنے نسخے (Prescription) کی واضح تصویر یا پی ڈی ایف اپلوڈ کریں تاکہ میں اسے اسکین کر کے آپ کو سمجھا سکوں۔",
  hinglish: "Please apni prescription ki ek clear photo ya PDF upload karein taaki mai usko scan karke aapko samjha sakoon.",
  tanglish: "Please unga prescription-oda clear photo illa PDF upload pannunga, appo dhan naan adha scan panni ungaluku explain panna mudiyum.",
  tenglish: "Please mee prescription clear photo leda PDF upload cheyandi, appude nenu adhi scan chesi meeku explain cheyagalanu.",
  benglish: "Please tomar prescription-er ekta clear photo ba PDF upload koro, tahole ami scan kore tomake explain korte parbo.",
  manglish: "Daya cheithu ningalude prescription-te clear photo athava PDF upload cheyyuka, ennanale enikku athu scan cheithu ningalkku parayan saadhikkoo."
};

export const MEDICINE_RESPONSES: Record<string, Record<string, MedicineDetail>> = {
  en: {
    metformin: {
      name: "Metformin",
      generic: "Metformin Hydrochloride",
      uses: "Commonly used as a first-line treatment for managing blood glucose levels in Type 2 Diabetes. It works by decreasing glucose production in the liver and increasing insulin sensitivity.",
      sideEffects: "Nausea, diarrhea, abdominal bloating, loss of appetite, metallic taste in the mouth.",
      precautions: "Should be taken with meals to minimize stomach upset. Stay hydrated and avoid heavy alcohol intake.",
      warnings: "Contraindicated in severe renal impairment (kidney disease, eGFR < 30). In rare cases, it can cause Lactic Acidosis."
    },
    paracetamol: {
      name: "Paracetamol (Dolo 650, Crocin)",
      generic: "Acetaminophen",
      uses: "Commonly used to treat mild to moderate pain (headaches, body aches, muscle aches, sore throat) and to reduce fever.",
      sideEffects: "Rare at recommended doses. Skin rash or allergic reaction may occur very rarely.",
      precautions: "Do not exceed the maximum daily limit of 4000 mg (4 grams) to avoid liver toxicity. Keep 4-6 hours gap between doses.",
      warnings: "Excessive doses can cause severe and irreversible liver damage. Do not take with other paracetamol-containing medications."
    }
  },
  hi: {
    metformin: {
      name: "मेटफॉर्मिन (Metformin)",
      generic: "मेटफॉर्मिन हाइड्रोक्लोराइड (Metformin Hydrochloride)",
      uses: "टाइप 2 मधुमेह (Type 2 Diabetes) में ब्लड शुगर के स्तर को नियंत्रित करने के लिए पहली पसंद की दवा है। यह लीवर में ग्लूकोज के निर्माण को कम करती है और शरीर की इंसुलिन संवेदनशीलता को बढ़ाती है।",
      sideEffects: "जी मिचलाना, दस्त, पेट में सूजन, भूख न लगना, मुंह में धातु जैसा स्वाद आना।",
      precautions: "पेट की गड़बड़ी से बचने के लिए इसे हमेशा भोजन के साथ लें। खूब पानी पिएं और शराब से पूरी तरह बचें।",
      warnings: "गंभीर किडनी रोग (किडनी की कार्यक्षमता कम होना, eGFR < 30) में यह दवा नहीं लेनी चाहिए। दुर्लभ मामलों में इससे लैक्टिक एसिडोसिस हो सकता है।"
    },
    paracetamol: {
      name: "पैरासिटामोल (Paracetamol / Dolo 650)",
      generic: "एसिटामिनोफेन (Acetaminophen)",
      uses: "हल्के से मध्यम दर्द (जैसे सिरदर्द, बदन दर्द, मांसपेशियों में दर्द) और बुखार को कम करने के लिए उपयोग किया जाता है।",
      sideEffects: "निर्धारित मात्रा में लेने पर दुष्प्रभाव दुर्लभ हैं। बहुत कम मामलों में त्वचा पर दाने हो सकते हैं।",
      precautions: "लिवर को नुकसान से बचाने के लिए 24 घंटे में 4000 मिलीग्राम (4 ग्राम) से अधिक न लें। दो खुराकों के बीच 4-6 घंटे का अंतर रखें।",
      warnings: "अत्यधिक खुराक से लिवर गंभीर रूप से डैमेज हो सकता है। किसी भी अन्य सर्दी या खाँसी की दवा के साथ इसे लेने से पहले घटक अवश्य जाँचें।"
    }
  },
  bho: {
    metformin: {
      name: "मेटफॉर्मिन (Metformin)",
      generic: "मेटफॉर्मिन हाइड्रोक्लोराइड",
      uses: "टाइप 2 डायबिटीज में खून में चीनी के मात्रा के कंट्रोल करे खातिर दिहल जाला। ई लीवर में ग्लूकोज के कम करेला आ इंसुलिन के संवेदनशीलता बढ़ावेला।",
      sideEffects: "उल्टी जइसन मन होखब, पेट खराब होखब, गैस बनब, भूख ना लागल।",
      precautions: "पेट के तकलीफ से बचे खातिर एकरा के हमेशा खाना खइला के बाद ही लीं। पानी खूब पिएं आ दारू से बचीं।",
      warnings: "किडनी के बीमारी में ई दवाई नुकसानदेह बा। बहुत कम केस में एकरा से लैक्टिक एसिडोसिस हो सकेला।"
    },
    paracetamol: {
      name: "पैरासिटामोल (Paracetamol)",
      generic: "एसिटामिनोफेन",
      uses: "हल्का से मध्यम दरद (जैसे कपार दरद, बदन दरद) आ बुखार उतारे खातिर दिहल जाला।",
      sideEffects: "सही मात्रा में लेला पर कवनो खास साइड इफेक्ट ना होला।",
      precautions: "24 घंटा में 4 ग्राम (4000mg) से बेसी मत लीं। लिवर खराब हो सकेला।",
      warnings: "बेसी दवाई खइला से लिवर पूरी तरह खराब हो सकेला। कवनो दोसर सर्दी के दवाई के साथे बिना पूछे मत खायीं।"
    }
  },
  pa: {
    metformin: {
      name: "ਮੈਟਫੋਰਮਿਨ (Metformin)",
      generic: "ਮੈਟਫੋਰਮਿਨ ਹਾਈਡ੍ਰੋਕਲੋਰਾਈਡ",
      uses: "ਟਾਈਪ 2 ਸ਼ੂਗਰ ਵਿੱਚ ਖੂਨ ਵਿੱਚ ਗਲੂਕੋਜ਼ ਦੇ ਪੱਧਰ ਨੂੰ ਕੰਟਰੋਲ ਕਰਨ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।",
      sideEffects: "ਉਲਟੀ ਆਉਣਾ, ਦਸਤ, ਪੇਟ ਖਰਾਬ ਹੋਣਾ, ਭੁੱਖ ਨਾ ਲੱਗਣਾ।",
      precautions: "ਢਿੱਡ ਦੀ ਖਰਾਬੀ ਤੋਂ ਬਚਣ ਲਈ ਹਮੇਸ਼ਾ ਭੋਜਨ ਦੇ ਨਾਲ ਲਓ। ਸ਼ਰਾਬ ਤੋਂ ਪਰਹੇਜ਼ ਕਰੋ।",
      warnings: "ਗੁਰਦਿਆਂ ਦੀ ਗੰਭੀਰ ਬੀਮਾਰੀ ਵਿੱਚ ਇਹ ਦਵਾਈ ਨਹੀਂ ਲੈਣੀ ਚਾਹੀਦੀ।"
    },
    paracetamol: {
      name: "ਪੈਰਾਸੀਟਾਮੋਲ (Paracetamol)",
      generic: "ਐਸੀਟਾਮਿਨੋਫੇਨ",
      uses: "ਬੁਖਾਰ ਅਤੇ ਹਲਕੇ ਤੋਂ ਦਰਮਿਆਨੇ ਦਰਦ (ਸਿਰ ਦਰਦ, ਸਰੀਰ ਦਰਦ) ਤੋਂ ਰਾਹਤ ਪਾਉਣ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ।",
      sideEffects: "ਸਹੀ ਖੁਰਾਕ ਵਿੱਚ ਕੋਈ ਆਮ ਮਾੜੇ ਪ੍ਰਭਾਵ ਨਹੀਂ ਹੁੰਦੇ।",
      precautions: "24 ਘੰਟਿਆਂ ਵਿੱਚ 4000 ਮਿਲੀਗ੍ਰਾਮ ਤੋਂ ਵੱਧ ਨਾ ਲਓ।",
      warnings: "ਵੱਧ ਖੁਰਾਕ ਲੈਣ ਨਾਲ ਜਿਗਰ (liver) ਨੂੰ ਗੰਭੀਰ ਨੁਕਸਾਨ ਪਹੁੰਚ ਸਕਦਾ ਹੈ।"
    }
  },
  ta: {
    metformin: {
      name: "மெட்ஃபார்மின் (Metformin)",
      generic: "மெட்ஃபார்மின் ஹைட்ரோகுளோரைடு",
      uses: "வகை 2 நீரிழிவு நோயில் இரத்த சர்க்கரை அளவைக் கட்டுப்படுத்தப் பயன்படுகிறது. இது கல்லீரலில் குளுக்கோஸ் உற்பத்தியைக் குறைத்து, இன்சுலின் உணர்திறனை அதிகரிக்கும்.",
      sideEffects: "குமட்டல், வயிற்றுப்போக்கு, வயிற்று உப்புசம், பசியின்மை, வாயில் உலோகச் சுவை.",
      precautions: "வயிற்று உபாதைகளைத் தவிர்க்க எப்போதும் உணவுடன் எடுத்துக் கொள்ளுங்கள். மது அருந்துவதைத் தவிர்க்கவும்.",
      warnings: "கடுமையான சிறுநீரகக் கோளாறு உள்ளவர்கள் இதைத் தவிர்க்க வேண்டும். இது லாக்டிக் அசிடோசிஸை ஏற்படுத்தலாம்."
    },
    paracetamol: {
      name: "பாரசிட்டமால் (Paracetamol)",
      generic: "அசெட்டமினோஃபென்",
      uses: "மிதமான வலி (தலைவலி, உடல் வலி, தசை வலி) மற்றும் காய்ச்சலைக் குறைக்கப் பயன்படுகிறது.",
      sideEffects: "பரிந்துரைக்கப்பட்ட அளவில் பக்கவிளைவுகள் அரிது.",
      precautions: "கல்லீரல் பாதிப்பைத் தவிர்க்க 24 மணிநேரத்தில் 4000 மி.கிக்கு மேல் எடுக்க வேண்டாம். மருந்துகளுக்கு இடையே 4-6 மணிநேர இடைவெளி இருக்க வேண்டும்.",
      warnings: "அதிகப்படியான அளவு கடுமையான கல்லீரல் சேதத்தை ஏற்படுத்தும். பாரசிட்டமால் கொண்ட பிற மருந்துகளுடன் சேர்த்து எடுக்கக் கூடாது."
    }
  },
  te: {
    metformin: {
      name: "మెట్ఫార్మిన్ (Metformin)",
      generic: "మెట్ఫార్మిన్ హైడ్రోక్లోరైడ్",
      uses: "టైప్ 2 మధుమేహంలో రక్తంలో చక్కెర స్థాయిలను నియంత్రించడానికి ప్రాథమికంగా ఉపయోగించబడుతుంది.",
      sideEffects: "వికారం, విరేచనాలు, కడుపు ఉబ్బరం, ఆకలి లేకపోవడం.",
      precautions: "కడుపు నొప్పిని తగ్గించడానికి ఎల్లప్పుడూ భోజనంతో తీసుకోండి. మద్యం తీసుకోకండి.",
      warnings: "తీవ్రమైన మూత్రపిండాల (కిడ్నీ) వ్యాధి ఉన్న రోగులు ఈ మందును వాడకూడదు."
    },
    paracetamol: {
      name: "పారాసిటమాల్ (Paracetamol)",
      generic: "ఎసిటమినోఫెన్",
      uses: "జ్వరం తగ్గించడానికి మరియు తలనొప్పి, ఒళ్లు నొప్పుల వంటి తేలికపాటి నొప్పి నుండి ఉపశమనం కోసం వాడతారు.",
      sideEffects: "తగిన మోతాదులో వాడితే దుష్ప్రభావాలు చాలా అరుదు.",
      precautions: "కాలేయం దెబ్బతినకుండా ఉండటానికి 24 గంటల్లో 4000 మి.గ్రా మించకుండా తీసుకోండి.",
      warnings: "అధిక మోతాదు కాలేయానికి తీవ్రమైన హాని కలిగిస్తుంది."
    }
  },
  bn: {
    metformin: {
      name: "মেটফরমিন (Metformin)",
      generic: "মেটফরমিন হাইড্রোক্লোরাইড",
      uses: "টাইপ ২ ডায়াবেটিসে রক্তে শর্করার মাত্রা নিয়ন্ত্রণ করতে ব্যবহৃত হয়। এটি লিভারে গ্লুকোজ তৈরি কমায়।",
      sideEffects: "বমি বমি ভাব, ডায়রিয়া, পেটে অস্বস্তি, ক্ষুধামন্দা, মুখে ধাতব স্বাদ।",
      precautions: "পেটের সমস্যা এড়াতে সর্বদা খাবারের সাথে গ্রহণ করুন। প্রচুর জল পান করুন।",
      warnings: "গুরুতর কিডনি রোগে আক্রান্ত রোগীদের জন্য এটি নিষিদ্ধ। এর ফলে ল্যাকটিক অ্যাসিডোসিস হতে পারে।"
    },
    paracetamol: {
      name: "প্যারাসিটামল (Paracetamol)",
      generic: "অ্যাসিটামিনোফেন",
      uses: "জ্বর কমাতে এবং হালকা থেকে মাঝারি ব্যথা যেমন মাথা ব্যথা, গা ব্যথা ইত্যাদি উপশমে ব্যবহৃত হয়।",
      sideEffects: "নির্দিষ্ট মাত্রায় পার্শ্বপ্রতিক্রিয়া বিরল।",
      precautions: "লিভারের ক্ষতি এড়াতে ২৪ ঘণ্টায় ৪০০০ মিলিগ্রামের বেশি গ্রহণ করবেন না।",
      warnings: "অতিরিক্ত মাত্রায় খেলে লিভারের মারাত্মক ক্ষতি হতে পারে।"
    }
  },
  mr: {
    metformin: {
      name: "मेटफॉर्मिन (Metformin)",
      generic: "मेटफॉर्मिन हायड्रोक्लोराइड",
      uses: "टाईप २ मधुमेह रुग्णांमध्ये रक्तातील साखरेचे प्रमाण नियंत्रित करण्यासाठी वापरले जाते.",
      sideEffects: "मळमळ, जुलाब, पोट फुगणे, भूक न लागणे.",
      precautions: "पोटाचा त्रास टाळण्यासाठी नेहमी जेवणानंतर किंवा जेवताना घ्या. दारू पिणे टाळा.",
      warnings: "किडनी निकामी असल्यास किंवा तीव्र मूत्रपिंड आजारात हे औषध वापरू नये."
    },
    paracetamol: {
      name: "पॅरासिटामोल (Paracetamol)",
      generic: "एसिटामिनोफेन",
      uses: "ताप कमी करण्यासाठी आणि डोकेदुखी, अंगदुखी यांसारख्या हलक्या वेदना कमी करण्यासाठी वापरले जाते.",
      sideEffects: "शिफारस केलेल्या डोसमध्ये दुष्परिणाम अत्यंत दुर्मिळ आहेत.",
      precautions: "यकृत (liver) सुरक्षित ठेवण्यासाठी २४ तासांत ४००० मिलीग्रामपेक्षा जास्त डोस घेऊ नका.",
      warnings: "अति डोसमुळे यकृताचे गंभीर नुकसान होऊ शकते."
    }
  },
  gu: {
    metformin: {
      name: "મેટફોર્મિન (Metformin)",
      generic: "મેટફોર્મિન હાઇડ્રોક્લોરાઇડ",
      uses: "ટાઇપ ૨ ડાયાબિટીસમાં બ્લડ સુગરને નિયંત્રિત કરવા માટેની મુખ્ય દવા છે.",
      sideEffects: "ઉબકા, ઝાડા, પેટમાં દુખાવો, ભૂખ ન લાગવી.",
      precautions: "પેટની તકલીફો ટાળવા માટે હંમેશા ભોજન સાથે લો. પુષ્કળ પાણી પીવો.",
      warnings: "કિડનીની ગંભીર બીમારીવાળા દર્દીઓએ આ દવા ન લેવી જોઈએ."
    },
    paracetamol: {
      name: "પેરાસીટામોલ (Paracetamol)",
      generic: "એસીટામિનોફેન",
      uses: "તાવ અને સામાન્ય દુખાવો (માથાનો દુખાવો, શરીરનો દુખાવો) મટાડવા માટે વપરાય છે.",
      sideEffects: "યોગ્ય માત્રામાં લેવાથી આડઅસરો બહુ ઓછી થાય છે.",
      precautions: "લીવરને નુકસાનથી બચાવવા માટે ૨૪ કલાકમાં ૪૦૦૦ મિલિગ્રામથી વધુ ન લો.",
      warnings: "વધુ પડતી માત્રા લીવરને ગંભીર નુકસાન પહોંચાડી શકે છે."
    }
  },
  kn: {
    metformin: {
      name: "ಮೆಟ್‌ಫಾರ್ಮಿನ್ (Metformin)",
      generic: "ಮೆಟ್‌ಫಾರ್ಮಿನ್ ಹೈಡ್ರೋಕ್ಲೋರೈಡ್",
      uses: "ಟೈಪ್ 2 ಡಯಾಬಿಟಿಸ್ ರೋಗಿಗಳಲ್ಲಿ ರಕ್ತದ ಗ್ಲುಕೋಸ್ ಮಟ್ಟವನ್ನು ನಿಯಂತ್ರಿಸಲು ಪ್ರಾಥಮಿಕವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.",
      sideEffects: "ವಾಕರಿಕೆ, ಅತಿಸಾರ, ಹೊಟ್ಟೆ ಉಬ್ಬರ, ಹಸಿವಾಗದಿರುವುದು.",
      precautions: "ಹೊಟ್ಟೆಯ ತೊಂದರೆ ತಪ್ಪಿಸಲು ಯಾವಾಗಲೂ ಊಟದ ಜೊತೆಗೆ ತೆಗೆದುಕೊಳ್ಳಿ.",
      warnings: "ಕಿಡ್ನಿ ವೈಫಲ್ಯ ಹೊಂದಿರುವ ರೋಗಿಗಳು ಇದನ್ನು ಬಳಸಬಾರದು."
    },
    paracetamol: {
      name: "ಪ್ಯಾರಸಿಟಮಾಲ್ (Paracetamol)",
      generic: "ಅಸೆಟಮಿನೋಫೆನ್",
      uses: "ಜ್ವರ ಕಡಿಮೆ ಮಾಡಲು ಮತ್ತು ತಲೆನೋವು, ಮೈ ಕೈ ನೋವಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ.",
      sideEffects: "ಶಿಫಾರಸು ಮಾಡಿದ ಪ್ರಮಾಣದಲ್ಲಿ ಅಡ್ಡಪರಿಣಾಮಗಳು ಅಪರೂಪ.",
      precautions: "ಲಿವರ್ ಹಾನಿ ತಪ್ಪಿಸಲು 24 ಗಂಟೆಗಳಲ್ಲಿ 4000 ಮಿಗ್ರಾಂಗಿಂತ ಹೆಚ್ಚು ತೆಗೆದುಕೊಳ್ಳಬೇಡಿ.",
      warnings: "ಹೆಚ್ಚಿನ ಪ್ರಮಾಣ ಯಕೃತ್ತಿಗೆ (liver) ಗಂಭೀರ ಹಾನಿ ಉಂಟುಮಾಡಬಹುದು."
    }
  },
  ml: {
    metformin: {
      name: "മെറ്റ്ഫോർമിൻ (Metformin)",
      generic: "മെറ്റ്ഫോർമിൻ ഹൈഡ്രോക്ലോറൈഡ്",
      uses: "ടൈപ്പ് 2 പ്രമേഹത്തിൽ രക്തത്തിലെ ഗ്ലൂക്കോസ് അളവ് നിയന്ത്രിക്കുന്നതിന് ഉപയോഗിക്കുന്നു.",
      sideEffects: "ഛർദ്ദി, വയറിളക്കം, വയറുവേദന, വിശപ്പില്ലായ്മ.",
      precautions: "വയറ്റിലെ അസ്വസ്ഥതകൾ ഒഴിവാക്കാൻ എപ്പോഴും ഭക്ഷണത്തോടൊപ്പം കഴിക്കുക.",
      warnings: "ഗുരുതരമായ വൃക്കരോഗമുള്ള രോഗികൾ ഇത് ഉപയോഗിക്കാൻ പാടില്ല."
    },
    paracetamol: {
      name: "പാരസിറ്റമോൾ (Paracetamol)",
      generic: "അസെറ്റാമിനോഫെൻ",
      uses: "പനി കുറയ്ക്കുന്നതിനും തലവേദന, ഒരുകൂട്ടം ശരീരവേദനകൾ എന്നിവ പരിഹരിക്കുന്നതിനും ഉപയോഗിക്കുന്നു.",
      sideEffects: "സാധാരണ അളവിൽ പാർശ്വഫലങ്ങൾ വളരെ അപൂർവ്വമാണ്.",
      precautions: "കരൾ രോഗങ്ങൾ തടയാൻ 24 മണിക്കൂറിൽ 4000 മില്ലിഗ്രാമിൽ കൂടുതൽ കഴിക്കരുത്.",
      warnings: "അമിത അളവ് കരളിലെ കോശങ്ങൾക്ക് ഗുരുതരമായ നാശം വരുത്താം."
    }
  },
  or: {
    metformin: {
      name: "ମେଟଫର୍ମିନ (Metformin)",
      generic: "ମେଟଫର୍ମିନ ହାଇଡ୍ରୋକ୍ଲୋରାଇଡ୍",
      uses: "ଟାଇପ୍ ୨ ଡାଇବେଟିସ୍ ରୋଗୀଙ୍କ ରକ୍ତରେ ଶର୍କରା ସ୍ତର ନିୟନ୍ତ୍ରଣ କରିବା ପାଇଁ ବ୍ୟବହୃତ ହୁଏ।",
      sideEffects: "ବାନ୍ତି ଲାଗିବା, ଝାଡ଼ା ହେବା, ପେଟ ଫୁଲିବା, ଭୋକ ନଲାଗିବା।",
      precautions: "ପେଟ ସମସ୍ୟା ଏଡାଇବା ପାଇଁ ସବୁବେଳେ ଖାଇବା ସହିତ ନିଅନ୍ତୁ।",
      warnings: "କିଡନୀ ଜନିତ ଗୁରୁତର ରୋଗୀଙ୍କ ପାଇଁ ଏହା ନିଷେଧ ଅଟେ।"
    },
    paracetamol: {
      name: "ପାରାସିଟାମୋଲ (Paracetamol)",
      generic: "ଏସିଟାମିନୋଫେନ୍",
      uses: "ଜ୍ୱର କମାଇବା ଏବଂ ମୁଣ୍ଡବିନ୍ଧା, ଦେହହାତ ବିନ୍ଧାରୁ ଉପଶମ ପାଇଁ ବ୍ୟବହୃତ ହୁଏ।",
      sideEffects: "ନିର୍ଦ୍ଧାରିତ ମାତ୍ରାରେ ଏହାର ପାର୍ଶ୍ୱ ପ୍ରତିକ୍ରିୟା ପ୍ରାୟ ନଥାଏ।",
      precautions: "ଲିଭର ସୁରକ୍ଷା ପାଇଁ ୨୪ ଘଣ୍ଟାରେ ୪୦୦୦ ମିଗ୍ରାରୁ ଅଧିକ ନିଅନ୍ତୁ ନାହିଁ।",
      warnings: "ଅଧିକ ମାତ୍ରାରେ ଗ୍ରହଣ କଲେ ଲିଭର ନଷ୍ଟ ହୋଇଯାଇପାରେ।"
    }
  },
  as: {
    metformin: {
      name: "মেটফৰ্মিন (Metformin)",
      generic: "মেটফৰ্মিন হাইড্ৰ’ক্লৰাইড",
      uses: "টাইপ ২ ডায়াবেটিছত তেজৰ চেনিৰ মাত্ৰা নিয়ন্ত্ৰণ কৰিবলৈ ব্যৱহাৰ কৰা হয়।",
      sideEffects: "বমি ভাৱ, ডায়েৰীয়া, পেট উখহি পৰা, ভোক নলগা।",
      precautions: "পেটৰ সমস্যা এৰাবলৈ সদায় আহাৰৰ সৈতে ঔষধ ল’ব।",
      warnings: "বৃক্কৰ গুৰুতৰ বিকাৰ থকা ৰোগীয়ে এই ঔষধ ব্যৱহাৰ কৰিব নালাগে।"
    },
    paracetamol: {
      name: "পেৰাচিটামল (Paracetamol)",
      generic: "এচিটামিনোফেন",
      uses: "জ্বৰ আৰু সামান্য বিষ (মূৰৰ বিষ, গাৰ বিষ) উপশমৰ বাবে ব্যৱহাৰ কৰা হয়।",
      sideEffects: "উপযুক্ত মাত্ৰাত ব্যৱহাৰ কৰিলে কোনো পাৰ্শ্বক্ৰিয়া দেখা নাযায়।",
      precautions: "লিভাৰৰ ক্ষতি নহ’বলৈ ২৪ ঘণ্টাত ৪০০০ মিলি গ্ৰামতকৈ অধিক পৰিমাণে নল’ব।",
      warnings: "অতিপাত মাত্ৰাত ল’লে লিভাৰ সম্পূৰ্ণৰূপে নষ্ট হ’ব পাৰে।"
    }
  },
  ur: {
    metformin: {
      name: "میٹفارمین (Metformin)",
      generic: "میٹفارمین ہائیڈروکلورائیڈ",
      uses: "ٹائپ 2 ذیابیطس میں خون میں شکر کی سطح کو قابو کرنے کے لیے استعمال ہوتی ہے۔",
      sideEffects: "متلی، دست، پیٹ کا پھولنا، بھوک کا نہ لگنا، منہ کا ذائقہ دھاتی ہونا۔",
      precautions: "معدے کی خرابی سے بچنے کے لیے ہمیشہ کھانے کے ساتھ لیں۔ کثرت سے پانی پیئیں۔",
      warnings: "گردوں کے شدید مرض میں یہ دوا ممنوع ہے۔ یہ شاذ و نادر صورتوں میں لیٹک ایسڈوسس کا سبب بن سکتی ہے۔"
    },
    paracetamol: {
      name: "پیراسیٹامول (Paracetamol)",
      generic: "ایسیٹامینوفین",
      uses: "بخار اتارنے اور ہلکے سے درمیانے درجے کے درد (جیسے سر درد، جسم درد) کے لیے استعمال ہوتی ہے۔",
      sideEffects: "تجویز کردہ مقدار میں مضر اثرات انتہائی نایاب ہیں۔",
      precautions: "جگر کو نقصان سے بچانے کے لیے 24 گھنٹے میں 4000 ملی گرام سے زیادہ نہ لیں۔",
      warnings: "زیادہ مقدار سے جگر شدید متاثر ہو سکتا ہے۔ کسی دوسری دوا کے ساتھ ملا کر لینے سے پہلے اجزاء دیکھ لیں۔"
    }
  }
};

// Map code-mixed languages to their equivalent translations
MEDICINE_RESPONSES.hinglish = MEDICINE_RESPONSES.en;
MEDICINE_RESPONSES.tanglish = MEDICINE_RESPONSES.en;
MEDICINE_RESPONSES.tenglish = MEDICINE_RESPONSES.en;
MEDICINE_RESPONSES.benglish = MEDICINE_RESPONSES.en;
MEDICINE_RESPONSES.manglish = MEDICINE_RESPONSES.en;

export const SYMPTOM_RESPONSES: Record<string, Record<string, SymptomDetail>> = {
  en: {
    headache: {
      name: "Headache",
      causes: "Tension, dehydration, poor sleep, eye strain, migraine, or high blood pressure.",
      recommendations: "Drink plenty of water, rest in a quiet dark room, and limit screen time. Consider simple pain relief if suitable, but monitor closely.",
      questions: [
        "How long have you had this headache, and is it a sharp or throbbing pain?",
        "Is the pain on one side or all over your head?",
        "Are you experiencing any other symptoms, like fever, stiff neck, or vomiting?"
      ]
    },
    fever: {
      name: "Fever",
      causes: "Viral infection, bacterial infection, flu, or mosquito-borne illnesses like dengue or malaria.",
      recommendations: "Get plenty of rest, stay well-hydrated with water and oral rehydration solutions, and check your temperature regularly. You can use paracetamol for fever reduction, but do not self-start antibiotics.",
      questions: [
        "What is your current body temperature, and how many days has the fever lasted?",
        "Do you have other symptoms like a cough, cold, chills, body aches, or a skin rash?",
        "Have you taken any fever medicines, and did your temperature go down after taking them?"
      ]
    },
    abdominal_pain: {
      name: "Abdominal Pain",
      causes: "Acidity (gastritis), gas bloating, indigestion, food poisoning, muscle strain, or appendicitis.",
      recommendations: "Avoid heavy, oily, or spicy foods. Sip warm water. Avoid taking pain relievers like NSAIDs (Ibuprofen, Diclofenac) on an empty stomach, as they can cause stomach inflammation (Gastritis).",
      questions: [
        "Where exactly is the pain located (e.g., upper, lower, left, or right side of your stomach)?",
        "Is it a constant dull ache or sudden sharp cramps?",
        "Are you having any vomiting, diarrhea, bloating, or fever?"
      ]
    }
  },
  hi: {
    headache: {
      name: "सिर दर्द (Headache)",
      causes: "मानसिक तनाव, पानी की कमी (dehydration), अपर्याप्त नींद, आँखों का खिंचाव, माइग्रेन, या उच्च रक्तचाप (Hypertension)।",
      recommendations: "खूब पानी पिएं, एक शांत और अंधेरे कमरे में आराम करें, और मोबाइल/टीवी स्क्रीन से दूर रहें। यदि सिरदर्द गंभीर है या बार-बार होता है, तो डॉक्टर से सलाह लें।",
      questions: [
        "आपको यह सिरदर्द कब से है, और दर्द हल्का है या बहुत तेज़?",
        "क्या यह दर्द सिर के केवल एक हिस्से में है या पूरे सिर में?",
        "क्या इसके साथ कोई और लक्षण हैं जैसे बुखार, गर्दन में अकड़न, या जी मिचलाना?"
      ]
    },
    fever: {
      name: "बुखार (Fever)",
      causes: "वायरल संक्रमण, बैक्टीरिया का संक्रमण, फ्लू, या डेंगू, मलेरिया, टाइफाइड जैसी बीमारियां।",
      recommendations: "आराम करें, खूब सारे तरल पदार्थ (पानी, नारियल पानी, सूप) पिएं और शरीर के तापमान को चार्ट करें। बुखार कम करने के लिए पैरासिटामोल ले सकते हैं, लेकिन भारी एंटीबायोटिक्स खुद से न लें।",
      questions: [
        "अभी आपका तापमान कितना है और बुखार कितने दिनों से आ रहा है?",
        "क्या आपको खांसी, जुकाम, कंपकंपी (चिल्स), बदन दर्द या शरीर पर कोई दाने हैं?",
        "क्या आपने बुखार के लिए कोई दवा ली है और दवा लेने के बाद क्या बुखार कम हुआ?"
      ]
    },
    abdominal_pain: {
      name: "पेट दर्द (Abdominal Pain)",
      causes: "गैस, अपच, पेट की सूजन (gastritis), फूड पॉइजनिंग, मांसपेशियों में खिंचाव या अपेंडिसाइटिस।",
      recommendations: "हल्का और सुपाच्य भोजन लें। गुनगुना पानी घूंट-घूंट करके पिएं। खाली पेट दर्द निवारक दवाएं (जैसे आईबुप्रोफेन) न लें, क्योंकि इससे पेट में एसिडिटी और जलन (gastritis) बढ़ सकती है।",
      questions: [
        "दर्द पेट में ठीक किस जगह पर हो रहा है (जैसे ऊपरी हिस्से में, निचले हिस्से में, या दाईं/बाईं तरफ)?",
        "क्या यह दर्द लगातार हो रहा है या रुक-रुक कर मरोड़ उठ रही है?",
        "क्या आपको उल्टी, दस्त, गैस बनना, या बुखार भी है?"
      ]
    }
  },
  bho: {
    headache: {
      name: "कपार दरद",
      causes: "तनाव, पानी के कमी, कम सुतल, आँख के थकावट या माइग्रेन।",
      recommendations: "खूब पानी पीं, शांत आ अन्हार कमरा में आराम करीं, मोबाइल-टीवी मत देखीं।",
      questions: [
        "ई कपार दरद कब से बा आ कतना तेज बा?",
        "दरद आधा कपार में बा कि पूरा माथा में होखता?",
        "एकर साथे बुखार, गर्दनी में अकड़न या उल्टी जइसन लागत बा?"
      ]
    },
    fever: {
      name: "बुखार",
      causes: "वायरल या बैक्टीरिया के इन्फेक्शन, मलेरिया, डेंगू चाहे टाइफाइड।",
      recommendations: "आराम करीं, खूब पानी आ नारियल पानी पीं। बुखार उतारे खातिर पैरासिटामोल लेईं, अपने से एंटीबायोटिक मत खायीं।",
      questions: [
        "तनी बुखार नाप के बताईं कतना बा आ केतना दिन से बुखार बा?",
        "खंसी-जुकाम, देह दरद या कंपकंपी भी लागत बा का?",
        "बुखार खातिर कवनो दवाई खइनी ह आ ओकरा बाद बुखार उतराइल?"
      ]
    },
    abdominal_pain: {
      name: "पेट में दरद",
      causes: "गैस, अपच, फूड प्वाइजनिंग, भारी खाना खइला से चाहे अपेंडिक्स।",
      recommendations: "सादा खिचड़ी खाईं, गुनगुना पानी पीं। खाली पेट दरद के दवाई मत खायीं, पेट में जलन बढ़ जाई।",
      questions: [
        "दरद पेटवा में कहाँ होखता (ऊपर, नीचे, दहिने या बाएँ)?",
        "दरद लगातार होखता कि मरोड़ मार के आवत-जात बा?",
        "उल्टी, दस्त, पेट फूलल या बुखार भी बा का?"
      ]
    }
  },
  ta: {
    headache: {
      name: "தலைவலி (Headache)",
      causes: "மன அழுத்தம், நீர்ச்சத்து குறைபாடு, தூக்கமின்மை, கண் சோர்வு, ஒற்றைத் தலைவலி (migraine) அல்லது உயர் இரத்த அழுத்தம் (Hypertension).",
      recommendations: "அதிகமாக தண்ணீர் குடிக்கவும், அமைதியான இருண்ட அறையில் ஓய்வெடுக்கவும், திரைகளைப் பார்ப்பதைத் தவிர்க்கவும். வலி தொடர்ந்தால் மருத்துவரை அணுகவும்.",
      questions: [
        "உங்களுக்கு இந்த தலைவலி எவ்வளவு காலமாக உள்ளது மற்றும் வலி எவ்வளவு தீவிரமாக உள்ளது?",
        "வலி தலை முழுவதும் உள்ளதா அல்லது ஒரு பக்கத்தில் மட்டும் உள்ளதா?",
        "காய்ச்சல், கழுத்து வலி அல்லது வாந்தி போன்ற பிற அறிகுறிகள் ஏதேனும் உள்ளதா?"
      ]
    },
    fever: {
      name: "காய்ச்சல் (Fever)",
      causes: "வைரஸ் தொற்று, பாக்டீரியா தொற்று, காய்ச்சல், டெங்கு, மலேரியா அல்லது டைபாய்டு.",
      recommendations: "ஓய்வெடுக்கவும், தண்ணீர், இளநீர் அல்லது சூப் போன்ற திரவங்களை அதிகம் குடிக்கவும். காய்ச்சலைக் குறைக்க பாரசிட்டமால் பயன்படுத்தலாம், மருத்துவர் பரிந்துரைக்காமல் ஆன்டிபயாடிக்குகளை எடுக்க வேண்டாம்.",
      questions: [
        "தற்போதைய உடல் வெப்பநிலை எவ்வளவு மற்றும் காய்ச்சல் எத்தனை நாட்களாக இருக்கிறது?",
        "இருமல், சளி, குளிர்காய்ச்சல், உடல் வலி அல்லது தடிப்புகள் ஏதேனும் உள்ளதா?",
        "ஏதேனும் காய்ச்சல் மருந்து சாப்பிட்டீர்களா, அதன் பிறகு காய்ச்சல் குறைந்ததா?"
      ]
    },
    abdominal_pain: {
      name: "வயிற்று வலி (Abdominal Pain)",
      causes: "வாயு தொல்லை, அஜீரணம், இரைப்பை அழற்சி (gastritis), உணவு நச்சுத்தன்மை அல்லது குடல்வாலழற்சி (appendicitis).",
      recommendations: "காரமான அல்லது எண்ணெய் உணவுகளைத் தவிர்க்கவும். வெதுவெதுப்பான நீரை பருகவும். மருத்துவரின் ஆலோசனையின்றி வலி நிவாரணிகளை வெறும் வயிற்றில் எடுக்க வேண்டாம்.",
      questions: [
        "வலி சரியாக வயிற்றில் எங்கு இருக்கிறது (மேல் வயிறு, கீழ் வயிறு, வலது அல்லது இடது பக்கம்)?",
        "வலி தொடர்ந்து இருக்கிறதா அல்லது விட்டு விட்டு வருகிறதா?",
        "வாந்தி, வயிற்றுப்போக்கு, வயிறு உப்பசம் அல்லது காய்ச்சல் ஏதேனும் உள்ளதா?"
      ]
    }
  },
  te: {
    headache: {
      name: "తలనొప్పి (Headache)",
      causes: "ఒత్తిడి, నిర్జలీకరణం (dehydration), నిద్రలేమి, కంటి ఒత్తిడి, మైగ్రేన్ లేదా అధిక రక్తపోటు (Hypertension).",
      recommendations: "చాలా నీరు త్రాగండి, నిశ్శబ్దంగా మరియు చీకటిగా ఉన్న గదిలో విశ్రాంతి తీసుకోండి మరియు స్క్రీన్ సమయాన్ని పరిమิตం చేయండి.",
      questions: [
        "ఈ తలనొప్పి ఎంతకాలంగా ఉంది మరియు నొప్పి తీవ్రంగా ఉందా?",
        "నొప్పి తల మొత్తంగా ఉందా లేక ఒక వైపున మాత్రమే ఉందా?",
        "జ్వరం, మెడ బిగుతుగా ఉండటం లేదా వాంతులు వంటి ఇతర లక్షణాలు ఏవైనా ఉన్నాయా?"
      ]
    },
    fever: {
      name: "జ్వరం (Fever)",
      causes: "వైరల్ ఇన్ఫెక్షన్, బాక్టీరియల్ ఇన్ఫెక్షన్, డెంగ్యూ, మలేరియా లేదా టైఫాయిడ్.",
      recommendations: "బాగా విశ్రాంతి తీసుకోండి, నీరు, కొబ్బరి నీరు లేదా సూప్స్ వంటి ద్రవపదార్థాలు పుష్కలంగా తీసుకోండి. జ్వరం తగ్గడానికి పారాసిటమాల్ వాడవచ్చు, వైద్యుల సలహా లేకుండా యాంటీబయాటిక్స్ వాడవద్దు.",
      questions: [
        "మీ ప్రస్తుత శరీర ఉష్ణోగ్రత ఎంత మరియు జ్వరం ఎన్ని రోజులుగా ఉంది?",
        "దగ్గు, జలుబు, వణుకు, ఒళ్లు నొప్పులు లేదా చర్మంపై దద్దుర్లు ఉన్నాయా?",
        "జ్వరం తగ్గడానికి ఏవైనా మందులు వేసుకున్నారా మరియు వేసుకున్న తర్వాత జ్వరం తగ్గిందా?"
      ]
    },
    abdominal_pain: {
      name: "కడుపు నొప్పి (Abdominal Pain)",
      causes: "యాసిడిటీ (gastritis), గ్యాస్, అజీర్ణం, ఫుడ్ పాయిజనింగ్, కండరాల నొప్పులు లేదా అపెండిసైటిస్.",
      recommendations: "మసాలా మరియు జిడ్డుగల ఆహారాన్ని నివారించండి. గోరువెచ్చని నీటిని త్రాగండి. వైద్యుల సలహా లేకుండా ఖాళీ కడుపుతో పెయిన్ కిల్లర్స్ వేసుకోవద్దు.",
      questions: [
        "నొప్పి సరిగ్గా పొత్తికడుపులో ఎక్కడ ఉంది (పై భాగం, కింది భాగం, కుడి లేక ఎడమ వైపు)?",
        "నొప్పి నిరంతరంగా ఉందా లేదా అప్పుడప్పుడు వస్తూ పోతుందా?",
        "వాంతులు, విరేచనాలు, కడుపు ఉబ్బరం లేదా జ్వరం ఏవైనా ఉన్నాయా?"
      ]
    }
  },
  bn: {
    headache: {
      name: "মাথা ব্যথা",
      causes: "মানসিক চাপ, শরীরে জলের অভাব, ঘুমের অভাব, চোখের ক্লান্তি, মাইগ্রেন বা উচ্চ রক্তচাপ।",
      recommendations: "প্রচুর জল পান করুন, একটি শান্ত ও অন্ধকার ঘরে বিশ্রাম নিন এবং স্ক্রিন টাইম কমান। ব্যথা না কমলে ডাক্তারের পরামর্শ নিন।",
      questions: [
        "আপনার এই মাথা ব্যথা কতদিন ধরে আছে এবং ব্যথা কতটা তীব্র?",
        "ব্যথা কি মাথার একপাশে নাকি পুরো মাথায়?",
        "এর সাথে কি জ্বর, ঘাড় শক্ত হওয়া বা বমি বমি ভাবের মতো কোনো লক্ষণ আছে?"
      ]
    },
    fever: {
      name: "জ্বর (Fever)",
      causes: "ভাইরাস বা ব্যাকটেরিয়ার সংক্রমণ, ফ্লু, ডেঙ্গু, ম্যালেরিয়া বা টাইফয়েড।",
      recommendations: "পর্যাপ্ত বিশ্রাম নিন, জল, ডাবের জল বা স্যুপের মতো তরল খাবার বেশি করে খান। জ্বর কমানোর জন্য প্যারাসিটামল ব্যবহার করতে পারেন কিন্তু চিকিৎসকের পরামর্শ ছাড়া অ্যান্টিবায়োটিক খাবেন না।",
      questions: [
        "আপনার শরীরের বর্তমান তাপমাত্রা কত এবং জ্বর কতদিন ধরে রয়েছে?",
        "জ্বরের সাথে কি কাশি, সর্দি, কাঁপুনি, গা ব্যথা বা শরীরে কোনো ফুসকুড়ি দেখা যাচ্ছে?",
        "আপনি কি জ্বরের কোনো ওষুধ খেয়েছেন এবং খাওয়ার পর কি জ্বর কমেছে?"
      ]
    },
    abdominal_pain: {
      name: "পেট ব্যথা (Abdominal Pain)",
      causes: "গ্যাস, অম্বল (gastritis), বদহজম, ফুড পয়জনিং বা অ্যাপেনডিসাইটিস।",
      recommendations: "অতিরিক্ত মশলাদার বা তৈলাক্ত খাবার এড়িয়ে চলুন। হালকা গরম জল অল্প অল্প করে পান করুন। খালি পেটে কোনো ব্যথানাশক ওষুধ খাবেন না, এতে গ্যাস্ট্রিকের সমস্যা বাড়তে পারে।",
      questions: [
        "ব্যথাটি পেটের ঠিক কোন জায়গায় হচ্ছে (যেমন উপরের দিকে, নিচের দিকে, ডান বা বাম পাশে)?",
        "ব্যথাটি কি অনবরত হচ্ছে নাকি মাঝেমধ্যে মোচড় দিয়ে উঠছে?",
        "আপনার কি বমি, ডায়রিয়া, পেট ফাপা বা জ্বর আছে?"
      ]
    }
  }
};

// Fill in other regional languages to fallback or inherit from Hindi/English appropriately to prevent crashes
const otherLangs = ['pa', 'mr', 'gu', 'kn', 'ml', 'or', 'as', 'ur', 'hinglish', 'tanglish', 'tenglish', 'benglish', 'manglish'];
otherLangs.forEach(lang => {
  if (!SYMPTOM_RESPONSES[lang]) {
    SYMPTOM_RESPONSES[lang] = SYMPTOM_RESPONSES.en; 
  }
});

export interface ClinicalLabels {
  causes: string;
  recommendations: string;
  clarify: string;
  uses: string;
  sideEffects: string;
  precautions: string;
  warnings: string;
}

export const CLINICAL_LABELS: Record<string, ClinicalLabels> = {
  en: {
    causes: "Causes",
    recommendations: "Recommendations",
    clarify: "Please clarify:",
    uses: "Uses",
    sideEffects: "Side Effects",
    precautions: "Precautions",
    warnings: "Warnings"
  },
  hi: {
    causes: "कारण (Causes)",
    recommendations: "सलाह (Recommendations)",
    clarify: "कृपया स्पष्ट करें:",
    uses: "उपयोग (Uses)",
    sideEffects: "साइड इफेक्ट्स (Side Effects)",
    precautions: "सावधानियां (Precautions)",
    warnings: "चेतावनी (Warnings)"
  },
  bho: {
    causes: "कारण (Causes)",
    recommendations: "सलाह (Recommendations)",
    clarify: "कृपया साफ-साफ बताईं:",
    uses: "उपयोग (Uses)",
    sideEffects: "साइड इफेक्ट्स (Side Effects)",
    precautions: "सावधानी (Precautions)",
    warnings: "चेतावनी (Warnings)"
  },
  bn: {
    causes: "কারণ (Causes)",
    recommendations: "পরামর্শ (Recommendations)",
    clarify: "দয়া করে স্পষ্ট করুন:",
    uses: "ব্যবহার (Uses)",
    sideEffects: "পার্শ্বপ্রতিক্রিয়া (Side Effects)",
    precautions: "সতর্কতা (Precautions)",
    warnings: "সতর্কবার্তা (Warnings)"
  },
  ta: {
    causes: "காரணங்கள் (Causes)",
    recommendations: "பரிந்துரைகள் (Recommendations)",
    clarify: "தயவுசெய்து தெளிவுபடுத்தவும்:",
    uses: "பயன்பாடுகள் (Uses)",
    sideEffects: "பக்க விளைவுகள் (Side Effects)",
    precautions: "முன்னெச்சரிக்கைகள் (Precautions)",
    warnings: "எச்சரிக்கைகள் (Warnings)"
  },
  te: {
    causes: "కారణాలు (Causes)",
    recommendations: "సిఫార్సులు (Recommendations)",
    clarify: "దయచేసి స్పష్టం చేయండి:",
    uses: "ఉపయోగాలు (Uses)",
    sideEffects: "దుష్ప్రభావాలు (Side Effects)",
    precautions: "జాగ్రత్తలు (Precautions)",
    warnings: "హెచ్చరికలు (Warnings)"
  },
  mr: {
    causes: "कारणे (Causes)",
    recommendations: "सल्ला (Recommendations)",
    clarify: "कृपया स्पष्ट करा:",
    uses: "वापर (Uses)",
    sideEffects: "दुष्परिणाम (Side Effects)",
    precautions: "खबरदारी (Precautions)",
    warnings: "इशारा (Warnings)"
  },
  pa: {
    causes: "ਕਾਰਨ (Causes)",
    recommendations: "ਸਲਾਹ (Recommendations)",
    clarify: "ਕਿਰਪਾ ਕਰਕੇ ਸਪੱਸ਼ਟ ਕਰੋ:",
    uses: "ਵਰਤੋਂ (Uses)",
    sideEffects: "ਮਾੜੇ ਪ੍ਰਭਾਵ (Side Effects)",
    precautions: "ਸਾਵਧਾਨੀਆਂ (Precautions)",
    warnings: "ਚੇਤਾਵਨੀ (Warnings)"
  },
  gu: {
    causes: "કારણો (Causes)",
    recommendations: "ભલામણો (Recommendations)",
    clarify: "કૃપા કરીને સ્પષ્ટ કરો:",
    uses: "ઉપયોગો (Uses)",
    sideEffects: "આડઅસરો (Side Effects)",
    precautions: "સાવચેતીઓ (Precautions)",
    warnings: "ચેતવણીઓ (Warnings)"
  },
  kn: {
    causes: "ಕಾರಣಗಳು (Causes)",
    recommendations: "ಶಿಫಾರಸುಗಳು (Recommendations)",
    clarify: "ದಯವಿಟ್ಟು ಸ್ಪಷ್ಟಪಡಿಸಿ:",
    uses: "ಉಪಯೋಗಗಳು (Uses)",
    sideEffects: "ಅಡ್ಡ ಪರಿಣಾಮಗಳು (Side Effects)",
    precautions: "ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು (Precautions)",
    warnings: "ಎಚ್ಚರಿಕೆಗಳು (Warnings)"
  },
  ml: {
    causes: "കാരണങ്ങൾ (Causes)",
    recommendations: "ശുപാർശകൾ (Recommendations)",
    clarify: "ദയവായി വ്യക്തമാക്കുക:",
    uses: "ഉപയോഗങ്ങൾ (Uses)",
    sideEffects: "പാർശ്വഫലങ്ങൾ (Side Effects)",
    precautions: "മുൻകരുതലുകൾ (Precautions)",
    warnings: "മുന്നറിയിപ്പുകൾ (Warnings)"
  },
  or: {
    causes: "କାରଣ (Causes)",
    recommendations: "ପରାମର୍ଶ (Recommendations)",
    clarify: "ଦୟାକରି ସ୍ପଷ୍ଟ କରନ୍ତୁ:",
    uses: "ବ୍ୟବହାର (Uses)",
    sideEffects: "ପାର୍ଶ୍ୱ ପ୍ରତିକ୍ରିୟା (Side Effects)",
    precautions: "ସତର୍କତା (Precautions)",
    warnings: "ଚେତାବନୀ (Warnings)"
  },
  as: {
    causes: "কাৰণ (Causes)",
    recommendations: "পৰামৰ্শ (Recommendations)",
    clarify: "অনুগ্ৰহ কৰি স্পষ্ট কৰক:",
    uses: "ব্যৱহাৰ (Uses)",
    sideEffects: "পাৰ্শ্বক্ৰিয়া (Side Effects)",
    precautions: "সাৱধানতা (Precautions)",
    warnings: "সতৰ্কবাৰ্তা (Warnings)"
  },
  ur: {
    causes: "وجوہات (Causes)",
    recommendations: "تجاویز (Recommendations)",
    clarify: "براہ کرم واضح کریں:",
    uses: "استعمالات (Uses)",
    sideEffects: "مضر اثرات (Side Effects)",
    precautions: "احتیاطی تدابیر (Precautions)",
    warnings: "انتباہ (Warnings)"
  },
  hinglish: {
    causes: "Karan (Causes)",
    recommendations: "Salah (Recommendations)",
    clarify: "Please clearly batayein:",
    uses: "Upyog (Uses)",
    sideEffects: "Side Effects",
    precautions: "Savdhaniyan (Precautions)",
    warnings: "Chetavani (Warnings)"
  },
  tanglish: {
    causes: "Karanangal (Causes)",
    recommendations: "Recommendations",
    clarify: "Please clarify pannunga:",
    uses: "Uses",
    sideEffects: "Side Effects",
    precautions: "Precautions",
    warnings: "Warnings"
  },
  tenglish: {
    causes: "Karanalu (Causes)",
    recommendations: "Recommendations",
    clarify: "Please clarify cheyandi:",
    uses: "Uses",
    sideEffects: "Side Effects",
    precautions: "Precautions",
    warnings: "Warnings"
  },
  benglish: {
    causes: "Karon (Causes)",
    recommendations: "Recommendations",
    clarify: "Doya kore clearly bolun:",
    uses: "Uses",
    sideEffects: "Side Effects",
    precautions: "Precautions",
    warnings: "Warnings"
  },
  manglish: {
    causes: "Karanangal (Causes)",
    recommendations: "Recommendations",
    clarify: "Daya cheithu clarify cheyyuka:",
    uses: "Uses",
    sideEffects: "Side Effects",
    precautions: "Precautions",
    warnings: "Warnings"
  }
};

