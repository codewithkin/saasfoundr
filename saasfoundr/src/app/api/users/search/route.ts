import { auth, prisma } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get('q') || '';

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { username: { contains: query, mode: 'insensitive' } }
      ],
      NOT: {
        id: user.id // Exclude current user
      }
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      role: true,
      bio: true,
      connections: {
        where: {
          id: user.id
        },
        select: {
          id: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 50
  });

  return NextResponse.json(users);
}
