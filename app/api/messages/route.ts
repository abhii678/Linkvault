import { NextRequest, NextResponse } from "next/server";
import { fetchInstagramResources } from "@/lib/instagram";

export async function GET(request: NextRequest) {
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
  } catch (error: unknown) {
    const errObj = error as { name?: string; message?: string };
    if (errObj?.name === "TokenExpiredError" || errObj?.name === "PermissionRevokedError") {
      return NextResponse.json(
        {
          error: "token_expired",
          message: errObj.message || "Session expired",
          reconnect: true,
        },
        { status: 401 }
      );
    }
    console.error("Error in /api/messages route:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages", message: errObj?.message || "Unknown error" },
      { status: 500 }
    );
  }
}
