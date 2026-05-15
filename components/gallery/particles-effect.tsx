"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

const particlesConfig: ISourceOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 60,
  particles: {
    color: {
      value: ["#ff6b4a", "#a855f7", "#3b82f6"],
    },
    links: {
      color: "#ffffff",
      distance: 150,
      enable: true,
      opacity: 0.05,
      width: 1,
    },
    move: {
      direction: "none",
      enable: true,
      outModes: {
        default: "bounce",
      },
      random: true,
      speed: 0.5,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 50,
    },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 0.5,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 1, max: 3 },
    },
  },
  detectRetina: true,
}

export function ParticlesEffect() {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  if (!init) return null

  return (
    <Particles
      id="gallery-particles"
      className="absolute inset-0 -z-10"
      options={particlesConfig}
    />
  )
}
