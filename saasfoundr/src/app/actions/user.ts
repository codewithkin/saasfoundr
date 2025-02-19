'use server';

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      username: true,
      role: true,
      field: true,
      lookingFor: true,
      bio: true,
      experience: true,
      interests: true,
      goals: true,
    },
  });

  return user;
}

export async function searchUsers(query: string) {
  if (!query || query.length < 1) {
    return [];
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { username: { contains: query, mode: 'insensitive' } }
      ]
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true
    },
    take: 5
  });

  return users;
}
