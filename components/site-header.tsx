"use client"

import { Landmark } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { AccessibilityToolbar } from "@/components/accessibility-toolbar"
import { LanguageSelector } from "@/components/language-selector"

export function SiteHeader() {
  const { t } = useApp()

  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top utility strip: Government of India + accessibility tools */}
      <div className="border-b border-primary-foreground/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2">
          <p className="text-xs font-medium text-primary-foreground/80">{t("gov.govOfIndia")}</p>
          <AccessibilityToolbar />
        </div>
      </div>

      {/* Main brand bar */}
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div className="flex items-center gap-3">
          {/* Government emblem placeholder */}
          <div
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-foreground/10 ring-1 ring-primary-foreground/30"
            aria-hidden="true"
          >
            <Landmark className="size-6 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xl font-bold leading-tight tracking-tight">
              Samadhan<span className="text-saffron">Setu</span>
            </p>
            <p className="text-xs text-primary-foreground/80">{t("gov.ministry")}</p>
          </div>
        </div>

        <LanguageSelector />
      </div>
    </header>
  )
}
