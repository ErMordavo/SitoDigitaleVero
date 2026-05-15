"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Torna su"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`btn-liquid fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full text-primary-foreground shadow-lg transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}
