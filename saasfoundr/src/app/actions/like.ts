"use server";

import { prisma } from "@/lib/auth";
import { auth } from "@/lib/auth";

export async function toggleLike(postId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const userId = session.user.id;

  // Check if the like already exists
  const existingLike = await prisma.like.findFirst({
    where: {
      postId,
      userId,
    },
  });

  if (existingLike) {
    // Unlike: Delete the existing like
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
    return false; // Indicates the post is now unliked
  } else {
    // Like: Create a new like
    await prisma.like.create({
      data: {
        postId,
        userId,
      },
    });
    return true; // Indicates the post is now liked
  }
}
