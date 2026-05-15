"use client"

import Link from "next/link"
import { Crown, LayoutDashboard, Package, Download, User, HelpCircle, LogOut } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

export type DashboardTab = "overview" | "orders" | "downloads" | "profile" | "support"

interface SidebarProps {
  activeTab: DashboardTab
  onTabChange: (tab: DashboardTab) => void
}

const MENU_ITEMS: { id: DashboardTab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Panoramica", icon: <LayoutDashboard className="h-5 w-5" /> },
  { id: "orders", label: "Ordini", icon: <Package className="h-5 w-5" /> },
  { id: "downloads", label: "Download", icon: <Download className="h-5 w-5" /> },
  { id: "profile", label: "Profilo", icon: <User className="h-5 w-5" /> },
  { id: "support", label: "Supporto", icon: <HelpCircle className="h-5 w-5" /> },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { customer, logout } = useCustomer()

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card/50">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-border px-6">
        <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
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
      </div>

      {/* User info */}
      {customer && (
        <div className="border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <div
              className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold text-white"
              style={{
                background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
              }}
            >
              {customer.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {customer.name}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {customer.email}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
              activeTab === item.id
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Logout button */}
      <div className="border-t border-border p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
        >
          <LogOut className="h-5 w-5" />
          Esci
        </button>
      </div>
    </aside>
  )
}
