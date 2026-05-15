// Toolnest – global configuration
// Modify these values to customize the site without touching component code.

export const SITE_CONFIG = {
  name: "Toolnest",
  tagline: "Strumenti, gadget e creatività su misura",
  description:
    "Toolnest è il marketplace creativo dove robot e robogatti collaborano per portarti i migliori prodotti, servizi e template.",
  url: "https://toolnest.example.com",
}

// Telegram bot username (without the @). All Telegram CTAs build URLs from this.
export const TELEGRAM_BOT = "ErCommercioBot"

export const telegramUrl = (text: string) =>
  `https://t.me/${TELEGRAM_BOT}?text=${encodeURIComponent(text)}`

// Admin password (mock auth). Change this to lock down /admin.
export const ADMIN_PASSWORD = "admin123"

// Number of frames available in /public/frames. The ScrollRobot will gracefully
// fall back to the closest existing frame when fewer assets are present.
export const TOTAL_FRAMES = 31

// Local storage keys
export const STORAGE_KEYS = {
  cart: "toolnest:cart",
  auth: "toolnest:auth",
  products: "toolnest:products",
  introSeen: "toolnest:intro-seen",
} as const
