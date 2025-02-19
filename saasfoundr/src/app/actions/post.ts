"use server";
import { prisma, auth } from "@/lib/auth";

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
