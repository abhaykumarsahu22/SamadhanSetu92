"use client"

import { Building2, ExternalLink, FileCheck, ShieldCheck, Volume2, Wallet } from "lucide-react"
import { useApp } from "@/lib/app-context"
import type { Scheme } from "@/lib/schemes"

export function SchemeCard({
  scheme,
  onViewDocs,
}: {
  scheme: Scheme
  onViewDocs: () => void
}) {
  const { t, speak } = useApp()

  const readyCount = scheme.documents.filter((d) => d.status === "ready").length

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      {/* Header with ministry badge + AI match score */}
      <div className="flex items-start justify-between gap-3 border-b border-border p-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
            <Building2 className="size-3.5" aria-hidden="true" />
            {scheme.ministry}
          </span>
          <h3 className="mt-2 text-base font-bold leading-snug text-foreground">
            {scheme.shortName}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{scheme.name}</p>
        </div>

        {/* AI Match Score badge */}
        <div className="flex shrink-0 flex-col items-center rounded-xl bg-saffron/10 px-3 py-2 text-center ring-1 ring-saffron/30">
          <span className="text-xl font-extrabold leading-none text-saffron">{scheme.matchScore}%</span>
          <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-saffron">
            {t("results.match")}
          </span>
        </div>
      </div>

      {/* Key facts */}
      <dl className="grid grid-cols-3 gap-2 p-5 text-center">
        <Fact icon={Wallet} label={t("results.subsidy")} value={scheme.subsidy} />
        <Fact icon={FileCheck} label={t("results.maxLoan")} value={scheme.maxLoan} />
        <Fact icon={ShieldCheck} label={t("results.collateral")} value={scheme.collateral} />
      </dl>

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2 p-5 pt-0">
        <button
          type="button"
          onClick={onViewDocs}
          className="inline-flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          <span>{t("results.viewDocs")}</span>
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-primary">
            {readyCount}/{scheme.documents.length}
          </span>
        </button>

        <div className="flex gap-2">
          <a
            href={scheme.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("results.apply")}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => speak(scheme.summary)}
            aria-label={`${t("results.listen")}: ${scheme.shortName}`}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-saffron text-saffron-foreground transition-colors hover:brightness-95"
          >
            <Volume2 className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  )
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Wallet
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-2">
      <Icon className="size-4 text-primary" aria-hidden="true" />
      <dt className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-xs font-bold text-foreground">{value}</dd>
    </div>
  )
}
