import { NextResponse } from "next/server";
import { fetchInstagramResources } from "@/lib/instagram";

export async function GET() {
  try {
    const resources = await fetchInstagramResources();
    return NextResponse.json(resources);
  } catch (error) {
    console.error("Error in /api/messages route:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
