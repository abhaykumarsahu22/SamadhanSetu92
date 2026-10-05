"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mic, Send, Sparkles } from "lucide-react"
import { useApp } from "@/lib/app-context"

export function Hero({ onStart }: { onStart: () => void }) {
  const { t, language } = useApp()
  const [query, setQuery] = useState("")
  const [listening, setListening] = useState(false)
  const recognitionRef = useRef<any>(null)

  // Set up the browser SpeechRecognition API for voice-to-text (if available).
  useEffect(() => {
    if (typeof window === "undefined") return
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) return

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      setQuery((prev) => (prev ? `${prev} ${transcript}` : transcript))
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition

    return () => recognition.abort()
  }, [])

  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang =
        language === "en" ? "en-IN" : language === "hi" ? "hi-IN" : "mr-IN"
    }
  }, [language])

  const toggleListening = () => {
    const recognition = recognitionRef.current
    if (!recognition) return
    if (listening) {
      recognition.stop()
      setListening(false)
    } else {
      setListening(true)
      recognition.start()
    }
  }

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-primary to-[#15296b] text-primary-foreground"
      aria-labelledby="hero-title"
    >
      {/* Decorative tricolor accent line */}
      <div
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-saffron via-primary-foreground to-green-600"
        aria-hidden="true"
      />
      <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:py-24 lg:py-28">
        <span className="inline-flex items-center gap-2 rounded-full bg-saffron/15 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-saffron ring-1 ring-saffron/30">
          <Sparkles className="size-3" aria-hidden="true" />
          {t("hero.eyebrow")}
        </span>

        <h1 id="hero-title" className="mx-auto mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl lg:text-5xl leading-tight">
          {t("hero.title")}
        </h1>
        <p className="mx-auto mt-4 text-base font-semibold text-saffron">{t("brand.tagline")}</p>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-primary-foreground/80 sm:text-lg leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {/* Conversational input + voice */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onStart()
          }}
          className="mx-auto mt-10 flex max-w-2xl items-stretch gap-2 rounded-full bg-primary-foreground p-1.5 shadow-2xl ring-1 ring-white/20"
        >
          <label htmlFor="hero-query" className="sr-only">
            {t("hero.inputPlaceholder")}
          </label>
          <input
            id="hero-query"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("hero.inputPlaceholder")}
            className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={toggleListening}
            aria-pressed={listening}
            aria-label={t("hero.mic")}
            className={`relative inline-flex size-12 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
              listening
                ? "bg-saffron text-saffron-foreground shadow-lg shadow-saffron/50"
                : "bg-secondary/90 text-primary hover:bg-secondary"
            }`}
          >
            {listening && (
              <span
                className="absolute inline-flex size-full animate-pulse rounded-full bg-saffron/40"
                aria-hidden="true"
              />
            )}
            <Mic className="relative size-5" aria-hidden="true" />
          </button>
          <button
            type="submit"
            className="inline-flex h-12 shrink-0 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:shadow-lg active:scale-95"
          >
            <Send className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">{t("hero.cta")}</span>
          </button>
        </form>

        <p aria-live="polite" className="mt-4 h-5 text-xs text-saffron font-medium">
          {listening ? t("hero.listening") : ""}
        </p>

        <button
          type="button"
          onClick={onStart}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/90 transition-colors hover:text-saffron"
        >
          {t("hero.startAssessment")}
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
