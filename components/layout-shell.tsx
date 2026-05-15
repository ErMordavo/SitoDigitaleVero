"use client"

import type { ReactNode } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ScrollRobot } from "@/components/scroll-robot"
import { ScrollColorBackground } from "@/components/scroll-color-background"
import { ScrollToTop } from "@/components/scroll-to-top"
import { CustomCursor } from "@/components/custom-cursor"
import { IntroVideo } from "@/components/intro-video"
import { CartDrawer } from "@/components/cart-drawer"
import { AuthModal } from "@/components/auth-modal"
import { ProductModal } from "@/components/product-modal"
import { TelegramFloat } from "@/components/telegram-float"

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollColorBackground />
      <ScrollRobot />

      <div className="relative z-[1]">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>

      <ScrollToTop />
      <TelegramFloat />
      <CustomCursor />
      <IntroVideo />
      <CartDrawer />
      <AuthModal />
      <ProductModal />
    </>
  )
}
