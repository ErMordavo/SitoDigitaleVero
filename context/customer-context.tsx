"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react"

/**
 * CustomerContext - Mock authentication and user profile management
 * 
 * Data structure:
 * - user: { id, name, email, avatar, createdAt }
 * - Persisted in localStorage for session persistence
 * 
 * Methods:
 * - login(email, password): Simulates login (accepts any credentials)
 * - logout(): Clears user session
 * - updateProfile(updates): Updates user profile fields
 */

export interface CustomerUser {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
}

interface CustomerContextValue {
  customer: CustomerUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateProfile: (updates: Partial<Omit<CustomerUser, "id" | "createdAt">>) => void
}

const CustomerContext = createContext<CustomerContextValue | undefined>(undefined)

const STORAGE_KEY = "toolnest_customer"

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customer, setCustomer] = useState<CustomerUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load customer from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as CustomerUser
        setCustomer(parsed)
      }
    } catch {
      // Invalid data, ignore
    }
    setIsLoading(false)
  }, [])

  // Persist customer to localStorage
  useEffect(() => {
    if (customer) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customer))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [customer])

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Mock login - accepts any email/password
    // In production, replace with actual API call
    const newCustomer: CustomerUser = {
      id: `cust_${Date.now()}`,
      name: email.split("@")[0],
      email,
      createdAt: new Date().toISOString(),
    }

    setCustomer(newCustomer)
    return true
  }, [])

  const logout = useCallback(() => {
    setCustomer(null)
  }, [])

  const updateProfile = useCallback(
    (updates: Partial<Omit<CustomerUser, "id" | "createdAt">>) => {
      setCustomer((prev) => {
        if (!prev) return prev
        return { ...prev, ...updates }
      })
    },
    []
  )

  return (
    <CustomerContext.Provider
      value={{ customer, isLoading, login, logout, updateProfile }}
    >
      {children}
    </CustomerContext.Provider>
  )
}

export function useCustomer(): CustomerContextValue {
  const ctx = useContext(CustomerContext)
  if (!ctx) {
    throw new Error("useCustomer must be used within CustomerProvider")
  }
  return ctx
}
