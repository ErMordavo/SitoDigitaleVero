"use client"

import { ThemeProvider } from "next-themes"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { ProductProvider } from "@/context/product-context"
import { UIProvider } from "@/context/ui-context"
import type { ReactNode } from "react"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange={false}
    >
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <UIProvider>{children}</UIProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
