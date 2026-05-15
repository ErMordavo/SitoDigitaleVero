"use client"

import { ArrowRight, Sparkles } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function HeroSection() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1)

  const scrollTo = (id: string) => {
    const el = document.querySelector(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100dvh] items-center px-4 pt-32 md:px-6"
    >
      <div
        ref={ref}
        className={`relative z-[1] mx-auto w-full max-w-4xl text-center transition-all duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Nuovo · Edizione 2026
        </span>

        <h1 className="mt-6 font-display text-balance text-5xl font-bold tracking-tight md:text-7xl">
          Strumenti, gadget e creatività{" "}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(120deg, #ff6b4a 0%, #a855f7 100%)",
            }}
          >
            su misura
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
          Toolnest è il marketplace dove robot e robogatti collaborano per
          portarti template, bot e prodotti pronti — con un&apos;esperienza
          d&apos;acquisto che si trasforma mentre scorri.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollTo("#products")}
            className="btn-liquid inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground"
          >
            Esplora i prodotti
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo("#how-it-works")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
          >
            Come funziona
          </button>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-3 text-left md:gap-6">
          {[
            { label: "Prodotti pronti", value: "120+" },
            { label: "Creator attivi", value: "32" },
            { label: "Bot Telegram", value: "24/7" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card/40 p-4 backdrop-blur"
            >
              <div className="font-display text-2xl font-bold md:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs text-muted-foreground md:text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
