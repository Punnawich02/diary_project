import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Logged out" });

  // ลบ cookie โดยตั้งค่าวันหมดอายุย้อนหลัง
  response.headers.set(
    "Set-Cookie",
    `lineProfile=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );

  redirect("/home");

  return response;
}
