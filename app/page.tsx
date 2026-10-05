"use client"

import { useRef, useState } from "react"
import { AppProvider } from "@/lib/app-context"
import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { AssessmentForm, type AssessmentData } from "@/components/assessment-form"
import { ResultsGrid } from "@/components/results-grid"
import { SiteFooter } from "@/components/site-footer"

function Home() {
  const [result, setResult] = useState<AssessmentData | null>(null)
  const assessmentRef = useRef<HTMLDivElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  const scrollTo = (ref: React.RefObject<HTMLDivElement | null>) =>
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1">
        <Hero onStart={() => scrollTo(assessmentRef)} />

        <div ref={assessmentRef}>
          <AssessmentForm
            onComplete={(data) => {
              setResult(data)
              // Allow the results section to mount before scrolling.
              requestAnimationFrame(() => scrollTo(resultsRef))
            }}
          />
        </div>

        {result && (
          <div ref={resultsRef}>
            <ResultsGrid
              data={result}
              onRestart={() => {
                setResult(null)
                scrollTo(assessmentRef)
              }}
            />
          </div>
        )}
      </main>

      <SiteFooter />
    </div>
  )
}

export default function Page() {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  )
}
