"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

const KEYFRAMES = [
  { src: "/frames/puzzle/frame_001.png", at: 0 },
  { src: "/frames/puzzle/frame_002.png", at: 0.05 },
  { src: "/frames/puzzle/frame_003.png", at: 0.10 },
  { src: "/frames/puzzle/frame_004.png", at: 0.15 },
  { src: "/frames/puzzle/frame_005.png", at: 0.20 },
  { src: "/frames/puzzle/frame_006.png", at: 0.25 },
  { src: "/frames/puzzle/frame_007.png", at: 0.30 },
  { src: "/frames/puzzle/frame_008.png", at: 0.35 },
  { src: "/frames/puzzle/frame_009.png", at: 0.40 },
  { src: "/frames/puzzle/frame_010.png", at: 0.45 },
  { src: "/frames/puzzle/frame_011.png", at: 0.50 },
  { src: "/frames/puzzle/frame_012.png", at: 0.55 },
  { src: "/frames/puzzle/frame_013.png", at: 0.60 },
  { src: "/frames/puzzle/frame_014.png", at: 0.65 },
  { src: "/frames/puzzle/frame_015.png", at: 0.70 },
  { src: "/frames/puzzle/frame_016.png", at: 0.75 },
  { src: "/frames/puzzle/frame_017.png", at: 0.80 },
  { src: "/frames/puzzle/frame_018.png", at: 0.85 },
  { src: "/frames/puzzle/frame_019.png", at: 0.90 },
  { src: "/frames/puzzle/frame_020.png", at: 0.95 },
  { src: "/frames/puzzle/frame_021.png", at: 1.00 },
] as const

const FADE_RADIUS = 0.08
const FREEZE_AT_PROGRESS = 0.55 // Corrisponde al frame_018

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

export function PuzzleTech() {
  const progress = useScrollProgress(0.1)

  // Posizione VERTICALE: si blocca dopo il frame_018
  const rawTop = 10 + progress * 75 // 10% -> 85%
  const top = progress >= FREEZE_AT_PROGRESS 
    ? 10 + FREEZE_AT_PROGRESS * 75  // Congela al valore del frame_018
    : rawTop
  
  // Posizione ORIZZONTALE fissa a sinistra
  const left = 8 // 8% dal bordo sinistro
  
  // Rotazione: si blocca anch'essa
  const rawRotation = -10 + progress * 10
  const rotation = progress >= FREEZE_AT_PROGRESS
    ? -10 + FREEZE_AT_PROGRESS * 10
    : rawRotation
  
  // Scala: continua a cambiare anche dopo il congelamento (o bloccala se preferisci)
  const scaleFactor = 1 + 0.2 * Math.sin(progress * Math.PI)

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: "min(34vw, 380px)",
          aspectRatio: "1 / 1",
          transform: `rotate(${rotation}deg) scale(${scaleFactor})`,
          willChange: "transform, top",
        }}
      >
        {/* Glow/alone morbido */}
        <div
          className="absolute inset-[10%] rounded-full blur-3xl transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, #a855f7 40%, transparent) 0%, transparent 70%)",
            opacity: 0.4 * (1 - Math.min(progress, FREEZE_AT_PROGRESS) * 0.8),
          }}
        />

        {/* Frame images con crossfade */}
        {KEYFRAMES.map((kf) => {
          const distance = Math.abs(progress - kf.at)
          const opacity = clamp01(1 - distance / FADE_RADIUS)
          return (
            <img
              key={kf.src}
              src={kf.src}
              alt=""
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain"
              style={{
                opacity,
                transition: "opacity 100ms linear",
                filter: `drop-shadow(0 30px 40px color-mix(in oklab, #a855f7 20%, transparent))`,
              }}
            />
          )
        })}
      </div>
    </div>
  )
}