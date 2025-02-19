"use server";
import { prisma, auth } from "@/lib/auth";

export async function getPosts() {
  const session = await auth();
  const userId = session?.user?.id;

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
      likes: {
        where: userId ? {
          user: {
            id: userId
          }
        } : undefined,
        select: {
          id: true
        }
      },
      _count: {
        select: {
          likes: true
        }
      }
    }
  });

  const postsWithLikeInfo = posts.map(post => ({
    ...post,
    isLiked: post.likes.length > 0,
    likeCount: post._count.likes
  }));

  return postsWithLikeInfo;
}
