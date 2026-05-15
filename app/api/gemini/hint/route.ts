import { NextRequest, NextResponse } from "next/server"
import { generateHint } from "@/lib/gemini"

export async function GET(request: NextRequest) {
  // CORS check
  const origin = request.headers.get("origin")
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ].filter(Boolean)

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const { searchParams } = new URL(request.url)
  const zoneId = searchParams.get("zoneId")

  try {
    const hint = await generateHint(zoneId ? parseInt(zoneId) : undefined)
    
    return NextResponse.json(
      { hint },
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Cache-Control": "private, max-age=3600", // Cache for 1 hour
        },
      }
    )
  } catch (error) {
    console.error("Error generating hint:", error)
    return NextResponse.json(
      { error: "Failed to generate hint" },
      { status: 500 }
    )
  }
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get("origin")
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
