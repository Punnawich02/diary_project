import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// For Admin
export async function GET() {
  try {
    const diaries = await prisma.diary.findMany({
      select: {
        diary_id: true,
        user_id: true,
        diary_date: true,
        symptoms: true,
        pain_level: true,
        breakfast_description: true,
        lunch_description: true,
        dinner_description: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            hn_number: true,
          },
        },
      },
      orderBy: {
        diary_date: "desc", // เรียงจากใหม่ไปเก่า
      },
    });

    return Response.json(diaries);
  } catch (error: any) {
    console.error("GET /diaries error:", error);
    return new Response(error.message ?? "Internal Server Error", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

// Post new Diary
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      user_id,
      diary_date,
      symptoms,
      pain_level,
      breakfast_description,
      lunch_description,
      dinner_description,
    } = data;

    // Basic validation
    if (!user_id || !diary_date) {
      return new Response('user_id and diary_date are required', { status: 400 });
    }

    // สร้าง diary ใหม่ (ถ้า user_id หรือ diary_date ซ้ำ อาจ error เพราะ unique constraint)
    const newDiary = await prisma.diary.create({
      data: {
        user_id,
        diary_date: new Date(diary_date),
        symptoms: symptoms ?? null,
        pain_level: pain_level ?? null,
        breakfast_description: breakfast_description ?? null,
        lunch_description: lunch_description ?? null,
        dinner_description: dinner_description ?? null,
      },
    });

    return new Response(JSON.stringify(newDiary), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('POST /diary error:', error);

    // ถ้า error จาก unique constraint
    if (error.code === 'P2002') {
      return new Response('Diary entry for this user and date already exists', {
        status: 409,
      });
    }

    return new Response(error.message ?? 'Internal Server Error', { status: 500 });
  }
}
