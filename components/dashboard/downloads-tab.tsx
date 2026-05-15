"use client"

import { Download, FileCode, FileText, FileArchive } from "lucide-react"

/**
 * DownloadsTab - Lists downloadable files for purchased products
 * 
 * Mock data structure (replace with API in production):
 * - id: Unique file identifier
 * - name: Display name
 * - product: Associated product name
 * - size: File size string
 * - type: "code" | "document" | "archive"
 * - downloadUrl: URL to download (mock)
 */

interface DownloadFile {
  id: string
  name: string
  product: string
  size: string
  type: "code" | "document" | "archive"
  downloadUrl: string
}

// Mock downloadable files
const MOCK_DOWNLOADS: DownloadFile[] = [
  {
    id: "dl-001",
    name: "bot-telegram-pro-v2.0.zip",
    product: "Bot Telegram Pro",
    size: "2.4 MB",
    type: "archive",
    downloadUrl: "#download-bot-telegram",
  },
  {
    id: "dl-002",
    name: "template-ecommerce-main.zip",
    product: "Template E-commerce",
    size: "15.8 MB",
    type: "archive",
    downloadUrl: "#download-ecommerce",
  },
  {
    id: "dl-003",
    name: "ai-assistant-kit-docs.pdf",
    product: "AI Assistant Kit",
    size: "845 KB",
    type: "document",
    downloadUrl: "#download-ai-docs",
  },
  {
    id: "dl-004",
    name: "ai-assistant-source.zip",
    product: "AI Assistant Kit",
    size: "3.2 MB",
    type: "archive",
    downloadUrl: "#download-ai-source",
  },
  {
    id: "dl-005",
    name: "analytics-dashboard-src.tsx",
    product: "Analytics Dashboard",
    size: "128 KB",
    type: "code",
    downloadUrl: "#download-analytics",
  },
  {
    id: "dl-006",
    name: "game-assets-pack.zip",
    product: "Game Asset Bundle",
    size: "256 MB",
    type: "archive",
    downloadUrl: "#download-game-assets",
  },
  {
    id: "dl-007",
    name: "nextjs-course-materials.zip",
    product: "Corso Next.js Avanzato",
    size: "1.2 GB",
    type: "archive",
    downloadUrl: "#download-course",
  },
  {
    id: "dl-008",
    name: "guida-rapida.pdf",
    product: "Corso Next.js Avanzato",
    size: "2.1 MB",
    type: "document",
    downloadUrl: "#download-guide",
  },
]

const FILE_ICONS: Record<DownloadFile["type"], React.ReactNode> = {
  code: <FileCode className="h-5 w-5" />,
  document: <FileText className="h-5 w-5" />,
  archive: <FileArchive className="h-5 w-5" />,
}

const FILE_COLORS: Record<DownloadFile["type"], string> = {
  code: "#22c55e",
  document: "#3b82f6",
  archive: "#a855f7",
}

export function DownloadsTab() {
  const handleDownload = (file: DownloadFile) => {
    // Mock download action
    // In production, this would trigger actual file download
    alert(`Download avviato: ${file.name}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground">I Tuoi Download</h1>
        <p className="mt-1 text-muted-foreground">
          Scarica i file dei prodotti che hai acquistato.
        </p>
      </div>

      {/* Downloads grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {MOCK_DOWNLOADS.map((file) => (
          <div
            key={file.id}
            className="group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
          >
            {/* File icon and info */}
            <div className="flex items-start gap-3">
              <div
                className="grid h-12 w-12 shrink-0 place-items-center rounded-lg"
                style={{
                  backgroundColor: `${FILE_COLORS[file.type]}20`,
                  color: FILE_COLORS[file.type],
                }}
              >
                {FILE_ICONS[file.type]}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-foreground" title={file.name}>
                  {file.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">{file.product}</p>
              </div>
            </div>

            {/* Size and download button */}
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="text-xs text-muted-foreground">{file.size}</span>
              <button
                onClick={() => handleDownload(file)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Download className="h-3.5 w-3.5" />
                Scarica
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Download all button */}
      <div className="flex justify-center">
        <button className="inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary">
          <Download className="h-4 w-4" />
          Scarica Tutti i File
        </button>
      </div>
    </div>
  )
}
