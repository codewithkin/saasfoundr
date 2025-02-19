"use server";

import { prisma, auth } from "@/lib/auth";

export async function toggleSave(postId: string) {
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

  // Check if the save already exists
  const existingSave = await prisma.save.findUnique({
    where: {
      postId_userId: {
        postId,
        userId: user.id
      }
    }
  });

  if (existingSave) {
    // Unsave: Delete the existing save
    await prisma.save.delete({
      where: {
        id: existingSave.id
      }
    });
    return false; // Indicates the post is now unsaved
  } else {
    // Save: Create a new save
    await prisma.save.create({
      data: {
        postId,
        userId: user.id
      }
    });
    return true; // Indicates the post is now saved
  }
}
