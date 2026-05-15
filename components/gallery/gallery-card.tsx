"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface GalleryItem {
  id: number
  imageUrl: string
  title: string
  description: string
}

interface GalleryCardProps {
  item: GalleryItem
  index: number
}

export function GalleryCard({ item, index }: GalleryCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: (e.clientX - rect.left - rect.width / 2) / 10,
      y: (e.clientY - rect.top - rect.height / 2) / 10,
    })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: (index % 10) * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      style={{
        transform: isHovered 
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg)`
          : "perspective(1000px) rotateX(0) rotateY(0)",
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-card border border-white/5",
        "transition-all duration-300 ease-out",
        "hover:shadow-2xl hover:shadow-primary/20",
        "cursor-pointer"
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[3/2] overflow-hidden">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-muted/50 animate-pulse" />
        )}
        
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className={cn(
            "object-cover transition-all duration-500",
            isHovered ? "scale-110" : "scale-100",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Glitch Effect on Hover */}
        {isHovered && (
          <>
            <motion.div
              animate={{
                x: [0, -5, 5, -3, 3, 0],
                opacity: [0, 0.5, 0.5, 0.5, 0.5, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1 }}
              className="absolute inset-0 bg-red-500/30 mix-blend-multiply pointer-events-none"
              style={{ transform: "translateX(3px)" }}
            />
            <motion.div
              animate={{
                x: [0, 5, -5, 3, -3, 0],
                opacity: [0, 0.5, 0.5, 0.5, 0.5, 0],
              }}
              transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 1, delay: 0.1 }}
              className="absolute inset-0 bg-cyan-500/30 mix-blend-multiply pointer-events-none"
              style={{ transform: "translateX(-3px)" }}
            />
          </>
        )}

        {/* Gradient Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent",
            "opacity-80 transition-opacity duration-300",
            isHovered && "opacity-100"
          )}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="p-5 relative"
        animate={{ y: isHovered ? -5 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className={cn(
          "text-lg font-display font-bold mb-2",
          "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
          "group-hover:from-primary group-hover:to-accent",
          "transition-all duration-300"
        )}>
          {item.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {/* Animated underline */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-5 right-5 h-0.5 bg-gradient-to-r from-primary to-accent origin-left"
        />
      </motion.div>

      {/* Corner accent */}
      <div className={cn(
        "absolute top-3 right-3 w-8 h-8 rounded-full",
        "bg-gradient-to-br from-primary/20 to-accent/20",
        "backdrop-blur-sm border border-white/10",
        "flex items-center justify-center",
        "opacity-0 group-hover:opacity-100",
        "transition-opacity duration-300"
      )}>
        <span className="text-xs font-bold text-primary">
          {item.id + 1}
        </span>
      </div>
    </motion.div>
  )
}
