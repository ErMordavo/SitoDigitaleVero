"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { STORAGE_KEYS } from "@/lib/config"
import { DEFAULT_PRODUCTS, type Product } from "@/lib/products"

type ProductContextValue = {
  products: Product[]
  add: (p: Omit<Product, "id">) => void
  update: (id: string, patch: Partial<Product>) => void
  remove: (id: string) => void
  reset: () => void
}

const ProductContext = createContext<ProductContextValue | null>(null)

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.products)
      if (raw) {
        const parsed = JSON.parse(raw) as Product[]
        if (Array.isArray(parsed) && parsed.length > 0) setProducts(parsed)
      }
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products))
    } catch {
      // ignore
    }
  }, [products, hydrated])

  const add = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => [
      ...prev,
      { ...p, id: `p-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` },
    ])
  }, [])

  const update = useCallback((id: string, patch: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    )
  }, [])

  const remove = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }, [])

  const reset = useCallback(() => setProducts(DEFAULT_PRODUCTS), [])

  const value = useMemo(
    () => ({ products, add, update, remove, reset }),
    [products, add, update, remove, reset],
  )

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error("useProducts must be used inside ProductProvider")
  return ctx
}
