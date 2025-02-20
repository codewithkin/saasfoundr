import { auth, prisma } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: {
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
