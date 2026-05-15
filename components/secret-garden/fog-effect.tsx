"use client"

import { useEffect, useState } from "react"
import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { ISourceOptions } from "@tsparticles/engine"

const fogConfig: ISourceOptions = {
  background: {
    color: {
      value: "transparent",
    },
  },
  fpsLimit: 30,
  particles: {
    color: {
      value: "#ffffff",
    },
    move: {
      direction: "right",
      enable: true,
      outModes: {
        default: "out",
      },
      random: true,
      speed: 0.3,
      straight: false,
    },
    number: {
      density: {
        enable: true,
        width: 1920,
        height: 1080,
      },
      value: 100,
    },
    opacity: {
      value: { min: 0.01, max: 0.08 },
      animation: {
        enable: true,
        speed: 0.2,
        sync: false,
      },
    },
    shape: {
      type: "circle",
    },
    size: {
      value: { min: 50, max: 200 },
    },
  },
  detectRetina: true,
}

export function FogEffect() {
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
      id="fog-particles"
      className="fixed inset-0 -z-10"
      options={fogConfig}
    />
  )
}
