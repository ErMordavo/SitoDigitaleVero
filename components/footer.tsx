"use client"

import { Crown, Send } from "lucide-react"
import { telegramUrl, TELEGRAM_BOT } from "@/lib/config"

const FOOTER_LINKS: { label: string; target: string }[] = [
  { label: "Template", target: "#templates" },
  { label: "Prodotti", target: "#products" },
  { label: "Servizi", target: "#services" },
  { label: "Contatti", target: "#newsletter" },
]

export function Footer() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault()
    const el = document.querySelector(target)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <footer className="relative z-[1] mt-32 border-t border-border bg-card/40 backdrop-blur-sm">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 font-display text-xl font-bold">
            <span
              className="grid h-9 w-9 place-items-center rounded-xl text-primary-foreground"
              style={{
                background: "linear-gradient(135deg, #ff6b4a 0%, #a855f7 100%)",
              }}
            >
              <Crown className="h-5 w-5" />
            </span>
            Toolnest
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            Il marketplace creativo dove robot e robogatti collaborano per
            portarti i migliori prodotti, servizi e template. Tutto pronto, tutto
            su misura.
          </p>
          <a
            href={telegramUrl("Ciao Toolnest!")}
            target="_blank"
            rel="noreferrer"
            className="btn-liquid mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            <Send className="h-4 w-4" />
            Scrivici su Telegram
          </a>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Esplora
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {FOOTER_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.target}
                  onClick={(e) => handleClick(e, link.target)}
                  className="text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Contatti
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`https://t.me/${TELEGRAM_BOT}`}
                target="_blank"
                rel="noreferrer"
                className="text-foreground/80 transition-colors hover:text-primary"
              >
                @{TELEGRAM_BOT}
              </a>
            </li>
            <li className="text-muted-foreground">support@toolnest.app</li>
            <li className="text-muted-foreground">Lun – Ven · 9:00 – 19:00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Toolnest. Tutti i diritti riservati.</p>
          <p>
            Costruito con Next.js · Animato con cura da robogatti pixelati.
          </p>
        </div>
      </div>
    </footer>
  )
}
