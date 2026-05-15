"use client"

import { useEffect, useState } from "react"
import { LogIn, X } from "lucide-react"
import { useUI } from "@/context/ui-context"
import { useAuth } from "@/context/auth-context"

export function AuthModal() {
  const { authOpen, closeAuth } = useUI()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authOpen) {
      setEmail("")
      setPassword("")
      setError(null)
    }
  }, [authOpen])

  useEffect(() => {
    if (!authOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAuth()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [authOpen, closeAuth])

  if (!authOpen) return null

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = login(email.trim(), password)
    if (result.ok) closeAuth()
    else setError(result.error ?? "Errore di accesso")
  }

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center px-4">
      <div
        aria-hidden="true"
        onClick={closeAuth}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl">
        <button
          type="button"
          onClick={closeAuth}
          aria-label="Chiudi"
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full hover:bg-muted"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="mb-5 flex items-center gap-3">
          <span
            className="grid h-10 w-10 place-items-center rounded-2xl text-primary-foreground"
            style={{
              background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
            }}
          >
            <LogIn className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold">Accedi</h2>
            <p className="text-xs text-muted-foreground">
              Mock login: usa la password admin per i privilegi admin.
            </p>
          </div>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@toolnest.app"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
          </div>
          {error && (
            <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="btn-liquid inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Entra
          </button>
        </form>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          Suggerimento: <code className="rounded bg-muted px-1.5 py-0.5">admin123</code>{" "}
          per accedere come amministratore.
        </p>
      </div>
    </div>
  )
}
