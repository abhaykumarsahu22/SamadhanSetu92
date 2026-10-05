"use client"

import { Languages } from "lucide-react"
import { LANGUAGE_LABELS, useApp, type Language } from "@/lib/app-context"

const ORDER: Language[] = ["en", "hi", "regional"]

export function LanguageSelector() {
  const { language, setLanguage } = useApp()

  return (
    <div
      role="group"
      aria-label="Select language"
      className="flex items-center gap-1 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 p-1"
    >
      <Languages className="ml-1.5 size-4 text-primary-foreground/80" aria-hidden="true" />
      {ORDER.map((lang) => {
        const active = language === lang
        return (
          <button
            key={lang}
            type="button"
            onClick={() => setLanguage(lang)}
            aria-pressed={active}
            className={`rounded-full px-2.5 py-1 text-sm font-medium transition-colors ${
              active
                ? "bg-primary-foreground text-primary"
                : "text-primary-foreground/90 hover:bg-primary-foreground/15"
            }`}
          >
            {LANGUAGE_LABELS[lang]}
          </button>
        )
      })}
    </div>
  )
}
