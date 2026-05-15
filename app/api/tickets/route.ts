import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();

    const { data: tickets, error } = await supabase
      .from("tickets")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching tickets:", error);
      return NextResponse.json({ tickets: [] });
    }

    return NextResponse.json({ tickets: tickets || [] });
  } catch (error) {
    console.error("Tickets API error:", error);
    return NextResponse.json({ tickets: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { email, message } = body;

    if (!email || !message) {
      return NextResponse.json(
        { error: "Email and message are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tickets")
      .insert({ email, message, status: "open" })
      .select()
      .single();

    if (error) {
      console.error("Error creating ticket:", error);
      return NextResponse.json(
        { error: "Failed to create ticket" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, ticket: data });
  } catch (error) {
    console.error("Tickets API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("tickets")
      .update({ status })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating ticket:", error);
      return NextResponse.json(
        { error: "Failed to update ticket" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, ticket: data });
  } catch (error) {
    console.error("Tickets API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("tickets")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting ticket:", error);
      return NextResponse.json(
        { error: "Failed to delete ticket" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tickets API error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
