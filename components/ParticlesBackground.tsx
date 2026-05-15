"use client";

import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from "next-themes"; // <--- Questo legge il tema scuro/chiaro

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";
  
  // Colori magici: se è buio usa l'arancione, se è chiaro usa il viola
  const particleColor = isDark ? "#FF6B4A" : "#A855F7";
  const linkColor = isDark ? "#A855F7" : "#FF6B4A";

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      init={async (engine) => {
        await loadSlim(engine);
      }}
      options={{
        fpsLimit: 60,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: true, mode: "repulse" },
          },
        },
        particles: {
          color: { value: particleColor },
          links: {
            color: linkColor,
            distance: 150,
            enable: true,
            opacity: 0.3,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.5,
            direction: "none",
            random: true,
            straight: false,
          },
          number: {
            density: { enable: true, area: 800 },
            value: 60,
          },
          opacity: { value: 0.4 },
          size: { value: { min: 1, max: 3 } },
        },
        detectRetina: true,
      }}
    />
  );
}