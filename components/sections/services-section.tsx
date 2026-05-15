"use client"

import { Code2, MessageSquare, Palette, Send, Zap } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { telegramUrl } from "@/lib/config"

const SERVICES = [
  {
    icon: Code2,
    title: "Sviluppo su misura",
    description:
      "Web app, dashboard, automazioni: dal concept al deploy su Vercel in tempi record.",
  },
  {
    icon: Palette,
    title: "Design & Branding",
    description:
      "Identità visive, UI kit e landing page che convertono. Tutto coerente, tutto curato.",
  },
  {
    icon: MessageSquare,
    title: "Bot Telegram",
    description:
      "Bot custom per ordini, customer care, broadcast e community. Manutenzione inclusa.",
  },
  {
    icon: Zap,
    title: "Consulenze rapide",
    description:
      "Una call, un piano d&apos;azione concreto e tutta la documentazione di supporto.",
  },
]

export function ServicesSection() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.15)

  return (
    <section id="services" className="relative px-4 py-24 md:px-6 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="grid gap-12 md:grid-cols-[1fr_2fr] md:gap-20">
          <div className="md:sticky md:top-28 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Servizi
            </p>
            <h2 className="mt-3 font-display text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Cuciti addosso da noi
            </h2>
            <p className="mt-4 text-pretty text-sm leading-relaxed text-muted-foreground">
              Quando un prodotto pronto non basta, costruiamo qualcosa
              esattamente come lo immagini. Brief, prototipo, lancio: ti
              accompagniamo dall&apos;idea alla messa in produzione.
            </p>
            <a
              href={telegramUrl("Vorrei richiedere un servizio su misura")}
              target="_blank"
              rel="noreferrer"
              className="btn-liquid mt-6 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <Send className="h-4 w-4" />
              Richiedi un preventivo
            </a>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SERVICES.map((s, i) => {
              const Icon = s.icon
              return (
                <article
                  key={s.title}
                  className="group rounded-3xl border border-border bg-card/70 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-2xl"
                  style={{ transitionDelay: `${i * 70}ms` }}
                >
                  <span
                    className="grid h-11 w-11 place-items-center rounded-xl text-white transition-transform group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background:
                        i % 2 === 0
                          ? "linear-gradient(135deg, #ff6b4a 0%, #ea580c 100%)"
                          : "linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)",
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                    dangerouslySetInnerHTML={{ __html: s.description }}
                  />
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
