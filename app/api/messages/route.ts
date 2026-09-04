import { NextRequest, NextResponse } from "next/server";
import { fetchInstagramResources } from "@/lib/instagram";

export async function GET(request: NextRequest) {
  // Read the user's Instagram ID from the cookie set during OAuth callback
  const igUserId = request.cookies.get("ig_user_id")?.value;

  if (!igUserId) {
    return NextResponse.json(
      {
        error: "not_authenticated",
        message: "No Instagram session found. Please connect your Instagram account.",
      },
      { status: 401 }
    );
  }

  try {
    const resources = await fetchInstagramResources(igUserId);
    return NextResponse.json(resources);
  } catch (error: any) {
    // Surface specific error types so the frontend can show appropriate UI
    if (error?.name === "TokenExpiredError" || error?.name === "PermissionRevokedError") {
      return NextResponse.json(
        {
          error: "token_expired",
          message: error.message,
          reconnect: true,
        },
        { status: 401 }
      );
    }
    console.error("Error in /api/messages route:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages", message: error?.message },
      { status: 500 }
    );
  }
}