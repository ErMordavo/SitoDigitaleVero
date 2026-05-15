import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin")
  const allowedOrigins = [
    process.env.NEXT_PUBLIC_APP_URL,
    "http://localhost:3000",
  ].filter(Boolean)

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { zoneId, hintText } = body

    if (!zoneId) {
      return NextResponse.json(
        { error: "zoneId is required" },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Get current user (optional)
    const { data: { user } } = await supabase.auth.getUser()

    // Insert discovery
    const { data: discovery, error: discoveryError } = await supabase
      .from("discoveries")
      .insert({
        zone_id: zoneId,
        user_id: user?.id || null,
        hint_text: hintText || null,
      })
      .select()
      .single()

    if (discoveryError) {
      console.error("Discovery insert error:", discoveryError)
      return NextResponse.json(
        { error: "Failed to record discovery" },
        { status: 500 }
      )
    }

    // Get updated global count
    const { data: globalCount } = await supabase
      .from("global_count")
      .select("total_discoveries")
      .eq("id", 1)
      .single()

    return NextResponse.json({
      success: true,
      discovery,
      totalDiscoveries: globalCount?.total_discoveries || 0,
    })
  } catch (error) {
    console.error("Error recording discovery:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin")

  try {
    const supabase = await createClient()

    const { data: globalCount } = await supabase
      .from("global_count")
      .select("total_discoveries")
      .eq("id", 1)
      .single()

    return NextResponse.json({
      totalDiscoveries: globalCount?.total_discoveries || 0,
    }, {
      headers: {
        "Access-Control-Allow-Origin": origin || "*",
      },
    })
  } catch (error) {
    console.error("Error fetching discoveries:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
