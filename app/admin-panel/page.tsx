"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  LayoutDashboard, 
  Ticket, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle,
  XCircle,
  BarChart3,
  Menu,
  X,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { TicketModal } from "@/components/admin/ticket-modal"
import { TicketTable } from "@/components/admin/ticket-table"
import { StatsChart } from "@/components/admin/stats-chart"

export interface TicketType {
  id: string
  title: string
  email: string
  message: string
  status: "open" | "closed"
  createdAt: Date
}

const initialTickets: TicketType[] = [
  {
    id: "1",
    title: "Problema con il login",
    email: "utente1@example.com",
    message: "Non riesco ad accedere al mio account",
    status: "open",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    title: "Richiesta di funzionalità",
    email: "utente2@example.com",
    message: "Sarebbe utile avere un filtro per categoria",
    status: "open",
    createdAt: new Date("2024-01-16"),
  },
  {
    id: "3",
    title: "Bug nella galleria",
    email: "utente3@example.com",
    message: "Le immagini non si caricano correttamente",
    status: "closed",
    createdAt: new Date("2024-01-14"),
  },
  {
    id: "4",
    title: "Domanda sui prezzi",
    email: "utente4@example.com",
    message: "Vorrei informazioni sui piani premium",
    status: "open",
    createdAt: new Date("2024-01-17"),
  },
]

export default function AdminPanelPage() {
  const router = useRouter()
  const [tickets, setTickets] = useState<TicketType[]>(initialTickets)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingTicket, setEditingTicket] = useState<TicketType | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const openTickets = tickets.filter(t => t.status === "open").length
  const closedTickets = tickets.filter(t => t.status === "closed").length

  const handleCreateTicket = (data: { title: string; email: string; message: string }) => {
    const newTicket: TicketType = {
      id: Date.now().toString(),
      ...data,
      status: "open",
      createdAt: new Date(),
    }
    setTickets(prev => [newTicket, ...prev])
    setIsModalOpen(false)
  }

  const handleUpdateTicket = (data: { title: string; email: string; message: string }) => {
    if (!editingTicket) return
    setTickets(prev =>
      prev.map(t =>
        t.id === editingTicket.id ? { ...t, ...data } : t
      )
    )
    setEditingTicket(null)
    setIsModalOpen(false)
  }

  const handleToggleStatus = (id: string) => {
    setTickets(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, status: t.status === "open" ? "closed" : "open" }
          : t
      )
    )
  }

  const handleDelete = (id: string) => {
    setTickets(prev => prev.filter(t => t.id !== id))
    setDeleteConfirm(null)
  }

  const handleLogout = () => {
    document.cookie = "demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2">
                  <LayoutDashboard className="w-6 h-6 text-primary" />
                  <span className="font-display font-bold text-lg">Admin Panel</span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors md:hidden"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-2">
                <Link
                  href="/admin-panel"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl",
                    "bg-primary/10 text-primary font-medium"
                  )}
                >
                  <Ticket className="w-5 h-5" />
                  Ticket
                </Link>
                <Link
                  href="/dashboard-stats"
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-xl",
                    "text-muted-foreground hover:bg-muted hover:text-foreground",
                    "transition-colors"
                  )}
                >
                  <BarChart3 className="w-5 h-5" />
                  Statistiche
                </Link>
              </nav>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
              <button
                onClick={handleLogout}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 rounded-xl",
                  "text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                  "transition-colors"
                )}
              >
                <LogOut className="w-5 h-5" />
                Esci
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        sidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
              <h1 className="text-xl font-display font-bold">Gestione Ticket</h1>
            </div>

            <button
              onClick={() => {
                setEditingTicket(null)
                setIsModalOpen(true)
              }}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                "bg-primary text-primary-foreground",
                "hover:opacity-90 transition-opacity font-medium"
              )}
            >
              <Plus className="w-5 h-5" />
              <span className="hidden sm:inline">Nuovo Ticket</span>
            </button>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Ticket Totali</p>
                  <p className="text-3xl font-bold mt-1">{tickets.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10">
                  <Ticket className="w-6 h-6 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Aperti</p>
                  <p className="text-3xl font-bold mt-1 text-amber-500">{openTickets}</p>
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10">
                  <XCircle className="w-6 h-6 text-amber-500" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl bg-card border border-border"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chiusi</p>
                  <p className="text-3xl font-bold mt-1 text-emerald-500">{closedTickets}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 rounded-2xl bg-card border border-border mb-8"
          >
            <h3 className="text-lg font-semibold mb-4">Ticket per Stato</h3>
            <StatsChart openTickets={openTickets} closedTickets={closedTickets} />
          </motion.div>

          {/* Ticket Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-2xl bg-card border border-border overflow-hidden"
          >
            <TicketTable
              tickets={tickets}
              onEdit={(ticket) => {
                setEditingTicket(ticket)
                setIsModalOpen(true)
              }}
              onToggleStatus={handleToggleStatus}
              onDelete={(id) => setDeleteConfirm(id)}
            />
          </motion.div>
        </div>
      </main>

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingTicket(null)
        }}
        onSubmit={editingTicket ? handleUpdateTicket : handleCreateTicket}
        initialData={editingTicket}
      />

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-2xl p-6 max-w-sm w-full border border-border"
            >
              <h3 className="text-lg font-semibold mb-2">Conferma Eliminazione</h3>
              <p className="text-muted-foreground mb-6">
                Sei sicuro di voler eliminare questo ticket? L&apos;azione non può essere annullata.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-border hover:bg-muted transition-colors"
                >
                  Annulla
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground hover:opacity-90 transition-opacity"
                >
                  Elimina
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
