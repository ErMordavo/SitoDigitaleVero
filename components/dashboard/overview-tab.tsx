"use client"

import { Package, Download, Ticket, Clock } from "lucide-react"
import { useCustomer } from "@/context/customer-context"

/**
 * OverviewTab - Dashboard homepage with welcome message and statistics
 * 
 * Mock data structure (replace with API calls in production):
 * - productsCount: Number of purchased products
 * - ticketsCount: Number of open support tickets
 * - lastOrder: Date of most recent order
 */

// Mock statistics data
const MOCK_STATS = {
  productsCount: 12,
  ticketsCount: 2,
  lastOrder: "2024-01-15",
  downloadsAvailable: 8,
}

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold text-foreground">{value}</p>
        </div>
        <div
          className="grid h-12 w-12 place-items-center rounded-xl"
          style={{ backgroundColor: `${color}20`, color }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

export function OverviewTab() {
  const { customer } = useCustomer()

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          Bentornato, {customer?.name || "Utente"}!
        </h1>
        <p className="mt-1 text-muted-foreground">
          Ecco un riepilogo della tua attività su Toolnest.
        </p>
      </div>

      {/* Statistics grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Package className="h-6 w-6" />}
          label="Prodotti Acquistati"
          value={MOCK_STATS.productsCount}
          color="#ff6b4a"
        />
        <StatCard
          icon={<Download className="h-6 w-6" />}
          label="Download Disponibili"
          value={MOCK_STATS.downloadsAvailable}
          color="#22c55e"
        />
        <StatCard
          icon={<Ticket className="h-6 w-6" />}
          label="Ticket Aperti"
          value={MOCK_STATS.ticketsCount}
          color="#a855f7"
        />
        <StatCard
          icon={<Clock className="h-6 w-6" />}
          label="Ultimo Ordine"
          value={formatDate(MOCK_STATS.lastOrder)}
          color="#3b82f6"
        />
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Azioni Rapide
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <button className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
            Visualizza Ordini
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
            Scarica Prodotti
          </button>
          <button className="rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
            Apri Ticket
          </button>
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="font-display text-lg font-semibold text-foreground">
          Attività Recente
        </h2>
        <ul className="mt-4 space-y-3">
          {[
            { action: "Hai scaricato", item: "Bot Telegram Pro", time: "2 ore fa" },
            { action: "Hai acquistato", item: "Template E-commerce", time: "1 giorno fa" },
            { action: "Ticket risolto", item: "#1234 - Problema download", time: "3 giorni fa" },
          ].map((activity, i) => (
            <li
              key={i}
              className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
            >
              <span className="text-sm text-foreground">
                {activity.action}{" "}
                <span className="font-medium text-primary">{activity.item}</span>
              </span>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}