// app/api/login/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const state = crypto.randomUUID(); // กัน CSRF
  const redirectUri = process.env.LINE_CALLBACK_URL!;
  const clientId = process.env.LINE_CHANNEL_ID!;
  const scope = "profile openid email";

  const lineLoginUrl = `https://access.line.me/oauth2/v2.1/authorize` +
    `?response_type=code` +
    `&client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&state=${state}` +
    `&scope=${encodeURIComponent(scope)}`;

  return NextResponse.redirect(lineLoginUrl);
}
