import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing code" }, { status: 400 });
  }

  try {
    const tokenRes = await axios.post(
      process.env.LINE_TOKEN!,
      new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: process.env.LINE_CALLBACK_URL!,
        client_id: process.env.LINE_CHANNEL_ID!,
        client_secret: process.env.LINE_CHANNEL_SECRET!,
      }),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const { access_token } = tokenRes.data;

    const profileRes = await axios.get(process.env.LINE_PROFILE!, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const profile = profileRes.data;

    // เก็บโปรไฟล์ใน cookie
    const response = NextResponse.redirect(
      new URL("/home", req.nextUrl.origin)
    );

    response.headers.set(
      "Set-Cookie",
      `lineProfile=${encodeURIComponent(
        JSON.stringify(profile)
      )}; Path=/; HttpOnly; Secure; SameSite=Lax`
    );

    return response;
  } catch (err: any) {
    console.error("LINE Login Error:", err);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
