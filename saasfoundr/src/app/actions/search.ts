'use server';

import { prisma } from "@/lib/auth";

export async function searchUsersAndProducts(query: string) {
  const searchTerm = query.trim();
  
  if (!searchTerm) {
    return {
      users: [],
      products: []
    };
  }

  const [users, products] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: 'insensitive' } },
          { username: { contains: searchTerm, mode: 'insensitive' } },
          { bio: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        connections: true
      },
      take: 5
    }),
    prisma.saaSProduct.findMany({
      where: {
        OR: [
          { saas_name: { contains: searchTerm, mode: 'insensitive' } },
          { description: { contains: searchTerm, mode: 'insensitive' } }
        ]
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      take: 5
    })
  ]);

  return {
    users,
    products
  };
}
