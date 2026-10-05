"use client"

import { useEffect } from "react"
import { Check, Clock, FileText, X } from "lucide-react"
import { useApp } from "@/lib/app-context"
import type { Scheme } from "@/lib/schemes"

export function DocumentsDrawer({
  scheme,
  onClose,
}: {
  scheme: Scheme | null
  onClose: () => void
}) {
  const { t } = useApp()

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!scheme) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [scheme, onClose])

  if (!scheme) return null

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label={t("docs.close")}
        onClick={onClose}
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
      />

      {/* Drawer panel */}
      <div className="relative flex h-full w-full max-w-md flex-col overflow-y-auto bg-card shadow-2xl duration-200 animate-in slide-in-from-right">
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
              <FileText className="size-5" aria-hidden="true" />
            </div>
            <div>
              <h2 id="docs-title" className="text-lg font-bold text-foreground">
                {t("docs.title")}
              </h2>
              <p className="text-sm text-muted-foreground">{scheme.shortName}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("docs.close")}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <p className="px-6 pt-4 text-sm text-muted-foreground">{t("docs.subtitle")}</p>

        <ul className="flex flex-col gap-3 p-6">
          {scheme.documents.map((doc) => {
            const ready = doc.status === "ready"
            return (
              <li
                key={doc.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-background p-4"
              >
                <span className="font-medium text-foreground">{doc.label}</span>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    ready
                      ? "bg-green-100 text-green-800"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {ready ? (
                    <Check className="size-3.5" aria-hidden="true" />
                  ) : (
                    <Clock className="size-3.5" aria-hidden="true" />
                  )}
                  {ready ? t("docs.ready") : t("docs.pending")}
                </span>
              </li>
            )
          })}
        </ul>

        <div className="mt-auto border-t border-border p-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("docs.close")}
          </button>
        </div>
      </div>
    </div>
  )
}
