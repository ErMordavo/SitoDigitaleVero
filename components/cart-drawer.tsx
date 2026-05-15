"use client"

import { Minus, Plus, Send, ShoppingBag, Trash2, X } from "lucide-react"
import { useEffect } from "react"
import { useCart } from "@/context/cart-context"
import { telegramUrl } from "@/lib/config"

export function CartDrawer() {
  const cart = useCart()

  useEffect(() => {
    if (!cart.isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && cart.close()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [cart])

  const checkout = () => {
    if (cart.items.length === 0) return
    const lines = cart.items.map(
      (i) => `• ${i.name} × ${i.quantity} — €${(i.price * i.quantity).toFixed(2)}`,
    )
    const message = [
      "🛍️ Ordine da Toolnest:",
      "",
      ...lines,
      "",
      `Totale: €${cart.total.toFixed(2)}`,
    ].join("\n")
    window.open(telegramUrl(message), "_blank", "noopener")
  }

  return (
    <>
      <div
        aria-hidden="true"
        onClick={cart.close}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          cart.isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Carrello"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full max-w-md flex-col border-l border-border bg-card text-card-foreground shadow-2xl transition-transform duration-300 ${
          cart.isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-primary" />
            <h2 className="font-display text-lg font-semibold">Il tuo carrello</h2>
          </div>
          <button
            type="button"
            onClick={cart.close}
            aria-label="Chiudi carrello"
            className="grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          {cart.items.length === 0 ? (
            <div className="grid h-full place-items-center px-6 text-center">
              <div>
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-muted text-muted-foreground">
                  <ShoppingBag className="h-7 w-7" />
                </div>
                <p className="mt-4 font-medium">Il carrello è vuoto</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Aggiungi qualche prodotto per iniziare.
                </p>
              </div>
            </div>
          ) : (
            <ul className="space-y-3">
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-border bg-background/60 p-3"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium leading-tight">
                        {item.name}
                      </h3>
                      <button
                        type="button"
                        onClick={() => cart.remove(item.id)}
                        aria-label="Rimuovi"
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-primary">
                      €{item.price.toFixed(2)}
                    </p>
                    <div className="mt-auto flex items-center gap-1.5">
                      <button
                        type="button"
                        aria-label="Diminuisci"
                        onClick={() => cart.setQuantity(item.id, item.quantity - 1)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Aumenta"
                        onClick={() => cart.setQuantity(item.id, item.quantity + 1)}
                        className="grid h-7 w-7 place-items-center rounded-full border border-border hover:border-primary hover:text-primary"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border bg-background/60 p-5">
          <div className="mb-4 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Totale</span>
            <span className="font-display text-2xl font-bold">
              €{cart.total.toFixed(2)}
            </span>
          </div>
          <button
            type="button"
            onClick={checkout}
            disabled={cart.items.length === 0}
            className="btn-liquid inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
            Checkout via Telegram
          </button>
          {cart.items.length > 0 && (
            <button
              type="button"
              onClick={cart.clear}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2 text-xs text-muted-foreground hover:text-destructive"
            >
              Svuota carrello
            </button>
          )}
        </div>
      </aside>
    </>
  )
}
