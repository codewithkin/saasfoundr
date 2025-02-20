'use server';

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/auth";

export async function getCurrentUser() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      username: true,
      role: true,
      field: true,
      lookingFor: true,
      bio: true,
      experience: true,
      interests: true,
      goals: true,
    },
  });

  return user;
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { not: null } },
        { name: { not: null } }
      ]
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true
    },
    orderBy: {
      username: 'asc'
    },
    take: 50 // Limit to 50 users for performance
  });

  return users;
}

export async function getLatestUsers() {
  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { not: null } },
        { name: { not: null } }
      ]
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      bio: true,
      createdAt: true
    },
    orderBy: {
      createdAt: 'desc'
    },
    take: 5 // Get 5 most recent users
  });

  return users;
}

export async function getRecommendedUsers() {
  const session = await auth();
  const user = session?.user;

  if (!user) {
    return [];
  }

  // Get users who are not connected with the current user
  const users = await prisma.user.findMany({
    where: {
      NOT: {
        OR: [
          { id: user.id }, // Exclude current user
          {
            connections: {
              some: {
                id: user.id
              }
            }
          }
        ]
      }
    },
    select: {
      id: true,
      name: true,
      username: true,
      image: true,
      role: true,
      bio: true,
      connections: {
        where: {
          id: user.id
        },
        select: {
          id: true
        }
      }
    },
    orderBy: [
      { createdAt: 'desc' } // Prioritize newer users
    ],
    take: 30 // Limit to 30 recommendations
  });

  return users;
}
