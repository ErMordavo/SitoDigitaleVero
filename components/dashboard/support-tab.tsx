"use client"

import { useState } from "react"
import { Plus, MessageSquare, Clock, CheckCircle, AlertCircle, X } from "lucide-react"

/**
 * SupportTab - Support ticket system
 * 
 * Features:
 * - View open/closed tickets
 * - Create new ticket via modal
 * - Mock data (replace with API in production)
 */

interface Ticket {
  id: string
  subject: string
  message: string
  status: "open" | "in_progress" | "resolved" | "closed"
  createdAt: string
  updatedAt: string
}

// Mock tickets data
const INITIAL_TICKETS: Ticket[] = [
  {
    id: "TKT-001",
    subject: "Problema con il download del Bot Telegram",
    message: "Non riesco a scaricare il file, ricevo un errore 404.",
    status: "open",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "TKT-002",
    subject: "Richiesta fattura",
    message: "Vorrei ricevere la fattura per l'ordine ORD-2024-001.",
    status: "in_progress",
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
  },
  {
    id: "TKT-003",
    subject: "Bug nel template e-commerce",
    message: "Ho trovato un bug nella pagina del carrello, il totale non si aggiorna.",
    status: "resolved",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
]

const STATUS_CONFIG: Record<
  Ticket["status"],
  { label: string; icon: React.ReactNode; className: string }
> = {
  open: {
    label: "Aperto",
    icon: <AlertCircle className="h-4 w-4" />,
    className: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
  },
  in_progress: {
    label: "In Lavorazione",
    icon: <Clock className="h-4 w-4" />,
    className: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  },
  resolved: {
    label: "Risolto",
    icon: <CheckCircle className="h-4 w-4" />,
    className: "bg-green-500/10 text-green-600 dark:text-green-400",
  },
  closed: {
    label: "Chiuso",
    icon: <CheckCircle className="h-4 w-4" />,
    className: "bg-gray-500/10 text-gray-600 dark:text-gray-400",
  },
}

export function SupportTab() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newTicket, setNewTicket] = useState({ subject: "", message: "" })

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTicket.subject.trim() || !newTicket.message.trim()) return

    const ticket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, "0")}`,
      subject: newTicket.subject,
      message: newTicket.message,
      status: "open",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    setTickets((prev) => [ticket, ...prev])
    setNewTicket({ subject: "", message: "" })
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Supporto</h1>
          <p className="mt-1 text-muted-foreground">
            Gestisci i tuoi ticket di assistenza.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          Nuovo Ticket
        </button>
      </div>

      {/* Tickets list */}
      <div className="space-y-4">
        {tickets.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/50" />
            <h3 className="mt-4 font-medium text-foreground">Nessun ticket</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Non hai ancora aperto nessun ticket di supporto.
            </p>
          </div>
        ) : (
          tickets.map((ticket) => {
            const statusConfig = STATUS_CONFIG[ticket.status]
            return (
              <div
                key={ticket.id}
                className="rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs text-muted-foreground">
                        {ticket.id}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusConfig.className}`}
                      >
                        {statusConfig.icon}
                        {statusConfig.label}
                      </span>
                    </div>
                    <h3 className="mt-2 font-medium text-foreground">
                      {ticket.subject}
                    </h3>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {ticket.message}
                    </p>
                  </div>
                  <button className="shrink-0 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
                    Visualizza
                  </button>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-xs text-muted-foreground">
                  <span>Creato: {formatDate(ticket.createdAt)}</span>
                  <span>Aggiornato: {formatDate(ticket.updatedAt)}</span>
                </div>
              </div>
            )
          })
        )}
      </div>

      {/* New ticket modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-card p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-foreground">
                Nuovo Ticket
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground"
                >
                  Oggetto
                </label>
                <input
                  type="text"
                  id="subject"
                  value={newTicket.subject}
                  onChange={(e) =>
                    setNewTicket((prev) => ({ ...prev, subject: e.target.value }))
                  }
                  className="mt-1 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Descrivi brevemente il problema"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground"
                >
                  Messaggio
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={newTicket.message}
                  onChange={(e) =>
                    setNewTicket((prev) => ({ ...prev, message: e.target.value }))
                  }
                  className="mt-1 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Descrivi il problema in dettaglio..."
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Invia Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}