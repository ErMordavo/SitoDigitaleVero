"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

// Dark-mode chromatic stops described in the brief.
// In light mode we keep a softer wash so the scroll still has a subtle gradient
// without becoming garish.
const DARK_STOPS = ["#0A0F1F", "#1A1A2E", "#2D1B36", "#0F172A", "#0A0F1F"]
const LIGHT_STOPS = ["#F9FAFB", "#F3F4F6", "#FBE9E2", "#EEE6FB", "#F9FAFB"]

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "")
  const num = parseInt(h, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

function lerpColor(a: string, b: string, t: number): string {
  const [ar, ag, ab] = hexToRgb(a)
  const [br, bg, bb] = hexToRgb(b)
  const r = Math.round(ar + (br - ar) * t)
  const g = Math.round(ag + (bg - ag) * t)
  const bl = Math.round(ab + (bb - ab) * t)
  return `rgb(${r}, ${g}, ${bl})`
}

function colorAt(stops: readonly string[], progress: number): string {
  const segs = stops.length - 1
  const pos = progress * segs
  const i = Math.min(segs - 1, Math.floor(pos))
  const t = pos - i
  return lerpColor(stops[i], stops[i + 1], t)
}

export function ScrollColorBackground() {
  const progress = useScrollProgress(0.18)

  const darkColor = colorAt(DARK_STOPS, progress)
  const lightColor = colorAt(LIGHT_STOPS, progress)

  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 hidden dark:block"
        style={{ backgroundColor: darkColor, transition: "background-color 200ms linear" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 block dark:hidden"
        style={{ backgroundColor: lightColor, transition: "background-color 200ms linear" }}
      />
      {/* Subtle vignette layer to add depth on top of the base color */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--primary) 8%, transparent) 0%, transparent 60%), radial-gradient(ellipse at bottom, color-mix(in oklab, var(--accent) 8%, transparent) 0%, transparent 60%)",
        }}
      />
    </>
  )
}
