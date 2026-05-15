"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Lightbulb, ShoppingCart, LogIn, LogOut, Crown } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useUI } from "@/context/ui-context"

const NAV_LINKS = [
  { href: "#templates", label: "Template" },
  { href: "#products", label: "Prodotti" },
  { href: "#services", label: "Servizi" },
  { href: "#newsletter", label: "Contatti" },
]

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const cart = useCart()
  const { user, logout } = useAuth()
  const { openAuth } = useUI()

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const isDark = mounted ? (resolvedTheme ?? theme) === "dark" : false

  const handleAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <span
            className="grid h-8 w-8 place-items-center rounded-xl text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
            }}
          >
            <Crown className="h-4 w-4" />
          </span>
          Toolnest
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchor(e, link.href)}
              className="rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label={isDark ? "Tema chiaro" : "Tema scuro"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-primary hover:text-primary"
          >
            <Lightbulb
              className={`h-4 w-4 transition-transform ${
                isDark ? "" : "rotate-180 fill-current text-primary"
              }`}
            />
          </button>

          <button
            type="button"
            aria-label="Apri carrello"
            onClick={cart.toggle}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-primary hover:text-primary"
          >
            <ShoppingCart className="h-4 w-4" />
            {cart.count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                {cart.count}
              </span>
            )}
          </button>

          {user ? (
            <div className="hidden items-center gap-2 md:flex">
              {user.isAdmin && (
                <Link
                  href="/admin"
                  className="rounded-full bg-accent/15 px-3 py-1.5 text-xs font-medium text-accent"
                >
                  Admin
                </Link>
              )}
              <span className="text-xs text-muted-foreground">
                {user.email}
              </span>
              <button
                type="button"
                onClick={logout}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/60 text-foreground transition-all hover:border-destructive hover:text-destructive"
                aria-label="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={openAuth}
              className="btn-liquid hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-primary-foreground md:inline-flex"
            >
              <LogIn className="h-4 w-4" />
              Accedi
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
