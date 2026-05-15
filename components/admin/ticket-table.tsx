"use client"

import { Edit3, Trash2, CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TicketType } from "@/app/admin-panel/page"

interface TicketTableProps {
  tickets: TicketType[]
  onEdit: (ticket: TicketType) => void
  onToggleStatus: (id: string) => void
  onDelete: (id: string) => void
}

export function TicketTable({ tickets, onEdit, onToggleStatus, onDelete }: TicketTableProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(date)
  }

  if (tickets.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-muted-foreground">Nessun ticket presente</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">ID</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Titolo</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground hidden md:table-cell">Email</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Stato</th>
            <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground hidden sm:table-cell">Data</th>
            <th className="text-right px-6 py-4 text-sm font-medium text-muted-foreground">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, index) => (
            <tr
              key={ticket.id}
              className={cn(
                "border-b border-border last:border-0",
                "hover:bg-muted/50 transition-colors"
              )}
            >
              <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                #{ticket.id.slice(-4)}
              </td>
              <td className="px-6 py-4">
                <div>
                  <p className="font-medium">{ticket.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-1 md:hidden">
                    {ticket.email}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell">
                {ticket.email}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onToggleStatus(ticket.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium",
                    "transition-colors",
                    ticket.status === "open"
                      ? "bg-amber-500/10 text-amber-500 hover:bg-amber-500/20"
                      : "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                  )}
                >
                  {ticket.status === "open" ? (
                    <>
                      <XCircle className="w-3.5 h-3.5" />
                      Aperto
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-3.5 h-3.5" />
                      Chiuso
                    </>
                  )}
                </button>
              </td>
              <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                {formatDate(ticket.createdAt)}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => onEdit(ticket)}
                    className={cn(
                      "p-2 rounded-lg",
                      "text-muted-foreground hover:text-foreground",
                      "hover:bg-muted transition-colors"
                    )}
                    title="Modifica"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDelete(ticket.id)}
                    className={cn(
                      "p-2 rounded-lg",
                      "text-muted-foreground hover:text-destructive",
                      "hover:bg-destructive/10 transition-colors"
                    )}
                    title="Elimina"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
