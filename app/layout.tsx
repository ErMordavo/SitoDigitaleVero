import type { Metadata, Viewport } from "next"
import { Inter, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Providers } from "@/components/providers"
import "./globals.css"
import { ParticlesBackground } from "@/components/ParticlesBackground"
import { CustomerProvider } from "@/context/customer-context"
import { PuzzleTech } from "@/components/puzzle-tech"
import { DeliveryDrone } from "@/components/delivery-drone"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Toolnest — Strumenti, gadget e creatività su misura",
  description:
    "Toolnest è il marketplace creativo dove robot e robogatti collaborano per portarti i migliori prodotti, servizi e template.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1f" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <CustomerProvider>
          <ParticlesBackground />
          <PuzzleTech />
          <DeliveryDrone />
          <Providers>{children}</Providers>
          {process.env.NODE_ENV === "production" && <Analytics />}
        </CustomerProvider>
      </body>
    </html>
  )
}