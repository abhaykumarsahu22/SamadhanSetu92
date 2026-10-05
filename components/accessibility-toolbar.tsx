"use client"

import { AArrowDown, AArrowUp, RotateCcw, Volume2, VolumeX } from "lucide-react"
import { useApp } from "@/lib/app-context"

export function AccessibilityToolbar() {
  const { t, increaseText, decreaseText, resetText, readAloudEnabled, toggleReadAloud, speak } = useApp()

  const handleReadAloud = () => {
    toggleReadAloud()
    // Give immediate audio confirmation when turning the feature on.
    if (!readAloudEnabled) speak(t("a11y.readAloudOn"))
  }

  const btn =
    "inline-flex size-8 items-center justify-center rounded-md border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"

  return (
    <div
      role="group"
      aria-label={t("a11y.title")}
      className="flex items-center gap-1.5"
    >
      <span className="mr-0.5 hidden text-xs font-medium text-primary-foreground/80 sm:inline">
        {t("a11y.textSize")}
      </span>
      <button type="button" className={btn} onClick={decreaseText} aria-label={t("a11y.decrease")}>
        <AArrowDown className="size-4" aria-hidden="true" />
      </button>
      <button type="button" className={btn} onClick={increaseText} aria-label={t("a11y.increase")}>
        <AArrowUp className="size-4" aria-hidden="true" />
      </button>
      <button type="button" className={btn} onClick={resetText} aria-label={t("a11y.reset")}>
        <RotateCcw className="size-3.5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={handleReadAloud}
        aria-pressed={readAloudEnabled}
        aria-label={readAloudEnabled ? t("a11y.readAloudOn") : t("a11y.readAloudOff")}
        className={
          readAloudEnabled
            ? "inline-flex h-8 items-center gap-1.5 rounded-md bg-saffron px-2.5 text-sm font-medium text-saffron-foreground transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
            : "inline-flex h-8 items-center gap-1.5 rounded-md border border-primary-foreground/25 bg-primary-foreground/10 px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"
        }
      >
        {readAloudEnabled ? (
          <Volume2 className="size-4" aria-hidden="true" />
        ) : (
          <VolumeX className="size-4" aria-hidden="true" />
        )}
        <span className="hidden md:inline">{t("a11y.readAloud")}</span>
      </button>
    </div>
  )
}
