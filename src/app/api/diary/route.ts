import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Add new Diary
export async function POST(req: NextRequest) {
  try {
    // ดึง cookie ออกมา
    const cookie = req.cookies.get("lineProfile");
    if (!cookie) {
      return new Response("Missing lineProfile cookie", { status: 401 });
    }

    // แยก LineUserID ออกมาจาก cookie
    const profile = JSON.parse(decodeURIComponent(cookie.value));
    const lineUserID = profile.userId;

    if (!lineUserID) {
      return new Response("Invalid lineProfile data", { status: 400 });
    }

    await prisma.$connect();

    // ค้นหา user จาก lineUserID
    const user = await prisma.user.findUnique({
      where: {
        line_user_id: lineUserID,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // ✅ แก้ตรงนี้ ให้ชื่อ field ตรงกับ Prisma
    const body = await req.json();
    const {
      diary_date,
      symptoms,
      pain_level,
      breakfast_description,
      lunch_description,
      dinner_description,
    } = body;

    // ✅ สร้าง diary โดยใช้ชื่อ field ที่ตรง
    const newDiary = await prisma.diary.create({
      data: {
        user_id: user.user_id,
        diary_date: new Date(diary_date),
        symptoms: symptoms,
        pain_level: pain_level,
        breakfast_description: breakfast_description,
        lunch_description: lunch_description,
        dinner_description: dinner_description,
      },
    });

    return NextResponse.json(newDiary, { status: 201 });
  } catch (error) {
    console.error("Error creating diary entry:", error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
