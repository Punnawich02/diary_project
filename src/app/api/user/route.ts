import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

// Get Hospital Profile
export async function GET(req: NextRequest) {
  const prisma = new PrismaClient();

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

    // ถ้าหาไม่เจอ จะต้องให้ไปเพิ่มที่หน้า /profile
    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Internal server error", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

// Update Hospital Profile
export async function PUT(req: NextRequest) {
  try {
    // ดึง cookie ออกมา
    const cookie = req.cookies.get("lineProfile");

    if (!cookie) {
      return new Response("Missing lineProfile cookie", { status: 401 });
    }

    const { citizenID, hn } = await req.json();

    if (!citizenID && !hn) {
      return new Response("Missing citizenID or hn", { status: 400 });
    }

    // แยก LineUserID ออกมาจาก cookie
    const profile = JSON.parse(decodeURIComponent(cookie.value));
    const lineUserID = profile.userId;

    if (!lineUserID) {
      return new Response("Invalid lineProfile data", { status: 400 });
    }

    // สร้างเงื่อนไขการค้นหาจาก citizenID หรือ hn
    const whereClause: any = {};
    if (citizenID) whereClause.citizen_id = citizenID;
    if (hn) whereClause.hn_number = hn;

    await prisma.$connect();
    const user = await prisma.user.findFirst({
      where: whereClause,
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    // อัปเดท user โดยการเพิ่ม lineUserID ลงไปใน DB
    const updatedUser = await prisma.user.update({
      where: { user_id: user.user_id },
      data: {
        line_user_id: lineUserID,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user with lineUserID:", error);
    return new Response("Internal server error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
