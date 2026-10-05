"use client"

import { useState } from "react"
import { RotateCcw, Sparkles } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { SCHEMES, type Scheme } from "@/lib/schemes"
import { SchemeCard } from "@/components/scheme-card"
import { DocumentsDrawer } from "@/components/documents-drawer"
import type { AssessmentData } from "@/components/assessment-form"

export function ResultsGrid({
  data,
  onRestart,
}: {
  data: AssessmentData
  onRestart: () => void
}) {
  const { t } = useApp()
  const [activeScheme, setActiveScheme] = useState<Scheme | null>(null)

  // Sort by AI match score, highest first.
  const schemes = [...SCHEMES].sort((a, b) => b.matchScore - a.matchScore)

  return (
    <section id="results" className="scroll-mt-6 bg-secondary/40 py-14" aria-labelledby="results-title">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-saffron/15 px-3 py-1 text-sm font-medium text-saffron ring-1 ring-saffron/30">
              <Sparkles className="size-3.5" aria-hidden="true" />
              {schemes.length} {t("results.count")}
            </span>
            <h2 id="results-title" className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              {t("results.title")}
            </h2>
            <p className="mt-1 text-muted-foreground">
              {t("results.subtitle")}
              {data.category ? ` · ${data.category}` : ""}
              {data.state ? ` · ${data.state}` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            {t("results.restart")}
          </button>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} onViewDocs={() => setActiveScheme(scheme)} />
          ))}
        </div>
      </div>

      <DocumentsDrawer scheme={activeScheme} onClose={() => setActiveScheme(null)} />
    </section>
  )
}
