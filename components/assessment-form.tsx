"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, IdCard, Briefcase, MapPin, Sparkles } from "lucide-react"
import { useApp } from "@/lib/app-context"
import {
  ENTERPRISE_TYPES,
  INDIAN_STATES,
  LOAN_RANGES,
  SOCIAL_CATEGORIES,
} from "@/lib/schemes"

export type AssessmentData = {
  name: string
  category: string
  gender: string
  enterpriseType: string
  loanRange: string
  state: string
  district: string
  area: "urban" | "rural" | ""
}

export const EMPTY_ASSESSMENT: AssessmentData = {
  name: "",
  category: "",
  gender: "",
  enterpriseType: "",
  loanRange: "",
  state: "",
  district: "",
  area: "",
}

const STEP_ICONS = [IdCard, Briefcase, MapPin]

export function AssessmentForm({
  onComplete,
}: {
  onComplete: (data: AssessmentData) => void
}) {
  const { t } = useApp()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<AssessmentData>(EMPTY_ASSESSMENT)

  const stepTitles = [t("form.step1"), t("form.step2"), t("form.step3")]
  const update = (patch: Partial<AssessmentData>) => setData((d) => ({ ...d, ...patch }))

  const canProceed =
    (step === 0 && data.category) ||
    (step === 1 && data.enterpriseType && data.loanRange) ||
    (step === 2 && data.state && data.area)

  const handleNext = () => {
    if (step < 2) setStep((s) => s + 1)
    else onComplete(data)
  }

  return (
    <section id="assessment" className="mx-auto max-w-3xl scroll-mt-6 px-4 py-14" aria-labelledby="assessment-title">
      <div className="text-center">
        <h2 id="assessment-title" className="text-2xl font-bold text-foreground sm:text-3xl">
          {t("form.title")}
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-muted-foreground">{t("form.subtitle")}</p>
      </div>

      {/* Stepper header */}
      <ol className="mx-auto mt-8 flex max-w-xl items-center" aria-label="Progress">
        {stepTitles.map((title, i) => {
          const Icon = STEP_ICONS[i]
          const complete = i < step
          const current = i === step
          return (
            <li key={title} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  aria-current={current ? "step" : undefined}
                  className={`flex size-10 items-center justify-center rounded-full border-2 transition-colors ${
                    complete
                      ? "border-primary bg-primary text-primary-foreground"
                      : current
                        ? "border-primary bg-secondary text-primary"
                        : "border-border bg-card text-muted-foreground"
                  }`}
                >
                  {complete ? (
                    <Check className="size-5" aria-hidden="true" />
                  ) : (
                    <Icon className="size-5" aria-hidden="true" />
                  )}
                </span>
                <span
                  className={`hidden text-xs font-medium sm:block ${
                    current || complete ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {title}
                </span>
              </div>
              {i < stepTitles.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`mx-2 h-0.5 flex-1 rounded ${i < step ? "bg-primary" : "bg-border"}`}
                />
              )}
            </li>
          )
        })}
      </ol>

      {/* Step body */}
      <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="mb-6 text-sm font-medium text-muted-foreground">
          {t("form.step")} {step + 1} {t("form.of")} 3 — <span className="text-primary">{stepTitles[step]}</span>
        </p>

        {step === 0 && (
          <div className="space-y-6">
            <Field label={t("form.name")}>
              <input
                type="text"
                value={data.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder={t("form.namePlaceholder")}
                className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </Field>
            <Field label={t("form.category")}>
              <ChipGroup
                name="category"
                options={SOCIAL_CATEGORIES.map((c) => ({ value: c, label: c }))}
                value={data.category}
                onChange={(v) => update({ category: v })}
              />
            </Field>
            <Field label={t("form.gender")}>
              <ChipGroup
                name="gender"
                options={[
                  { value: "female", label: t("gender.female") },
                  { value: "male", label: t("gender.male") },
                  { value: "transgender", label: t("gender.transgender") },
                  { value: "other", label: t("gender.other") },
                ]}
                value={data.gender}
                onChange={(v) => update({ gender: v })}
              />
            </Field>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <Field label={t("form.enterpriseType")}>
              <ChipGroup
                name="enterprise"
                options={ENTERPRISE_TYPES.map((e) => ({ value: e, label: e }))}
                value={data.enterpriseType}
                onChange={(v) => update({ enterpriseType: v })}
              />
            </Field>
            <Field label={t("form.loanAmount")}>
              <ChipGroup
                name="loan"
                options={LOAN_RANGES.map((l) => ({ value: l, label: l }))}
                value={data.loanRange}
                onChange={(v) => update({ loanRange: v })}
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label={t("form.state")}>
                <select
                  value={data.state}
                  onChange={(e) => update({ state: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="">—</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label={t("form.district")}>
                <input
                  type="text"
                  value={data.district}
                  onChange={(e) => update({ district: e.target.value })}
                  placeholder={t("form.districtPlaceholder")}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </Field>
            </div>
            <Field label={t("form.area")}>
              <ChipGroup
                name="area"
                options={[
                  { value: "urban", label: t("form.urban") },
                  { value: "rural", label: t("form.rural") },
                ]}
                value={data.area}
                onChange={(v) => update({ area: v as AssessmentData["area"] })}
              />
            </Field>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-lg border border-input bg-background px-4 py-2.5 font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t("form.back")}
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {step < 2 ? (
              <>
                {t("form.next")}
                <ArrowRight className="size-4" aria-hidden="true" />
              </>
            ) : (
              <>
                <Sparkles className="size-4" aria-hidden="true" />
                {t("form.seeResults")}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-foreground">{label}</label>
      {children}
    </div>
  )
}

function ChipGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div role="radiogroup" aria-label={name} className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-secondary"
            }`}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}
