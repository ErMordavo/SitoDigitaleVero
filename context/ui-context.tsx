"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import type { Product } from "@/lib/products"

type UIContextValue = {
  selectedProduct: Product | null
  showProduct: (p: Product) => void
  closeProduct: () => void
  authOpen: boolean
  openAuth: () => void
  closeAuth: () => void
}

const UIContext = createContext<UIContextValue | null>(null)

export function UIProvider({ children }: { children: ReactNode }) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [authOpen, setAuthOpen] = useState(false)

  const value = useMemo<UIContextValue>(
    () => ({
      selectedProduct,
      showProduct: (p) => setSelectedProduct(p),
      closeProduct: () => setSelectedProduct(null),
      authOpen,
      openAuth: () => setAuthOpen(true),
      closeAuth: () => setAuthOpen(false),
    }),
    [selectedProduct, authOpen],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const ctx = useContext(UIContext)
  if (!ctx) throw new Error("useUI must be used inside UIProvider")
  return ctx
}
