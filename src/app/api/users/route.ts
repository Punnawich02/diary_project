import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/users
// For Admin Role ,Will auth later
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        prefix: true,
        first_name: true,
        last_name: true,
        sex: true,
        phone_number: true,
        hn_number: true,
      },
    });

    return Response.json(users);
  } catch (error: any) {
    return new Response(error.message ?? "Internal Server Error", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}

// POST new user
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      prefix,
      first_name,
      last_name,
      sex,
      citizen_id,
      birth_date,
      address,
      phone_number,
      email,
      hn_number,
    } = data;

    const newUser = await prisma.user.create({
      data: {
        prefix,
        first_name,
        last_name,
        sex,
        citizen_id,
        birth_date: new Date(birth_date),
        address,
        phone_number,
        email,
        hn_number,
      },
    });
    return Response.json(newUser);
  } catch (error: any) {
    return new Response(error.message ?? "Internal Server Error", {
      status: 500,
    });
  } finally {
    await prisma.$disconnect();
  }
}
