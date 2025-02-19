"use server";
import { prisma } from "@/lib/auth";

export async function getPosts() {

  console.log('getPosts: About to query posts');
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
      }
    }
  });

  console.log("all posts: ", posts);

  return posts;
}
