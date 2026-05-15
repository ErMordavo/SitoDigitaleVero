export type Product = {
  id: string
  name: string
  price: number
  description: string
  image: string
  rating: number
  category: string
}

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Bot Telegram Pro",
    price: 49,
    description:
      "Bot Telegram completo con gestione ordini, broadcast e pannello admin. Pronto in 5 minuti.",
    image: "/images/products/SociaMedia_Template.png",
    rating: 5,
    category: "ai-tools",
  },
  {
    id: "p2",
    name: "Template StoreFront",
    price: 39,
    description:
      "Template moderno per ecommerce con animazioni fluide, dark mode e checkout integrato.",
    image: "/images/products/SociaMedia_Template.png",
    rating: 5,
    category: "templates",
  },
  {
    id: "p3",
    name: "AI Assistant Kit",
    price: 79,
    description:
      "Kit completo per creare un assistente AI personalizzato con knowledge base e tool calling.",
    image: "/images/products/Script_Report_Automatici.png",
    rating: 5,
    category: "ai-tools",
  },
  {
    id: "p4",
    name: "Dashboard Analytics",
    price: 59,
    description:
      "Dashboard pronta con grafici interattivi, KPI e tema personalizzabile in pochi click.",
    image: "/images/products/Script_Report_Automatici.png",
    rating: 4,
    category: "templates",
  },
  {
    id: "p5",
    name: "Game Asset Bundle",
    price: 29,
    description:
      "Pacchetto di asset 2D e shader per il tuo prossimo gioco indie. Licenza commerciale inclusa.",
    image: "/images/products/Script_Report_Automatici.png",  // TOLTO /public/
    rating: 4,
    category: "gaming",
  },
  {
    id: "p6",
    name: "Corso Next.js Pro",
    price: 99,
    description:
      "Mini-corso pratico per padroneggiare Next.js, Server Components e deploy su vari piataforme.",
    image: "/images/products/Piano_allenamento_12_settimane.png",
    rating: 5,
    category: "courses",
  },
  
]
