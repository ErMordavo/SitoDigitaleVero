"use client"

import { useEffect, useRef, useState } from "react"

/**
 * Tracks vertical scroll progress as a value in [0, 1] using
 * requestAnimationFrame for smooth, throttled updates.
 */
export function useScrollProgress(smoothing = 0.12) {
  const [progress, setProgress] = useState(0)
  const targetRef = useRef(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const computeTarget = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const p = max > 0 ? window.scrollY / max : 0
      targetRef.current = Math.min(1, Math.max(0, p))
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    const tick = () => {
      setProgress((curr) => {
        const next = curr + (targetRef.current - curr) * smoothing
        if (Math.abs(targetRef.current - next) < 0.0005) {
          rafRef.current = null
          return targetRef.current
        }
        rafRef.current = requestAnimationFrame(tick)
        return next
      })
    }

    computeTarget()
    window.addEventListener("scroll", computeTarget, { passive: true })
    window.addEventListener("resize", computeTarget)
    return () => {
      window.removeEventListener("scroll", computeTarget)
      window.removeEventListener("resize", computeTarget)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [smoothing])

  return progress
}
