"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Eye,
  Ticket,
  TrendingUp,
  RefreshCw,
  Download,
  LayoutDashboard,
  BarChart3,
  LogOut,
  Menu,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

// Mock data for last 7 days
const generateVisitsData = () => {
  const days = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
  return days.map((day, i) => ({
    name: day,
    visits: Math.floor(Math.random() * 500) + 200,
    unique: Math.floor(Math.random() * 300) + 100,
  }))
}

export default function DashboardStatsPage() {
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [visitsData, setVisitsData] = useState(generateVisitsData)
  const [globalDiscoveries, setGlobalDiscoveries] = useState(0)

  // Fetch global discoveries count
  useEffect(() => {
    const fetchDiscoveries = async () => {
      try {
        const res = await fetch("/api/discoveries")
        const data = await res.json()
        setGlobalDiscoveries(data.totalDiscoveries || 0)
      } catch (error) {
        console.error("Error fetching discoveries:", error)
      }
    }
    fetchDiscoveries()
  }, [])

  const stats = [
    {
      label: "Visitatori Oggi",
      value: "1,234",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      label: "Scoperte Totali",
      value: globalDiscoveries.toString(),
      change: "+8.2%",
      trend: "up",
      icon: Eye,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      label: "Ticket Aperti",
      value: "23",
      change: "-3.1%",
      trend: "down",
      icon: Ticket,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      label: "Tasso Conversione",
      value: "4.8%",
      change: "+2.4%",
      trend: "up",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ]

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setVisitsData(generateVisitsData())
    setIsRefreshing(false)
    toast.success("Dati aggiornati con successo!")
  }

  const handleExport = () => {
    toast.info("Funzionalità di esportazione in sviluppo")
  }

  const handleLogout = () => {
    document.cookie = "demo_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      {sidebarOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border z-50"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <Link href="/" className="flex items-center gap-2">
                <LayoutDashboard className="w-6 h-6 text-primary" />
                <span className="font-display font-bold text-lg">Dashboard</span>
              </Link>
            </div>

            <nav className="space-y-2">
              <Link
                href="/admin-panel"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl",
                  "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "transition-colors"
                )}
              >
                <Ticket className="w-5 h-5" />
                Ticket
              </Link>
              <Link
                href="/dashboard-stats"
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl",
                  "bg-primary/10 text-primary font-medium"
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

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? "md:ml-64" : "ml-0"
        )}
      >
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
              <h1 className="text-xl font-display font-bold">Statistiche</h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                  "border border-border hover:bg-muted",
                  "transition-colors disabled:opacity-50"
                )}
              >
                <RefreshCw
                  className={cn("w-4 h-4", isRefreshing && "animate-spin")}
                />
                <span className="hidden sm:inline">Aggiorna</span>
              </button>
              <button
                onClick={handleExport}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl",
                  "bg-primary text-primary-foreground",
                  "hover:opacity-90 transition-opacity"
                )}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Esporta</span>
              </button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={cn("p-3 rounded-xl", stat.bgColor)}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1 text-sm font-medium",
                      stat.trend === "up" ? "text-emerald-500" : "text-red-500"
                    )}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 rounded-2xl bg-card border border-border"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Visite Settimanali</h3>
                <p className="text-sm text-muted-foreground">
                  Ultimi 7 giorni
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-muted-foreground">Visite totali</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-accent" />
                  <span className="text-muted-foreground">Visitatori unici</span>
                </div>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitsData}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ff6b4a" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ff6b4a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorUnique" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.1)"
                  />
                  <XAxis
                    dataKey="name"
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: "rgba(255,255,255,0.5)" }}
                  />
                  <YAxis
                    stroke="rgba(255,255,255,0.5)"
                    tick={{ fill: "rgba(255,255,255,0.5)" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.75rem",
                    }}
                    labelStyle={{ color: "hsl(var(--foreground))" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#ff6b4a"
                    fillOpacity={1}
                    fill="url(#colorVisits)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="unique"
                    stroke="#a855f7"
                    fillOpacity={1}
                    fill="url(#colorUnique)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <Link
              href="/infinite-gallery"
              className={cn(
                "p-6 rounded-2xl bg-card border border-border",
                "hover:border-primary/50 transition-colors group"
              )}
            >
              <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                Galleria Infinita
              </h4>
              <p className="text-sm text-muted-foreground">
                Esplora la collezione digitale
              </p>
            </Link>
            <Link
              href="/secret-garden"
              className={cn(
                "p-6 rounded-2xl bg-card border border-border",
                "hover:border-emerald-500/50 transition-colors group"
              )}
            >
              <h4 className="font-semibold mb-2 group-hover:text-emerald-500 transition-colors">
                Giardino Segreto
              </h4>
              <p className="text-sm text-muted-foreground">
                Scopri i misteri nascosti
              </p>
            </Link>
            <Link
              href="/"
              className={cn(
                "p-6 rounded-2xl bg-card border border-border",
                "hover:border-accent/50 transition-colors group"
              )}
            >
              <h4 className="font-semibold mb-2 group-hover:text-accent transition-colors">
                Torna alla Home
              </h4>
              <p className="text-sm text-muted-foreground">
                Visita la pagina principale
              </p>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
