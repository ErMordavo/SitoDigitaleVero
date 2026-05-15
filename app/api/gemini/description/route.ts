import { NextRequest, NextResponse } from "next/server"
import { generateDescription } from "@/lib/gemini"

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin")
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ].filter(Boolean)

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const description = await generateDescription()
    
    return NextResponse.json(
      { description },
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Cache-Control": "private, max-age=1800", // Cache for 30 min
        },
      }
    )
  } catch (error) {
    console.error("Error generating description:", error)
    return NextResponse.json(
      { error: "Failed to generate description" },
      { status: 500 }
    )
  }
}
