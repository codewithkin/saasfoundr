"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";

export async function getMyConnections() {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    include: {
      connections: {
        select: {
          id: true,
          name: true,
          username: true,
          image: true,
          role: true,
          field: true
        }
      }
    }
  });

  return currentUser?.connections || [];
}
