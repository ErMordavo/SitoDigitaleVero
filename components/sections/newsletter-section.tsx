"use client"

import { useRef, useState } from "react"
import { Mail, Send } from "lucide-react"
import { useReveal } from "@/hooks/use-reveal"

export function NewsletterSection() {
  const { ref, revealed } = useReveal<HTMLDivElement>(0.1)
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)

    try {
      const confetti = (await import("canvas-confetti")).default
      const rect = buttonRef.current?.getBoundingClientRect()
      const origin = rect
        ? {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          }
        : { x: 0.5, y: 0.6 }

      confetti({
        particleCount: 80,
        spread: 70,
        origin,
        colors: ["#ff6b4a", "#a855f7", "#ffffff", "#fbbf24"],
      })
      setTimeout(() => {
        confetti({
          particleCount: 50,
          spread: 100,
          startVelocity: 35,
          origin,
          colors: ["#ff6b4a", "#a855f7"],
        })
      }, 200)
    } catch {
      // ignore
    }

    setTimeout(() => {
      setEmail("")
      setSubmitted(false)
    }, 4000)
  }

  return (
    <section id="newsletter" className="relative px-4 py-24 md:px-6 md:py-32">
      <div
        ref={ref}
        className={`mx-auto max-w-4xl transition-all duration-700 ${
          revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
      >
        <div
          className="relative overflow-hidden rounded-[2rem] border border-border p-8 text-center md:p-14"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklab, #ff6b4a 18%, var(--card)) 0%, color-mix(in oklab, #a855f7 18%, var(--card)) 100%)",
          }}
        >
          {/* Decorative blobs */}
          <div
            aria-hidden="true"
            className="absolute -left-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: "#ff6b4a" }}
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full opacity-30 blur-3xl"
            style={{ background: "#a855f7" }}
          />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium backdrop-blur">
              <Mail className="h-3.5 w-3.5 text-primary" />
              Newsletter
            </span>
            <h2 className="mt-5 font-display text-balance text-3xl font-bold tracking-tight md:text-5xl">
              Resta sintonizzato sulle novità
            </h2>
            <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-muted-foreground">
              Un&apos;email al mese con i nuovi template, sconti riservati e i
              robogatti più fotogenici.
            </p>

            <form
              onSubmit={submit}
              className="mx-auto mt-7 flex max-w-md flex-col items-center gap-2 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@toolnest.app"
                className="w-full rounded-full border border-border bg-background px-5 py-3 text-sm outline-none transition-colors focus:border-primary"
              />
              <button
                ref={buttonRef}
                type="submit"
                disabled={submitted}
                className="btn-liquid inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-70 sm:w-auto"
              >
                {submitted ? "Iscritto!" : (<><Send className="h-4 w-4" /> Iscriviti</>)}
              </button>
            </form>
            <p className="mt-3 text-xs text-muted-foreground">
              Niente spam. Cancellazione con un click.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
