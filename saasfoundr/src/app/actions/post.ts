"use server";
import { prisma, auth } from "@/lib/auth";
import { z } from "zod";

const postSchema = z.object({
  content: z.string().min(1).max(500),
});

export async function createPost(data: z.infer<typeof postSchema>) {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Validate the input
  const validatedData = postSchema.parse(data);

  // Create the post
  const post = await prisma.post.create({
    data: {
      content: validatedData.content,
      authorId: user.id,
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true
        }
      },
      _count: {
        select: {
          likes: true,
          saves: true,
          comments: true
        }
      }
    }
  });

  return {
    ...post,
    isLiked: false,
    likeCount: 0,
    isSaved: false,
    saveCount: 0
  };
}

export async function getPosts() {
  const session = await auth();
  const user = session?.user?.email ? await prisma.user.findUnique({
    where: { email: session.user.email }
  }) : null;

  const posts = await prisma.post.findMany({
    orderBy: {
      created_at: 'desc'
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true
        }
      },
      likes: user ? {
        where: {
          userId: user.id
        },
        select: {
          id: true
        }
      } : undefined,
      saves: user ? {
        where: {
          userId: user.id
        },
        select: {
          id: true
        }
      } : undefined,
      _count: {
        select: {
          likes: true,
          saves: true,
          comments: true
        }
      }
    }
  });

  const postsWithInfo = posts.map(post => ({
    ...post,
    isLiked: post.likes?.length > 0,
    likeCount: post._count.likes,
    isSaved: post.saves?.length > 0,
    saveCount: post._count.saves
  }));

  return postsWithInfo;
}
