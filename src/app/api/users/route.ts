import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET /api/users
// For Admin Role ,Will auth later
export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}

// POST /api/users
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      first_name,
      last_name,
      national_id,
      birth_date,
      address,
      phone_number,
      email,
      hn_number,
      line_user_id,
      role,
    } = data;

    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        national_id,
        birth_date: new Date(birth_date),
        address,
        phone_number,
        email,
        hn_number,
        line_user_id,
        role,
      },
    });
    return Response.json(newUser);
  } catch (error: any) {
    return new Response(error.message ?? 'Internal Server Error', { status: 500 });
  }
}