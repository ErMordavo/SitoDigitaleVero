import { google } from "@ai-sdk/google"
import { generateText } from "ai"

const SYSTEM_PROMPT = `Sei un poeta digitale che scrive indizi misteriosi e ispiranti su temi di creatività, giardini segreti e mondi digitali. Rispondi sempre in italiano con massimo 20 parole. Sii evocativo e misterioso.`

export async function generateHint(zoneId?: number): Promise<string> {
  const zonePrompts: Record<number, string> = {
    1: "Genera un indizio sulla soglia di un giardino nascosto",
    2: "Genera un indizio su una luce che filtra tra le foglie digitali",
    3: "Genera un indizio su un sentiero fatto di codice",
    4: "Genera un indizio su fiori che sbocciano in pixel",
    5: "Genera un indizio sul cuore del giardino segreto",
  }

  const prompt = zoneId && zonePrompts[zoneId] 
    ? zonePrompts[zoneId] 
    : "Genera un indizio poetico per chi cerca un giardino segreto digitale"

  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: SYSTEM_PROMPT,
      prompt,
    })
    
    return text.trim()
  } catch (error) {
    console.error("Gemini API error:", error)
    // Fallback hints in case of API error
    const fallbackHints = [
      "Nel buio digitale, un fiore di luce attende chi cerca.",
      "I pixel danzano, rivelando sentieri nascosti.",
      "Oltre lo schermo, il giardino sogna.",
      "Ogni click apre una porta invisibile.",
      "Nel codice si cela la poesia del mistero.",
    ]
    return fallbackHints[Math.floor(Math.random() * fallbackHints.length)]
  }
}

export async function generateDescription(): Promise<string> {
  try {
    const { text } = await generateText({
      model: google("gemini-2.0-flash"),
      system: "Sei un artista digitale. Genera una breve descrizione poetica per un'opera d'arte digitale. Massimo 15 parole in italiano.",
      prompt: "Descrivi un'opera d'arte digitale astratta",
    })
    
    return text.trim()
  } catch (error) {
    console.error("Gemini API error:", error)
    return "Un viaggio attraverso pixel e sogni, dove il codice diventa arte."
  }
}
