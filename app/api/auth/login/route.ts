import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const token = process.env.USER_ACCESS_TOKEN;

  // If a token is already configured in .env.local, skip OAuth and go straight to dashboard
  if (token && token.length > 20) {
    return NextResponse.redirect(new URL("/home", baseUrl));
  }

  // Otherwise start the Instagram OAuth flow
  const appId = process.env.INSTAGRAM_APP_ID;
  const redirectUri = process.env.REDIRECT_URI;

  if (!appId || !redirectUri) {
    return NextResponse.redirect(new URL("/home", baseUrl));
  }

  const oauthUrl = `https://www.instagram.com/oauth/authorize?client_id=${appId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=instagram_business_basic,instagram_business_manage_messages&response_type=code`;
  return NextResponse.redirect(oauthUrl);
}
