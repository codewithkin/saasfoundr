"use server";

import { prisma, auth } from "@/lib/auth";

export async function toggleLike(postId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  // Fetch the full user data using email
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the like already exists
  const existingLike = await prisma.like.findUnique({
    where: {
      postId_userId: {
        postId,
        userId: user.id
      }
    }
  });

  if (existingLike) {
    // Unlike: Delete the existing like
    await prisma.like.delete({
      where: {
        id: existingLike.id
      }
    });
    return false; // Indicates the post is now unliked
  } else {
    // Like: Create a new like
    await prisma.like.create({
      data: {
        postId,
        userId: user.id
      }
    });
    return true; // Indicates the post is now liked
  }
}