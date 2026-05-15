"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Crown, LogIn, ArrowLeft } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

/**
 * Login Page - Simple authentication form
 * 
 * Features:
 * - Email/password form (accepts any credentials for mock login)
 * - Redirects to /dashboard on successful login
 * - Link to return to homepage
 */

export default function LoginPage() {
  const router = useRouter()
  const { customer, isLoading, login } = useCustomer()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Redirect if already logged in
  useEffect(() => {
    if (!isLoading && customer) {
      router.push("/dashboard")
    }
  }, [customer, isLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email.trim() || !password.trim()) {
      setError("Inserisci email e password")
      return
    }

    setIsSubmitting(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/dashboard")
      } else {
        setError("Credenziali non valide")
      }
    } catch {
      setError("Si è verificato un errore. Riprova.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    )
  }

  // Don't render if already logged in (will redirect)
  if (customer) {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Back to home link */}
      <Link
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:left-8 md:top-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Torna al sito
      </Link>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div
            className="grid h-16 w-16 place-items-center rounded-2xl text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
            }}
          >
            <Crown className="h-8 w-8" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
            Accedi a Toolnest
          </h1>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Inserisci le tue credenziali per accedere all&apos;area clienti.
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="la-tua@email.com"
                autoComplete="email"
                required
              />
            </div>

            {/* Password field */}
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="La tua password"
                autoComplete="current-password"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <p className="mt-4 text-sm text-destructive">{error}</p>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              <LogIn className="h-4 w-4" />
              {isSubmitting ? "Accesso in corso..." : "Accedi"}
            </button>
          </div>
        </form>

        {/* Demo notice */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Demo: inserisci qualsiasi email e password per accedere.
        </p>
      </div>
    </div>
  )
}