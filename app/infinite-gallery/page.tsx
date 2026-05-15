"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Leaf, Sparkles } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import confetti from "canvas-confetti"
import { GalleryCard } from "@/components/gallery/gallery-card"
import { cn } from "@/lib/utils"

// Dynamic import for particles to avoid SSR issues
const ParticlesEffect = dynamic(
  () => import("@/components/gallery/particles-effect").then(mod => mod.ParticlesEffect),
  { ssr: false }
)

// Generate gallery items with picsum images
const generateGalleryItems = (startIndex: number, count: number) => {
  const titles = [
    "Echi Digitali", "Sogni di Pixel", "Nebula Sintetica", "Orizzonti Virtuali",
    "Frammenti di Luce", "Codice Poetico", "Memorie Liquide", "Vortici Astratti",
    "Risonanze Quantiche", "Geometrie dell'Anima", "Onde Binarie", "Silenzi Luminosi",
    "Cristalli di Tempo", "Aurora Algoritmica", "Pulsazioni Cosmiche", "Labirinti Eterei",
    "Tessiture Invisibili", "Frequenze Nascoste", "Fiori di Dati", "Cascate Stellari",
    "Riflessi Paralleli", "Spirali Infinite", "Maree Digitali", "Echi del Futuro",
    "Portali Dimensionali", "Danze Elettroniche", "Sussurri Virtuali", "Arcobaleni Binari",
    "Tempeste di Bit", "Oasi Sintetiche"
  ]

  const descriptions = [
    "Un viaggio attraverso il tessuto della realtà digitale",
    "Dove i sogni incontrano il codice in una danza eterna",
    "Frammenti di universi paralleli intrecciati insieme",
    "La bellezza nascosta negli spazi tra i pixel",
    "Un momento catturato nell'eternità del cyberspazio",
  ]

  return Array.from({ length: count }, (_, i) => {
    const index = startIndex + i
    return {
      id: index,
      imageUrl: `https://picsum.photos/seed/${index + 100}/600/400`,
      title: titles[index % titles.length],
      description: descriptions[index % descriptions.length],
    }
  })
}

export default function InfiniteGalleryPage() {
  const [items, setItems] = useState(() => generateGalleryItems(0, 10))
  const [loading, setLoading] = useState(false)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [showSecret, setShowSecret] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    if (loading || items.length >= 50) return
    
    setLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      const newItems = generateGalleryItems(items.length, 10)
      setItems(prev => [...prev, ...newItems])
      setLoading(false)
      
      // Trigger confetti when reaching "the end"
      if (items.length >= 40 && !reachedEnd) {
        setReachedEnd(true)
        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#ff6b4a", "#a855f7", "#3b82f6"],
        })
      }
    }, 800)
  }, [loading, items.length, reachedEnd])

  // Intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [loadMore])

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-background via-background/95 to-background relative overflow-hidden"
    >
      {/* Particles Background */}
      <ParticlesEffect />
      
      {/* Secret Garden Link */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Link href="/secret-garden">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setShowSecret(true)}
            onHoverEnd={() => setShowSecret(false)}
            className="relative p-4 rounded-full bg-gradient-to-br from-emerald-500/20 to-purple-500/20 backdrop-blur-lg border border-white/10 shadow-2xl group"
          >
            <Leaf className="w-6 h-6 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl"
            />
          </motion.button>
        </Link>
        
        <AnimatePresence>
          {showSecret && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              className="absolute right-full mr-4 top-1/2 -translate-y-1/2 whitespace-nowrap"
            >
              <span className="px-3 py-2 rounded-lg bg-card/80 backdrop-blur-lg border border-white/10 text-sm text-emerald-400 font-medium">
                Scopri il Giardino Segreto
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/5"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Infinite Gallery
              </span>
            </Link>
            
            <div className="text-sm text-muted-foreground">
              {items.length} opere esplorate
            </div>
          </div>
        </div>
      </motion.header>

      {/* Gallery Grid */}
      <main className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {items.map((item, index) => (
            <GalleryCard
              key={item.id}
              item={item}
              index={index}
            />
          ))}
        </motion.div>

        {/* Loader */}
        <div ref={loaderRef} className="py-12 flex justify-center">
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
              />
              <span className="text-muted-foreground">Caricamento...</span>
            </motion.div>
          )}
        </div>

        {/* Secret Unlocked Message */}
        <AnimatePresence>
          {reachedEnd && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                    "0 0 40px rgba(168, 85, 247, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.3)"
                  ]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                className={cn(
                  "inline-block px-8 py-6 rounded-2xl",
                  "bg-gradient-to-br from-accent/20 to-primary/20",
                  "border border-accent/30 backdrop-blur-lg"
                )}
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                  Segreto Sbloccato!
                </h3>
                <p className="text-muted-foreground mb-4">
                  Hai esplorato l&apos;infinito. Ma c&apos;e di piu...
                </p>
                <Link
                  href="/secret-garden"
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full",
                    "bg-gradient-to-r from-emerald-500 to-emerald-600",
                    "text-white font-medium hover:opacity-90 transition-opacity"
                  )}
                >
                  <Leaf className="w-5 h-5" />
                  Entra nel Giardino Segreto
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
