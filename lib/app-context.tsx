"use client"

/**
 * App-wide context for SamadhanSetu.
 * Handles two concerns that many components read from:
 *   1. Language selection (English / हिंदी / Regional) with a small i18n dictionary.
 *   2. Accessibility preferences (text zoom + audio read-aloud toggle).
 *
 * Teammates: to wire real translations, extend the `translations` dictionary
 * or swap it for an API/CMS-driven source. The read-aloud feature uses the
 * browser's built-in Web Speech API (SpeechSynthesis) — no external service.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

export type Language = "en" | "hi" | "regional"

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  hi: "हिंदी",
  regional: "मराठी",
}

// Minimal translation dictionary. Keys are shared across the app.
const translations: Record<Language, Record<string, string>> = {
  en: {
    "gov.ministry": "Ministry of Social Justice & Empowerment",
    "gov.govOfIndia": "Government of India",
    "brand.tagline": "Empowering Marginalized Entrepreneurs via AI",
    "a11y.title": "Accessibility",
    "a11y.textSize": "Text size",
    "a11y.decrease": "Decrease text size",
    "a11y.increase": "Increase text size",
    "a11y.reset": "Reset text size",
    "a11y.readAloud": "Read aloud",
    "a11y.readAloudOn": "Read-aloud is on",
    "a11y.readAloudOff": "Read-aloud is off",
    "hero.eyebrow": "AI-Driven Scheme Matching",
    "hero.title": "Find the right government scheme for your enterprise",
    "hero.subtitle":
      "Answer a few simple questions — in your language or by voice — and let AI match you with credit and welfare schemes you qualify for.",
    "hero.cta": "Apni Yojna Janein / Check Eligibility",
    "hero.inputPlaceholder": "Type your question, e.g. 'loan for a tailoring shop'",
    "hero.mic": "Speak your question",
    "hero.listening": "Listening… speak now",
    "hero.startAssessment": "Start Eligibility Assessment",
    "form.title": "Eligibility Assessment",
    "form.subtitle": "Three quick steps. Your information is used only to match schemes.",
    "form.step": "Step",
    "form.of": "of",
    "form.back": "Back",
    "form.next": "Next",
    "form.seeResults": "See Matched Schemes",
    "form.step1": "Identity & Category",
    "form.step2": "Enterprise Details",
    "form.step3": "Location",
    "form.category": "Social category",
    "form.name": "Full name",
    "form.namePlaceholder": "Enter your name",
    "form.gender": "Gender",
    "form.enterpriseType": "Type of enterprise",
    "form.loanAmount": "Desired loan amount (₹)",
    "form.state": "State",
    "form.district": "District",
    "form.districtPlaceholder": "Enter your district",
    "form.area": "Area type",
    "form.urban": "Urban",
    "form.rural": "Rural",
    "results.title": "Your AI-Matched Schemes",
    "results.subtitle": "Ranked by how well each scheme fits your profile.",
    "results.count": "schemes matched",
    "results.match": "Match",
    "results.subsidy": "Subsidy",
    "results.maxLoan": "Max loan",
    "results.collateral": "Collateral",
    "results.viewDocs": "View Required Documents",
    "results.apply": "Apply on Official Portal",
    "results.listen": "Listen Scheme Summary",
    "results.restart": "Start over",
    "docs.title": "Required Documents",
    "docs.subtitle": "Keep these ready before you apply.",
    "docs.ready": "Ready",
    "docs.pending": "Pending",
    "docs.close": "Close",
    "gender.female": "Woman",
    "gender.male": "Man",
    "gender.transgender": "Transgender",
    "gender.other": "Prefer not to say",
  },
  hi: {
    "gov.ministry": "सामाजिक न्याय एवं अधिकारिता मंत्रालय",
    "gov.govOfIndia": "भारत सरकार",
    "brand.tagline": "एआई द्वारा वंचित उद्यमियों का सशक्तिकरण",
    "a11y.title": "सुगम्यता",
    "a11y.textSize": "पाठ का आकार",
    "a11y.decrease": "पाठ का आकार घटाएँ",
    "a11y.increase": "पाठ का आकार बढ़ाएँ",
    "a11y.reset": "पाठ का आकार रीसेट करें",
    "a11y.readAloud": "पढ़कर सुनाएँ",
    "a11y.readAloudOn": "पढ़कर सुनाना चालू है",
    "a11y.readAloudOff": "पढ़कर सुनाना बंद है",
    "hero.eyebrow": "एआई-आधारित योजना मिलान",
    "hero.title": "अपने उद्यम के लिए सही सरकारी योजना खोजें",
    "hero.subtitle":
      "कुछ आसान सवालों के जवाब दें — अपनी भाषा में या बोलकर — और एआई को आपके लिए उपयुक्त ऋण व कल्याण योजनाएँ खोजने दें।",
    "hero.cta": "अपनी योजना जानें / पात्रता जाँचें",
    "hero.inputPlaceholder": "अपना सवाल लिखें, जैसे 'सिलाई की दुकान के लिए ऋण'",
    "hero.mic": "अपना सवाल बोलें",
    "hero.listening": "सुन रहे हैं… अब बोलें",
    "hero.startAssessment": "पात्रता आकलन शुरू करें",
    "form.title": "पात्रता आकलन",
    "form.subtitle": "तीन आसान चरण। आपकी जानकारी केवल योजना मिलान के लिए उपयोग होती है।",
    "form.step": "चरण",
    "form.of": "में से",
    "form.back": "पीछे",
    "form.next": "आगे",
    "form.seeResults": "मिलान की गई योजनाएँ देखें",
    "form.step1": "पहचान एवं श्रेणी",
    "form.step2": "उद्यम विवरण",
    "form.step3": "स्थान",
    "form.category": "सामाजिक श्रेणी",
    "form.name": "पूरा नाम",
    "form.namePlaceholder": "अपना नाम दर्ज करें",
    "form.gender": "लिंग",
    "form.enterpriseType": "उद्यम का प्रकार",
    "form.loanAmount": "वांछित ऋण राशि (₹)",
    "form.state": "राज्य",
    "form.district": "ज़िला",
    "form.districtPlaceholder": "अपना ज़िला दर्ज करें",
    "form.area": "क्षेत्र का प्रकार",
    "form.urban": "शहरी",
    "form.rural": "ग्रामीण",
    "results.title": "आपकी एआई-मिलान योजनाएँ",
    "results.subtitle": "आपकी प्रोफ़ाइल के अनुसार क्रमबद्ध।",
    "results.count": "योजनाएँ मिलीं",
    "results.match": "मिलान",
    "results.subsidy": "सब्सिडी",
    "results.maxLoan": "अधिकतम ऋण",
    "results.collateral": "गारंटी",
    "results.viewDocs": "आवश्यक दस्तावेज़ देखें",
    "results.apply": "आधिकारिक पोर्टल पर आवेदन करें",
    "results.listen": "योजना सारांश सुनें",
    "results.restart": "फिर से शुरू करें",
    "docs.title": "आवश्यक दस्तावेज़",
    "docs.subtitle": "आवेदन से पहले इन्हें तैयार रखें।",
    "docs.ready": "तैयार",
    "docs.pending": "लंबित",
    "docs.close": "बंद करें",
    "gender.female": "महिला",
    "gender.male": "पुरुष",
    "gender.transgender": "ट्रांसजेंडर",
    "gender.other": "बताना नहीं चाहते",
  },
  regional: {
    "gov.ministry": "सामाजिक न्याय व सक्षमीकरण मंत्रालय",
    "gov.govOfIndia": "भारत सरकार",
    "brand.tagline": "एआयद्वारे वंचित उद्योजकांचे सक्षमीकरण",
    "a11y.title": "सुलभता",
    "a11y.textSize": "मजकूर आकार",
    "a11y.decrease": "मजकूर आकार कमी करा",
    "a11y.increase": "मजकूर आकार वाढवा",
    "a11y.reset": "मजकूर आकार रीसेट करा",
    "a11y.readAloud": "वाचून दाखवा",
    "a11y.readAloudOn": "वाचून दाखवणे सुरू आहे",
    "a11y.readAloudOff": "वाचून दाखवणे बंद आहे",
    "hero.eyebrow": "एआय-आधारित योजना जुळवणी",
    "hero.title": "तुमच्या उद्योगासाठी योग्य सरकारी योजना शोधा",
    "hero.subtitle":
      "काही सोपे प्रश्न उत्तरे द्या — तुमच्या भाषेत किंवा बोलून — आणि एआयला तुमच्यासाठी योग्य कर्ज व कल्याण योजना शोधू द्या.",
    "hero.cta": "तुमची योजना जाणून घ्या / पात्रता तपासा",
    "hero.inputPlaceholder": "तुमचा प्रश्न लिहा, उदा. 'शिवणकाम दुकानासाठी कर्ज'",
    "hero.mic": "तुमचा प्रश्न बोला",
    "hero.listening": "ऐकत आहोत… आता बोला",
    "hero.startAssessment": "पात्रता मूल्यांकन सुरू करा",
    "form.title": "पात्रता मूल्यांकन",
    "form.subtitle": "तीन सोपे टप्पे. तुमची माहिती फक्त योजना जुळवणीसाठी वापरली जाते.",
    "form.step": "टप्पा",
    "form.of": "पैकी",
    "form.back": "मागे",
    "form.next": "पुढे",
    "form.seeResults": "जुळलेल्या योजना पहा",
    "form.step1": "ओळख व श्रेणी",
    "form.step2": "उद्योग तपशील",
    "form.step3": "स्थान",
    "form.category": "सामाजिक श्रेणी",
    "form.name": "पूर्ण नाव",
    "form.namePlaceholder": "तुमचे नाव प्रविष्ट करा",
    "form.gender": "लिंग",
    "form.enterpriseType": "उद्योगाचा प्रकार",
    "form.loanAmount": "इच्छित कर्ज रक्कम (₹)",
    "form.state": "राज्य",
    "form.district": "जिल्हा",
    "form.districtPlaceholder": "तुमचा जिल्हा प्रविष्ट करा",
    "form.area": "क्षेत्र प्रकार",
    "form.urban": "शहरी",
    "form.rural": "ग्रामीण",
    "results.title": "तुमच्या एआय-जुळलेल्या योजना",
    "results.subtitle": "तुमच्या प्रोफाइलनुसार क्रमवारी.",
    "results.count": "योजना जुळल्या",
    "results.match": "जुळणी",
    "results.subsidy": "अनुदान",
    "results.maxLoan": "कमाल कर्ज",
    "results.collateral": "तारण",
    "results.viewDocs": "आवश्यक कागदपत्रे पहा",
    "results.apply": "अधिकृत पोर्टलवर अर्ज करा",
    "results.listen": "योजना सारांश ऐका",
    "results.restart": "पुन्हा सुरू करा",
    "docs.title": "आवश्यक कागदपत्रे",
    "docs.subtitle": "अर्ज करण्यापूर्वी ही तयार ठेवा.",
    "docs.ready": "तयार",
    "docs.pending": "प्रलंबित",
    "docs.close": "बंद करा",
    "gender.female": "महिला",
    "gender.male": "पुरुष",
    "gender.transgender": "ट्रांसजेंडर",
    "gender.other": "सांगू इच्छित नाही",
  },
}

type AppContextValue = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  textScale: number
  increaseText: () => void
  decreaseText: () => void
  resetText: () => void
  readAloudEnabled: boolean
  toggleReadAloud: () => void
  speak: (text: string) => void
}

const AppContext = createContext<AppContextValue | null>(null)

const TEXT_STEPS = [0.9, 1, 1.15, 1.3, 1.5]

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [scaleIndex, setScaleIndex] = useState(1) // start at 1x
  const [readAloudEnabled, setReadAloudEnabled] = useState(false)

  const textScale = TEXT_STEPS[scaleIndex]

  // Reflect the chosen text scale on the document root so all rem units scale.
  useEffect(() => {
    document.documentElement.style.setProperty("--text-scale", String(textScale))
  }, [textScale])

  // Keep the <html lang> attribute in sync for screen readers.
  useEffect(() => {
    const langAttr = language === "en" ? "en" : language === "hi" ? "hi" : "mr"
    document.documentElement.setAttribute("lang", langAttr)
  }, [language])

  const t = useCallback(
    (key: string) => translations[language][key] ?? translations.en[key] ?? key,
    [language],
  )

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) return
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = language === "en" ? "en-IN" : language === "hi" ? "hi-IN" : "mr-IN"
      utterance.rate = 0.95
      window.speechSynthesis.speak(utterance)
    },
    [language],
  )

  const toggleReadAloud = useCallback(() => {
    setReadAloudEnabled((prev) => {
      const next = !prev
      if (!next && typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel()
      }
      return next
    })
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      language,
      setLanguage,
      t,
      textScale,
      increaseText: () => setScaleIndex((i) => Math.min(i + 1, TEXT_STEPS.length - 1)),
      decreaseText: () => setScaleIndex((i) => Math.max(i - 1, 0)),
      resetText: () => setScaleIndex(1),
      readAloudEnabled,
      toggleReadAloud,
      speak,
    }),
    [language, t, textScale, readAloudEnabled, toggleReadAloud, speak],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
