"use client"

import { Landmark } from "lucide-react"
import { useApp } from "@/lib/app-context"

export function SiteFooter() {
  const { t } = useApp()

  return (
    <footer className="border-t border-primary-foreground/15 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-8 text-center">
        <div className="flex items-center gap-2">
          <Landmark className="size-5" aria-hidden="true" />
          <span className="font-bold">
            Samadhan<span className="text-saffron">Setu</span>
          </span>
        </div>
        <p className="text-sm text-primary-foreground/80">{t("gov.ministry")}</p>
        <p className="max-w-xl text-xs text-primary-foreground/60">
          {t("brand.tagline")} · {t("gov.govOfIndia")}
        </p>
        <p className="text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} SamadhanSetu · SIH26092
        </p>
      </div>
    </footer>
  )
}
