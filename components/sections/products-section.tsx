"use client"

import { Star } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"
import { useProducts } from "@/context/product-context"
import { useUI } from "@/context/ui-context"

export function ProductsSection() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1)
  const { products } = useProducts()
  const { showProduct } = useUI()

  return (
    <section id="products" className="relative px-4 py-24 md:px-6 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-7xl transition-all duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              In evidenza
            </p>
            <h2 className="mt-3 font-display text-balance text-4xl font-bold tracking-tight md:text-5xl">
              Prodotti del momento
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Una selezione curata: clicca su una card per i dettagli, aggiungi al
            carrello o scrivi direttamente al nostro bot Telegram.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <button
              type="button"
              key={product.id}
              onClick={() => showProduct(product)}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card/70 text-left backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image }
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute left-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider backdrop-blur">
                  {product.category}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className={`h-3.5 w-3.5 ${
                        idx < product.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <h3 className="mt-2 font-display text-lg font-semibold leading-tight">
                  {product.name}
                </h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {product.description}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="font-display text-xl font-bold text-primary">
                    €{product.price.toFixed(2)}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-primary group-hover:text-primary">
                    Vedi dettagli →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
