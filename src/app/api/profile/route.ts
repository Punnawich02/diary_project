// app/api/profile/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("lineProfile");
  if (!cookie) {
    return NextResponse.json({ profile: null });
  }

  try {
    const profile = JSON.parse(decodeURIComponent(cookie.value));
    return NextResponse.json({ profile });
  } catch {
    return NextResponse.json({ profile: null });
  }
}
