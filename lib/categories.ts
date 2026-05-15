import {
  Bot,
  Sparkles,
  Wrench,
  Gamepad2,
  GraduationCap,
  type LucideIcon,
} from "lucide-react"

export type Category = {
  id: string
  name: string
  description: string
  icon: LucideIcon
  accent: "primary" | "accent"
}

export const CATEGORIES: Category[] = [
  {
    id: "ai-tools",
    name: "AI & Bot",
    description: "Assistenti, automazioni e bot Telegram pronti all'uso.",
    icon: Bot,
    accent: "primary",
  },
  {
    id: "templates",
    name: "Template",
    description: "Landing, dashboard e store già configurati.",
    icon: Sparkles,
    accent: "accent",
  },
  {
    id: "tools",
    name: "Strumenti",
    description: "Tool digitali e utility per creator e dev.",
    icon: Wrench,
    accent: "primary",
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Bundle, asset e plugin per il tuo prossimo gioco.",
    icon: Gamepad2,
    accent: "accent",
  },
  {
    id: "courses",
    name: "Corsi",
    description: "Mini-corsi pratici per crescere ogni settimana.",
    icon: GraduationCap,
    accent: "primary",
  },
]
