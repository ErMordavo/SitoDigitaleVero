"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, Eye, ArrowLeft } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import confetti from "canvas-confetti"
import { cn } from "@/lib/utils"
import { DiscoveryZone } from "@/components/secret-garden/discovery-zone"

// Dynamic import for fog effect
const FogEffect = dynamic(
  () => import("@/components/secret-garden/fog-effect").then(mod => mod.FogEffect),
  { ssr: false }
)

const TOTAL_ZONES = 5

export default function SecretGardenPage() {
  const [discoveredZones, setDiscoveredZones] = useState<Set<number>>(new Set())
  const [hints, setHints] = useState<Record<number, string>>({})
  const [globalCount, setGlobalCount] = useState(0)
  const [introHint, setIntroHint] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [allDiscovered, setAllDiscovered] = useState(false)

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch global count
        const countRes = await fetch("/api/discoveries")
        const countData = await countRes.json()
        setGlobalCount(countData.totalDiscoveries || 0)

        // Fetch intro hint
        const hintRes = await fetch("/api/gemini/hint")
        const hintData = await hintRes.json()
        setIntroHint(hintData.hint)
      } catch (error) {
        console.error("Error fetching initial data:", error)
        setIntroHint("Nel silenzio digitale, il giardino attende chi sa cercare...")
      } finally {
        setIsLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Handle zone discovery
  const handleDiscover = useCallback(async (zoneId: number, hint: string) => {
    if (discoveredZones.has(zoneId)) return

    setDiscoveredZones(prev => new Set([...prev, zoneId]))
    setHints(prev => ({ ...prev, [zoneId]: hint }))

    // Save to database
    try {
      const res = await fetch("/api/discoveries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ zoneId, hintText: hint }),
      })
      const data = await res.json()
      setGlobalCount(data.totalDiscoveries || globalCount + 1)
    } catch (error) {
      console.error("Error saving discovery:", error)
    }

    // Check if all discovered
    const newDiscovered = new Set([...discoveredZones, zoneId])
    if (newDiscovered.size >= TOTAL_ZONES && !allDiscovered) {
      setAllDiscovered(true)
      // Celebration confetti
      confetti({
        particleCount: 200,
        spread: 120,
        origin: { y: 0.5, x: 0.5 },
        colors: ["#10b981", "#34d399", "#6ee7b7", "#a855f7"],
      })
    }
  }, [discoveredZones, globalCount, allDiscovered])

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden">
      {/* Fog Effect Background */}
      <FogEffect />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link
            href="/infinite-gallery"
            className="flex items-center gap-2 text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Torna alla Galleria</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-emerald-400/80">
              <Eye className="w-4 h-4" />
              <span className="text-sm font-mono">
                {discoveredZones.size}/{TOTAL_ZONES}
              </span>
            </div>
            
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-xs text-white/60">
                Scoperte globali:{" "}
                <span className="text-emerald-400 font-bold">{globalCount}</span>
              </span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Intro Hint */}
      <AnimatePresence>
        {!isLoading && introHint && discoveredZones.size === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ delay: 1 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center max-w-md px-4"
          >
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="text-lg text-emerald-400/90 italic font-serif"
            >
              &ldquo;{introHint}&rdquo;
            </motion.p>
            <p className="mt-4 text-white/40 text-sm">
              Muovi il mouse per esplorare...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Discovery Zones Grid */}
      <div className="fixed inset-0 grid grid-cols-3 grid-rows-2 gap-4 p-20">
        {Array.from({ length: TOTAL_ZONES }, (_, i) => (
          <DiscoveryZone
            key={i}
            zoneId={i + 1}
            isDiscovered={discoveredZones.has(i + 1)}
            hint={hints[i + 1]}
            onDiscover={handleDiscover}
          />
        ))}
      </div>

      {/* All Discovered Celebration */}
      <AnimatePresence>
        {allDiscovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className={cn(
                "text-center p-12 rounded-3xl max-w-lg mx-4",
                "bg-gradient-to-br from-emerald-900/50 to-purple-900/50",
                "border border-emerald-500/30 backdrop-blur-xl"
              )}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-emerald-500 to-purple-500 flex items-center justify-center"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Hai Trovato il Giardino Segreto!
              </h2>
              
              <p className="text-emerald-200/80 mb-8">
                Sei tra i {globalCount} esploratori che hanno scoperto tutti i misteri nascosti.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className={cn(
                    "px-6 py-3 rounded-full",
                    "bg-white/10 border border-white/20",
                    "text-white hover:bg-white/20 transition-colors"
                  )}
                >
                  Torna alla Home
                </Link>
                <button
                  onClick={() => {
                    setDiscoveredZones(new Set())
                    setHints({})
                    setAllDiscovered(false)
                  }}
                  className={cn(
                    "px-6 py-3 rounded-full",
                    "bg-gradient-to-r from-emerald-500 to-emerald-600",
                    "text-white font-medium hover:opacity-90 transition-opacity"
                  )}
                >
                  Esplora di Nuovo
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient glow spots */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -50, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -100, 50, 0],
            y: [0, 50, -100, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"
        />
      </div>
    </div>
  )
}
