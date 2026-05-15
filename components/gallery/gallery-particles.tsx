"use client"

import { useEffect, useState } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import { useTheme } from "next-themes"

export function GalleryParticles() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === "dark"
  const particleColor = isDark ? "#FF6B4A" : "#A855F7"
  const linkColor = isDark ? "#A855F7" : "#FF6B4A"

  return (
    <Particles
      id="gallery-particles"
      className="fixed inset-0 -z-10"
      init={async (engine) => {
        await loadSlim(engine)
      }}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: true, mode: "grab" },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
              },
            },
          },
        },
        particles: {
          color: { value: particleColor },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: 0.2,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            straight: false,
            outModes: { default: "out" },
          },
          number: {
            density: { enable: true, area: 1000 },
            value: 40,
          },
          opacity: {
            value: { min: 0.1, max: 0.4 },
            animation: {
              enable: true,
              speed: 0.5,
              sync: false,
            },
          },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  )
}
