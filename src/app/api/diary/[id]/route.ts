import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get that diary
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const diaryId = parseInt(params.id);
    if (isNaN(diaryId)) {
      return new Response("Invalid diary ID", { status: 400 });
    }

    const diary = await prisma.diary.findUnique({
      where: { diary_id: diaryId },
      select: {
        diary_id: true,
        user_id: true,
        diary_date: true,
        symptoms: true,
        pain_level: true,
        breakfast_description: true,
        lunch_description: true,
        dinner_description: true,
        created_at: true,
        updated_at: true,
      },
    });

    if (!diary) {
      return new Response("Diary not found", { status: 404 });
    }

    return Response.json(diary);
  } catch (error: any) {
    console.error("GET /diary/[id] error:", error);
    return new Response(error.message ?? "Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// Edit That diary
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const diaryId = parseInt(params.id);
    if (isNaN(diaryId)) {
      return new Response("Invalid diary ID", { status: 400 });
    }

    const data = await req.json();
    const {
      diary_date,
      symptoms,
      pain_level,
      breakfast_description,
      lunch_description,
      dinner_description,
    } = data;

    // เตรียมข้อมูลที่จะอัปเดต (กรอง undefined)
    const updateData: any = {};
    if (diary_date) updateData.diary_date = new Date(diary_date);
    if (symptoms !== undefined) updateData.symptoms = symptoms;
    if (pain_level !== undefined) updateData.pain_level = pain_level;
    if (breakfast_description !== undefined) updateData.breakfast_description = breakfast_description;
    if (lunch_description !== undefined) updateData.lunch_description = lunch_description;
    if (dinner_description !== undefined) updateData.dinner_description = dinner_description;

    const updatedDiary = await prisma.diary.update({
      where: { diary_id: diaryId },
      data: updateData,
    });

    return Response.json(updatedDiary);
  } catch (error: any) {
    console.error("PUT /diary/[id] error:", error);
    return new Response(error.message ?? "Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
