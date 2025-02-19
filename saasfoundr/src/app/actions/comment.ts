"use server";

import { prisma, auth } from "@/lib/auth";

export async function addComment(postId: string, content: string, parentId?: string) {
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

  // Create the comment
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      userId: user.id,
      parentId
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true
        }
      }
    }
  });

  return comment;
}

export async function getComments(postId: string) {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
      parentId: null // Only get top-level comments
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true
        }
      },
      replies: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
              role: true
            }
          }
        }
      },
      _count: {
        select: {
          replies: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return comments;
}
