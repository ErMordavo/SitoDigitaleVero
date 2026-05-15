"use client"

import { useEffect } from "react"
import { Send, ShoppingCart, Star, X } from "lucide-react"
import { useUI } from "@/context/ui-context"
import { useCart } from "@/context/cart-context"
import { telegramUrl } from "@/lib/config"

export function ProductModal() {
  const { selectedProduct, closeProduct } = useUI()
  const cart = useCart()

  useEffect(() => {
    if (!selectedProduct) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeProduct()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [selectedProduct, closeProduct])

  if (!selectedProduct) return null

  const product = selectedProduct
  const message = `Ciao! Sono interessato a "${product.name}" (€${product.price.toFixed(
    2,
  )}). Puoi darmi maggiori informazioni?`

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center px-4">
      <div
        aria-hidden="true"
        onClick={closeProduct}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative grid w-full max-w-3xl gap-0 overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={closeProduct}
          aria-label="Chiudi"
          className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-background/80 backdrop-blur hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-square w-full bg-muted md:aspect-auto">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col p-6 md:p-8">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < product.rating
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              ({product.rating}.0)
            </span>
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight">
            {product.name}
          </h2>
          <p className="mt-1 text-3xl font-semibold text-primary">
            €{product.price.toFixed(2)}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-auto grid grid-cols-1 gap-2 pt-6 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                cart.add(product)
                closeProduct()
                cart.open()
              }}
              className="btn-liquid inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              <ShoppingCart className="h-4 w-4" />
              Aggiungi al carrello
            </button>
            <a
              href={telegramUrl(message)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Send className="h-4 w-4" />
              Contatta su Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
