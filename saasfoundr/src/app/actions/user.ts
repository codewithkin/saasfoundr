'use server';

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";
import seed from "@/lib/seed";

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
