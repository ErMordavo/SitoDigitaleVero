# Toolnest

Sito vetrina + mini e-commerce con animazioni avanzate, robot scroll-driven,
checkout via Telegram e pannello admin protetto.

> ⚙️ Costruito su **Next.js 16 + Tailwind CSS v4** (la richiesta originale
> indicava Vite, ma su Next.js otteniamo gratis il routing per `/admin`,
> i font ottimizzati e il deploy su Vercel one-click).

## Avvio rapido

```bash
pnpm install
pnpm dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Personalizzazione (tutto in `lib/config.ts`)

| Cosa                | Dove                                                      |
| ------------------- | --------------------------------------------------------- |
| Bot Telegram        | `TELEGRAM_BOT` in `lib/config.ts`                         |
| Password admin      | `ADMIN_PASSWORD` in `lib/config.ts` (default `admin123`)  |
| Numero frame robot  | `TOTAL_FRAMES` in `lib/config.ts`                         |
| Prodotti default    | `lib/products.ts` (i prodotti runtime stanno in `localStorage`) |
| Categorie           | `lib/categories.ts`                                       |

## Robot animato

I frame stanno in `public/frames/`. Per default il sito ne usa 3
(`frame_001.png`, `frame_015.png`, `frame_031.png`) e crossfada tra di essi.

Per usare 31 frame veri:

1. Inserisci `frame_001.png` … `frame_031.png` in `public/frames/`.
2. In `components/scroll-robot.tsx` sostituisci il blocco `KEYFRAMES.map(...)`
   con un singolo `<img>` il cui `src` è calcolato così:
   ```ts
   const n = Math.round(progress * 30) + 1
   const src = `/frames/frame_${String(n).padStart(3, "0")}.png`
   ```

## Video intro

Il componente `components/intro-video.tsx` mostra un'animazione placeholder
all'avvio (memorizzata in `sessionStorage` per non riapparire). Per usare un
video reale, sostituisci il `<div>` interno con un `<video src="/intro.mp4"
autoPlay muted onEnded={close} />`.

## Build & Deploy

```bash
pnpm build      # build di produzione
pnpm start      # server di produzione
```

Per Vercel: clicca **Deploy** dal dashboard di v0, oppure
`vercel --prod` se hai la CLI installata.

## Pannello admin

1. Vai su `/admin`.
2. Clicca **Accedi** (o l'icona di login in header).
3. Email: qualsiasi · Password: `admin123` (modificabile in `lib/config.ts`).
4. Da qui puoi creare, modificare ed eliminare prodotti.

I prodotti vengono persistiti in `localStorage` (chiave
`toolnest:products`) — nessun backend richiesto. Per persistenza reale puoi
collegare Supabase, Neon o Vercel Blob (vedi v0 → Settings → Integrations).

## Struttura

```
app/
  layout.tsx          # font, metadata, providers
  page.tsx            # Home
  admin/page.tsx      # /admin
components/
  scroll-robot.tsx    # robot fisso che si muove con lo scroll
  scroll-color-background.tsx
  custom-cursor.tsx
  intro-video.tsx
  header.tsx, footer.tsx, layout-shell.tsx
  cart-drawer.tsx, auth-modal.tsx, product-modal.tsx
  admin-panel.tsx
  telegram-float.tsx, scroll-to-top.tsx
  sections/           # Hero, Categories, Products, Services, HowItWorks, Newsletter
context/              # Theme (next-themes), Cart, Auth, Products, UI
hooks/                # useScrollProgress, useReveal
lib/                  # config, products, categories, utils
public/frames/        # robot keyframes
```
