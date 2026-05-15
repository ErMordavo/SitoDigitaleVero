"use client"

import { ArrowUpRight } from "lucide-react"
import { CATEGORIES } from "@/lib/categories"
import { useReveal } from "@/hooks/use-reveal"

export function CategoriesSection() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.15)

  return (
    <section id="templates" className="relative px-4 py-24 md:px-6 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Categorie
            </p>
            <h2 className="mt-3 font-display text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Trova ciò che cerchi
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Cinque famiglie di prodotti, curate dal nostro robocat. Tutto pronto
            all&apos;uso, tutto consegnato via Telegram.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            const isAccent = cat.accent === "accent"
            return (
              <a
                key={cat.id}
                href={`#products`}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#products")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  })
                }}
                className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border bg-card/60 p-5 backdrop-blur transition-all hover:-translate-y-1 hover:border-primary hover:shadow-xl"
                style={{
                  transitionDelay: `${i * 60}ms`,
                }}
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl text-white transition-transform group-hover:scale-110`}
                  style={{
                    background: isAccent
                      ? "linear-gradient(135deg, #a855f7 0%, #6d28d9 100%)"
                      : "linear-gradient(135deg, #ff6b4a 0%, #ea580c 100%)",
                  }}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-muted-foreground transition-all group-hover:right-3 group-hover:top-3 group-hover:text-primary" />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
