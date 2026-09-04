import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (error) {
    console.error("OAuth error:", searchParams.get("error_description") || error);
    return NextResponse.redirect(new URL("/home", baseUrl));
  }

  if (!code) {
    console.error("No authorization code received in callback.");
    return NextResponse.redirect(new URL("/home", baseUrl));
  }

  const appId = process.env.INSTAGRAM_APP_ID;
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  const redirectUri = process.env.REDIRECT_URI;

  if (!appId || !appSecret || !redirectUri) {
    console.error("Missing required environment variables for token exchange.");
    return NextResponse.redirect(new URL("/home", baseUrl));
  }

  try {
    console.log("Exchanging code for Instagram access token...");
    const tokenResponse = await fetch("https://api.instagram.com/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
        code: code,
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error("Failed to exchange Instagram token:", errorText);
      return NextResponse.redirect(new URL("/home", baseUrl));
    }

    const tokenData = await tokenResponse.json();
    const shortLivedToken = tokenData.access_token;
    const userId = tokenData.user_id;

    console.log("Exchanging for long-lived token...");
    const longLivedResponse = await fetch(
      `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=${appSecret}&access_token=${shortLivedToken}`
    );

    let finalToken = shortLivedToken;
    if (longLivedResponse.ok) {
      const longLivedData = await longLivedResponse.json();
      finalToken = longLivedData.access_token;
    }

    try {
      const { error: dbError } = await supabaseAdmin.from("user_tokens").upsert({
        user_id: String(userId),
        access_token: finalToken,
        updated_at: new Date().toISOString(),
      });
      if (dbError) {
        console.error("Supabase upsert error:", dbError);
      } else {
        console.log("Token successfully stored in Supabase for user:", userId);
      }
    } catch (dbEx) {
      console.error("Failed to save token to database:", dbEx);
    }

    const response = NextResponse.redirect(new URL("/home", baseUrl));
    response.cookies.set("ig_user_id", String(userId), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 60,
    });

    return response;
  } catch (error) {
    console.error("Error during Instagram token exchange callback:", error);
    return NextResponse.redirect(new URL("/home", baseUrl));
  }
}
