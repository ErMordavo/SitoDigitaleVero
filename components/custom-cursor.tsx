"use client"

import { useEffect, useRef, useState } from "react"

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    // Disable on touch / coarse pointer devices
    const mq = window.matchMedia("(pointer: coarse)")
    if (mq.matches) {
      setTouch(true)
      document.documentElement.style.cursor = "auto"
      return
    }

    const target = { x: -100, y: -100 }
    const current = { x: -100, y: -100 }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      const el = e.target as HTMLElement | null
      const interactive = !!el?.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-cursor='hover']",
      )
      setHovering(interactive)
    }
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    const tick = () => {
      current.x += (target.x - current.x) * 0.25
      current.y += (target.y - current.y) * 0.25
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    window.addEventListener("mousemove", onMove)
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
    }
  }, [])

  if (touch) return null

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] mix-blend-difference"
      style={{
        width: hovering ? 56 : 24,
        height: hovering ? 56 : 24,
        borderRadius: 9999,
        border: "1.5px solid rgba(255,255,255,0.95)",
        background: hovering
          ? "color-mix(in oklab, #ff6b4a 40%, transparent)"
          : "color-mix(in oklab, #ff6b4a 65%, transparent)",
        backdropFilter: "blur(6px)",
        opacity: visible ? 1 : 0,
        transition:
          "width 0.18s ease, height 0.18s ease, background 0.18s ease, opacity 0.2s",
      }}
    />
  )
}
