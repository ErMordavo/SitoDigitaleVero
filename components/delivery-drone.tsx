"use client"

import { useState, useEffect } from "react"
import { useScrollProgress } from "@/hooks/use-scroll-progress"

/**
 * DeliveryDrone Animation
 * - Start (0%): left 85%, top 15%, drone with attached package
 * - End (100%): left 10%, top 80%, package dropped at ground (left 10%, top 85%)
 * - Drone trajectory: diagonal with sinusoidal oscillation (top varies +-15px)
 * - Package release: when progress > 0.8, package detaches and falls linearly
 */

export function DeliveryDrone() {
  const progress = useScrollProgress(0.1)
  const [windowHeight, setWindowHeight] = useState(1000)

  useEffect(() => {
    setWindowHeight(window.innerHeight)
    const handleResize = () => setWindowHeight(window.innerHeight)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Drone position calculations
  const droneLeft = 85 - progress * 75 // 85% -> 10%
  const droneBaseTop = 15 + progress * 65 // 15% -> 80%
  const oscillation = Math.sin(progress * Math.PI * 6) * 15 // +-15px oscillation
  const droneTop = droneBaseTop + oscillation / windowHeight * 100

  // Package calculations
  const packageAttached = progress <= 0.8
  const packageProgress = packageAttached ? 0 : (progress - 0.8) / 0.2 // 0 to 1 after release

  // Package position: follows drone until release, then falls to ground
  const packageLeft = packageAttached ? droneLeft : 85 - 0.8 * 75 // Stays at release point
  const packageTop = packageAttached
    ? droneTop + 4 // Attached below drone
    : 15 + 0.8 * 65 + packageProgress * 20 // Falls from release point to ground (85%)

  // Drone rotor animation
  const rotorSpeed = 2 + progress * 3 // Faster rotation as it moves

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      {/* Drone */}
      <div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${droneLeft}%`,
          top: `${droneTop}%`,
          transition: "left 0.05s ease-out, top 0.05s ease-out",
        }}
      >
        <div className="relative">
          {/* Drone body */}
          <div
            className="relative h-12 w-16 rounded-lg shadow-xl"
            style={{
              background: "linear-gradient(180deg, #374151 0%, #1f2937 100%)",
            }}
          >
            {/* Camera/sensor */}
            <div className="absolute bottom-0 left-1/2 h-3 w-4 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500 shadow-lg">
              <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300" />
            </div>

            {/* LED indicators */}
            <div className="absolute left-1 top-1 h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
            <div className="absolute right-1 top-1 h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
          </div>

          {/* Arms and rotors */}
          {[
            { x: -20, y: -8 },
            { x: 20, y: -8 },
            { x: -20, y: 8 },
            { x: 20, y: 8 },
          ].map((pos, i) => (
            <div
              key={i}
              className="absolute left-1/2 top-1/2"
              style={{
                transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
              }}
            >
              {/* Arm */}
              <div
                className="absolute h-1 w-5 rounded-full bg-gray-600"
                style={{
                  transform: `rotate(${pos.x > 0 ? (pos.y > 0 ? 45 : -45) : pos.y > 0 ? -45 : 45}deg)`,
                }}
              />
              {/* Rotor */}
              <div
                className="h-8 w-8 rounded-full border-2 border-gray-400/50"
                style={{
                  animation: `spin ${0.3 / rotorSpeed}s linear infinite`,
                }}
              >
                <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gray-400" />
                <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-400" />
              </div>
            </div>
          ))}

          {/* Package attached to drone */}
          {packageAttached && (
            <div
              className="absolute left-1/2 -translate-x-1/2"
              style={{ top: 24 }}
            >
              {/* String */}
              <div className="mx-auto h-4 w-0.5 bg-gray-400" />
              {/* Package */}
              <div
                className="flex h-10 w-14 items-center justify-center rounded border-2 border-orange-600 shadow-lg"
                style={{
                  background: "linear-gradient(180deg, #ff6b4a 0%, #ea580c 100%)",
                }}
              >
                <span className="text-[8px] font-bold text-white drop-shadow">
                  Toolnest
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dropped package */}
      {!packageAttached && (
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            left: `${packageLeft}%`,
            top: `${packageTop}%`,
            transition: "top 0.1s ease-in",
            transform: `translate(-50%, -50%) rotate(${packageProgress * 15}deg)`,
          }}
        >
          <div
            className="flex h-12 w-16 items-center justify-center rounded border-2 border-orange-600 shadow-2xl"
            style={{
              background: "linear-gradient(180deg, #ff6b4a 0%, #ea580c 100%)",
            }}
          >
            <span className="text-[10px] font-bold text-white drop-shadow">
              Toolnest
            </span>
          </div>
          {/* Landing impact effect */}
          {packageProgress > 0.9 && (
            <div className="absolute -bottom-2 left-1/2 h-2 w-20 -translate-x-1/2 rounded-full bg-orange-300/30 blur-sm" />
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}