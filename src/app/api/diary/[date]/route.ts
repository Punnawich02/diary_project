import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

// Get Diary by Date
export async function GET(req: NextRequest, { params }: { params: Promise<{ date: string }> }) {
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
    
    // ดึง date parameter (ต้อง await params)
    const { date } = await params;
    if (!date) {
      return new Response("Missing date parameter", { status: 400 });
    }
    
    // Validate date format (yyyy-mm-dd)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return new Response("Invalid date format. Use yyyy-mm-dd", { status: 400 });
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
    
    // แปลง date string เป็น Date object
    const targetDate = new Date(date);
    
    // ค้นหา diary ตาม user_id และ diary_date (ใช้ unique constraint)
    const diary = await prisma.diary.findUnique({
      where: {
        user_id_diary_date: {
          user_id: user.user_id,
          diary_date: targetDate,
        },
      },
    });
    
    if (!diary) {
      return new Response("Diary not found for this date", { status: 404 });
    }
    
    return NextResponse.json(diary);
    
  } catch (error) {
    console.error("Error fetching diary:", error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Update Diary by Date
export async function PUT(req: NextRequest, { params }: { params: Promise<{ date: string }> }) {
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
    
    // ดึง date parameter (ต้อง await params)
    const { date } = await params;
    if (!date) {
      return new Response("Missing date parameter", { status: 400 });
    }
    
    // Validate date format (yyyy-mm-dd)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return new Response("Invalid date format. Use yyyy-mm-dd", { status: 400 });
    }
    
    // ดึงข้อมูลจาก request body
    const body = await req.json();
    const {
      symptoms,
      pain_level,
      breakfast_description,
      lunch_description,
      dinner_description
    } = body;
    
    // Validation
    if (pain_level !== undefined && (pain_level < 0 || pain_level > 10)) {
      return new Response("Pain level must be between 0 and 10", { status: 400 });
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
    
    // แปลง date string เป็น Date object
    const targetDate = new Date(date);
    
    // ค้นหา diary ตาม user_id และ diary_date
    const existingDiary = await prisma.diary.findUnique({
      where: {
        user_id_diary_date: {
          user_id: user.user_id,
          diary_date: targetDate,
        },
      },
    });
    
    if (!existingDiary) {
      return new Response("Diary not found for this date", { status: 404 });
    }
    
    // เตรียมข้อมูลสำหรับ update (เฉพาะ field ที่ส่งมา)
    const updateData: any = {};
    if (symptoms !== undefined) updateData.symptoms = symptoms;
    if (pain_level !== undefined) updateData.pain_level = pain_level;
    if (breakfast_description !== undefined) updateData.breakfast_description = breakfast_description;
    if (lunch_description !== undefined) updateData.lunch_description = lunch_description;
    if (dinner_description !== undefined) updateData.dinner_description = dinner_description;
    
    // อัปเดต diary (updated_at จะอัปเดตอัตโนมัติด้วย @updatedAt)
    const updatedDiary = await prisma.diary.update({
      where: {
        user_id_diary_date: {
          user_id: user.user_id,
          diary_date: targetDate,
        },
      },
      data: updateData,
    });
    
    return NextResponse.json(updatedDiary);
    
  } catch (error) {
    console.error("Error updating diary:", error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}