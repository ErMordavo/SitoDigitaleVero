"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { STORAGE_KEYS } from "@/lib/config"
import type { Product } from "@/lib/products"

export type CartItem = Product & { quantity: number }

type CartContextValue = {
  items: CartItem[]
  isOpen: boolean
  count: number
  total: number
  add: (product: Product) => void
  remove: (id: string) => void
  setQuantity: (id: string, q: number) => void
  clear: () => void
  open: () => void
  close: () => void
  toggle: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.cart)
      if (raw) setItems(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items))
    } catch {
      // ignore
    }
  }, [items, hydrated])

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0)
    const total = items.reduce((acc, i) => acc + i.quantity * i.price, 0)
    return {
      items,
      isOpen,
      count,
      total,
      add: (product) =>
        setItems((prev) => {
          const existing = prev.find((p) => p.id === product.id)
          if (existing) {
            return prev.map((p) =>
              p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p,
            )
          }
          return [...prev, { ...product, quantity: 1 }]
        }),
      remove: (id) => setItems((prev) => prev.filter((p) => p.id !== id)),
      setQuantity: (id, q) =>
        setItems((prev) =>
          q <= 0
            ? prev.filter((p) => p.id !== id)
            : prev.map((p) => (p.id === id ? { ...p, quantity: q } : p)),
        ),
      clear: () => setItems([]),
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
    }
  }, [items, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used inside CartProvider")
  return ctx
}
