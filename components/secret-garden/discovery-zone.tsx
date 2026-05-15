"use client"

import { useState, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface DiscoveryZoneProps {
  zoneId: number
  isDiscovered: boolean
  hint?: string
  onDiscover: (zoneId: number, hint: string) => void
}

export function DiscoveryZone({ zoneId, isDiscovered, hint, onDiscover }: DiscoveryZoneProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hoverProgress, setHoverProgress] = useState(0)
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (isDiscovered || isLoading) return
    setIsHovering(true)
    
    // Start progress animation
    const startTime = Date.now()
    const duration = 1500 // 1.5 seconds to discover
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      setHoverProgress(progress)
      
      if (progress >= 1) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current)
      }
    }, 16)
    
    // Trigger discovery after hovering long enough
    hoverTimerRef.current = setTimeout(async () => {
      setIsLoading(true)
      try {
        const res = await fetch(`/api/gemini/hint?zoneId=${zoneId}`)
        const data = await res.json()
        onDiscover(zoneId, data.hint || "Un mistero si svela...")
      } catch {
        onDiscover(zoneId, "La luce rivela ciò che era nascosto...")
      } finally {
        setIsLoading(false)
      }
    }, duration)
  }, [zoneId, isDiscovered, isLoading, onDiscover])

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false)
    setHoverProgress(0)
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
  }, [])

  const zoneIcons = ["", "", "", "", ""]
  const zonePositions = [
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
    "col-span-1 row-span-2",
    "col-span-1 row-span-1",
    "col-span-1 row-span-1",
  ]

  return (
    <motion.div
      className={cn(
        "relative rounded-2xl transition-all duration-500",
        zonePositions[zoneId - 1] || "",
        isDiscovered
          ? "bg-gradient-to-br from-emerald-900/20 to-emerald-800/10 border border-emerald-500/30"
          : "bg-white/[0.02] border border-transparent hover:border-white/10",
        "cursor-pointer overflow-hidden"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: isDiscovered ? 1 : 1.02 }}
    >
      {/* Hover reveal effect */}
      <AnimatePresence>
        {isHovering && !isDiscovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"
          />
        )}
      </AnimatePresence>

      {/* Progress ring */}
      {isHovering && !isDiscovered && (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-20 h-20 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="rgba(16, 185, 129, 0.2)"
              strokeWidth="4"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={251.2}
              strokeDashoffset={251.2 * (1 - hoverProgress)}
            />
          </svg>
          {isLoading && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="absolute w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full"
            />
          )}
        </div>
      )}

      {/* Discovered content */}
      <AnimatePresence>
        {isDiscovered && hint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 flex items-center justify-center mb-4"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center text-emerald-200/90 text-sm italic leading-relaxed"
            >
              &ldquo;{hint}&rdquo;
            </motion.p>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-3 text-xs text-emerald-400/60"
            >
              Zona {zoneId}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zone number indicator when not discovered */}
      {!isDiscovered && !isHovering && (
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-6xl font-bold text-white">{zoneId}</span>
        </div>
      )}
    </motion.div>
  )
}
