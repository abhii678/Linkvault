import { NextRequest, NextResponse } from "next/server";

// GET: Webhook verification handshake with Meta
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const verifyToken = process.env.WEBHOOK_VERIFY_TOKEN || "DMvault";

  if (mode === "subscribe" && token === verifyToken) {
    console.log("✅ Webhook verified successfully by Meta!");
    return new NextResponse(challenge, { status: 200 });
  } else {
    console.error("❌ Webhook verification failed. Token mismatch.");
    return new NextResponse("Forbidden", { status: 403 });
  }
}

// POST: Receive real-time message events from Meta
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("📨 Webhook event received:", JSON.stringify(body, null, 2));

    // Process Instagram DM events
    if (body.object === "instagram") {
      for (const entry of body.entry || []) {
        for (const event of entry.messaging || []) {
          if (event.message) {
            console.log(`New DM from ${event.sender.id}: ${event.message.text}`);
          }
        }
      }
    }

    // Always return 200 to acknowledge receipt
    return new NextResponse("EVENT_RECEIVED", { status: 200 });
  } catch (err) {
    console.error("Webhook POST error:", err);
    return new NextResponse("Error", { status: 500 });
  }
}
