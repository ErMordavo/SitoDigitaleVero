"use client"

import { Eye, Download as DownloadIcon } from "lucide-react"

/**
 * OrdersTab - Displays customer order history in a table
 * 
 * Mock data structure (replace with API in production):
 * - id: Unique order identifier
 * - date: Order creation date
 * - total: Order total in EUR
 * - status: "completed" | "processing" | "pending" | "cancelled"
 * - items: Array of purchased items
 */

interface Order {
  id: string
  date: string
  total: number
  status: "completed" | "processing" | "pending" | "cancelled"
  items: string[]
}

// Mock orders data
const MOCK_ORDERS: Order[] = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    total: 149.99,
    status: "completed",
    items: ["Bot Telegram Pro", "Template E-commerce"],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    total: 79.99,
    status: "completed",
    items: ["AI Assistant Kit"],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-08",
    total: 29.99,
    status: "processing",
    items: ["Analytics Dashboard"],
  },
  {
    id: "ORD-2024-004",
    date: "2024-01-05",
    total: 199.99,
    status: "pending",
    items: ["Corso Next.js Avanzato"],
  },
  {
    id: "ORD-2024-005",
    date: "2024-01-01",
    total: 49.99,
    status: "cancelled",
    items: ["Game Asset Bundle"],
  },
]

const STATUS_STYLES: Record<Order["status"], { label: string; className: string }> = {
  completed: {
    label: "Completato",
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  processing: {
    label: "In elaborazione",
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  pending: {
    label: "In attesa",
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  cancelled: {
    label: "Annullato",
    className: "bg-red-500/10 text-red-600 dark:text-red-400",
  },
}

export function OrdersTab() {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">I Tuoi Ordini</h1>
        <p className="mt-1 text-muted-foreground">
          Visualizza lo storico dei tuoi acquisti su Toolnest.
        </p>
      </div>

      {/* Orders table */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  ID Ordine
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prodotti
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Totale
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Stato
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Azioni
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {MOCK_ORDERS.map((order) => {
                const statusStyle = STATUS_STYLES[order.status]
                return (
                  <tr key={order.id} className="transition-colors hover:bg-muted/30">
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="font-mono text-sm font-medium text-foreground">
                        {order.id}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-muted-foreground">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        {order.items.map((item, i) => (
                          <span key={i} className="text-sm text-foreground">
                            {item}
                            {i < order.items.length - 1 && ", "}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-foreground">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Visualizza dettagli"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        {order.status === "completed" && (
                          <button
                            className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                            title="Scarica"
                          >
                            <DownloadIcon className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination placeholder */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Mostrando {MOCK_ORDERS.length} ordini
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground disabled:opacity-50"
          >
            Precedente
          </button>
          <button
            disabled
            className="rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground disabled:opacity-50"
          >
            Successivo
          </button>
        </div>
      </div>
    </div>
  )
}