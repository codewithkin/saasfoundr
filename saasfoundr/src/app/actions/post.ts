import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";

export async function getPosts() {
  const session = await auth();

  if (!session?.user?.email) {
    throw new Error("Not authenticated");
  }

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
