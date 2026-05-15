"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { ADMIN_PASSWORD, STORAGE_KEYS } from "@/lib/config"

type User = {
  email: string
  isAdmin: boolean
}

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => { ok: boolean; error?: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.auth)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      if (user) localStorage.setItem(STORAGE_KEYS.auth, JSON.stringify(user))
      else localStorage.removeItem(STORAGE_KEYS.auth)
    } catch {
      // ignore
    }
  }, [user, hydrated])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      login: (email, password) => {
        if (!email || !password) {
          return { ok: false, error: "Inserisci email e password." }
        }
        const isAdmin = password === ADMIN_PASSWORD
        setUser({ email, isAdmin })
        return { ok: true }
      },
      logout: () => setUser(null),
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider")
  return ctx
}
