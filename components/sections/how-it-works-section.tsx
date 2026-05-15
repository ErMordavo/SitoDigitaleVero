"use client"

import { Compass, MousePointerClick, PackageCheck } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

const STEPS = [
  {
    icon: Compass,
    title: "Esplora",
    description:
      "Naviga tra categorie, template e bot. Tutto è pre-configurato e pronto.",
  },
  {
    icon: MousePointerClick,
    title: "Scegli",
    description:
      "Aggiungi al carrello o richiedi un servizio custom: rispondiamo entro 24h.",
  },
  {
    icon: PackageCheck,
    title: "Ricevi",
    description:
      "Consegniamo via Telegram, in formato digitale o con onboarding personalizzato.",
  },
]

export function HowItWorksSection() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.15)

  return (
    <section id="how-it-works" className="relative px-4 py-24 md:px-6 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-6xl transition-all duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Come funziona
          </p>
          <h2 className="mt-3 font-display text-balance text-4xl font-bold tracking-tight md:text-5xl">
            Tre passi e sei pronto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground">
            Un flusso semplice, pensato per chi vuole risultati veloci senza
            rinunciare alla cura del dettaglio.
          </p>
        </div>

        <div className="relative mt-16">
          {/* Dotted line - hidden on mobile */}
          <div className="absolute left-[15%] right-[15%] top-12 hidden md:block">
            <div className="dotted-line" />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <div
                  key={step.title}
                  className="relative flex flex-col items-center text-center"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <span
                    className="relative grid h-24 w-24 place-items-center rounded-3xl bg-card text-primary shadow-xl"
                    style={{
                      border: "1px solid var(--border)",
                    }}
                  >
                    <span
                      className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full font-display text-sm font-bold text-primary-foreground"
                      style={{
                        background:
                          "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <Icon className="h-9 w-9" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
