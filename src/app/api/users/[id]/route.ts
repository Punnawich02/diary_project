import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const cookieStore = cookies();
    const lineProfileCookie = (await cookieStore).get("lineProfile");

    if (!lineProfileCookie) {
      return new Response("Unauthorized: LINE login required", { status: 401 });
    }

    const lineProfile = JSON.parse(lineProfileCookie.value);
    const lineUserId = lineProfile.userId;

    if (!lineUserId) {
      return new Response("Invalid lineProfile cookie", { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        line_user_id: lineUserId,
      },
      select: {
        prefix: true,
        first_name: true,
        last_name: true,
        sex: true,
        birth_date: true,
        phone_number: true,
        email: true,
        address: true,
        hn_number: true,
        citizen_id: true,
        role: true,
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return Response.json(user);
  } catch (error: any) {
    console.error("GET /users/me error:", error);
    return new Response(error.message ?? "Internal Server Error", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PUT(req: Request) {
  try {
    const cookieStore = cookies();
    const lineProfileCookie = (await cookieStore).get('lineProfile');

    if (!lineProfileCookie) {
      return new Response('Unauthorized: LINE login required', { status: 401 });
    }

    const lineProfile = JSON.parse(lineProfileCookie.value);
    const lineUserId = lineProfile.userId;

    if (!lineUserId) {
      return new Response('Invalid LINE profile data', { status: 400 });
    }

    const data = await req.json();
    const {
      prefix,
      first_name,
      last_name,
      sex,
      birth_date,
      address,
      phone_number,
      email,
      citizen_id,
      hn_number,
    } = data;

    if (!citizen_id && !hn_number) {
      return new Response('citizen_id or hn_number is required', { status: 400 });
    }

    // ค้นหาผู้ใช้จาก citizen_id หรือ hn_number
    const orConditions = [];
    if (citizen_id) {
      orConditions.push({ citizen_id });
    }
    if (hn_number) {
      orConditions.push({ hn_number });
    }
    const user = await prisma.user.findFirst({
      where: {
        OR: orConditions,
      },
    });

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // ทำการ update profile + ผูก line_user_id
    const updatedUser = await prisma.user.update({
      where: {
        user_id: user.user_id,
      },
      data: {
        prefix,
        first_name,
        last_name,
        sex,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        address,
        phone_number,
        email,
        line_user_id: lineUserId,
      },
    });

    return Response.json({
      message: 'User profile updated and LINE linked',
      user: updatedUser,
    });
  } catch (error: any) {
    console.error('PUT /users/profile error:', error);
    return new Response(error.message ?? 'Internal Server Error', { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
