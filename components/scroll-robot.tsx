"use client"

import { useScrollProgress } from "@/hooks/use-scroll-progress"

/**
 * Robot that travels from top-right to bottom-left as the user scrolls,
 * morphing from a robot into a "robocat" via crossfaded keyframes.
 */

// Distribuzione uniforme dei frame da 0 a 1 (non oltre!)
const KEYFRAMES = [
  { src: "/frames/robogatto/frame_001.png", at: 0 },
  { src: "/frames/robogatto/frame_002.png", at: 0.07 },
  { src: "/frames/robogatto/frame_003.png", at: 0.10 },
  { src: "/frames/robogatto/frame_004.png", at: 0.13 },
  { src: "/frames/robogatto/frame_005.png", at: 0.16 },
  { src: "/frames/robogatto/frame_006.png", at: 0.2 },
  { src: "/frames/robogatto/frame_007.png", at: 0.23 },
  { src: "/frames/robogatto/frame_008.png", at: 0.26 },
  { src: "/frames/robogatto/frame_009.png", at: 0.3 },
  { src: "/frames/robogatto/frame_010.png", at: 0.27 },
  { src: "/frames/robogatto/frame_011.png", at: 0.33 },
  { src: "/frames/robogatto/frame_012.png", at: 0.36 },
  { src: "/frames/robogatto/frame_013.png", at: 0.4 },
  { src: "/frames/robogatto/frame_014.png", at: 0.43 },
  { src: "/frames/robogatto/frame_015.png", at: 0.47 },
  { src: "/frames/robogatto/frame_016.png", at: 0.53 },
  { src: "/frames/robogatto/frame_017.png", at: 0.6 },
  { src: "/frames/robogatto/frame_018.png", at: 0.64 },
  { src: "/frames/robogatto/frame_019.png", at: 0.67 },
  { src: "/frames/robogatto/frame_020.png", at: 0.7 },
  { src: "/frames/robogatto/frame_021.png", at: 0.73 },
  { src: "/frames/robogatto/frame_023.png", at: 0.8 },
  { src: "/frames/robogatto/frame_024.png", at: 0.83 },
  { src: "/frames/robogatto/frame_025.png", at: 0.87 },
  { src: "/frames/robogatto/frame_026.png", at: 0.9 },
  { src: "/frames/robogatto/frame_027.png", at: 0.93 },
  { src: "/frames/robogatto/frame_028.png", at: 0.98 },
  { src: "/frames/robogatto/frame_029.png", at: 1.1 },
  { src: "/frames/robogatto/frame_030.png", at: 1.2 },
  { src: "/frames/robogatto/frame_031.png", at: 1.3 },

] as const

const FADE_RADIUS = 0.12 // Ridotto drasticamente per transizioni nette

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

export function ScrollRobot() {
  const progress = useScrollProgress(0.14)

  // Path: top-right → bottom-left
  const topPct = 15 + 70 * progress
  const leftPct = 90 - 80 * progress

  // Subtle bobbing for liveliness
  const bob = Math.sin(progress * Math.PI * 4) * 6

  // Slight rotation that peaks at the midpoint
  const rotate = -8 + 16 * progress

  // L'alone glow si riduce e scompare completamente alla fine
  const glowOpacity = Math.max(0, 0.6 * (1 - progress * 1.2))

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="frame-layer absolute"
        style={{
          top: `${topPct}%`,
          left: `${leftPct}%`,
          width: "min(34vw, 380px)",
          aspectRatio: "1 / 1",
          transform: `translate(-50%, -50%) translateY(${bob}px) rotate(${rotate}deg)`,
          willChange: "transform, top, left",
        }}
      >
        {/* Soft glow halo - ora scompare alla fine */}
        <div
          className="absolute inset-[10%] rounded-full blur-3xl transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 40%, transparent) 0%, transparent 70%)",
            opacity: glowOpacity,
          }}
        />
        
        {KEYFRAMES.map((kf) => {
          const distance = Math.abs(progress - kf.at)
          const opacity = clamp01(1 - distance / FADE_RADIUS)
          return (
            <img
              key={kf.src}
              src={kf.src}
              alt=""
              draggable={false}
              className="frame-layer absolute inset-0 h-full w-full object-contain"
              style={{
                opacity,
                transition: "opacity 100ms linear",
                // Rimuovo il drop-shadow che creava ombra persistente
                filter: progress > 0.9 ? "none" : "drop-shadow(0 30px 40px color-mix(in oklab, var(--primary) 20%, transparent))",
              }}
            />
          )
        })}
      </div>
    </div>
  )
}