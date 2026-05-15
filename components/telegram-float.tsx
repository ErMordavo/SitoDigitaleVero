"use client"

import { Send } from "lucide-react"
import { telegramUrl } from "@/lib/config"

export function TelegramFloat() {
  return (
    <a
      href={telegramUrl("Ciao Toolnest! Vorrei avere maggiori informazioni.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Scrivici su Telegram"
      className="group fixed bottom-6 right-20 z-40 grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-110"
      style={{
        background: "linear-gradient(135deg, #229ED9 0%, #1a73a8 100%)",
        boxShadow: "0 10px 30px -10px rgba(34, 158, 217, 0.6)",
      }}
    >
      <Send className="h-5 w-5 transition-transform group-hover:-rotate-12" />
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background: "rgba(34, 158, 217, 0.4)",
          animation: "pulseRing 2s ease-out infinite",
        }}
      />
      <style jsx>{`
        @keyframes pulseRing {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
      `}</style>
    </a>
  )
}
