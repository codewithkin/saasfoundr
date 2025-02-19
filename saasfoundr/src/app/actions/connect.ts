'use server';

import { prisma } from "@/lib/auth";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function connectWithUser(userId: string) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      throw new Error("Not authenticated");
    }

    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: {
        connections: true
      }
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!targetUser) {
      throw new Error("Target user not found");
    }

    const isCurrentlyConnected = currentUser.connections.some(
      connection => connection.id === userId
    );

    if (isCurrentlyConnected) {
      // Disconnect
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          connections: {
            disconnect: { id: userId }
          }
        }
      });
    } else {
      // Connect
      await prisma.user.update({
        where: { id: currentUser.id },
        data: {
          connections: {
            connect: { id: userId }
          }
        }
      });

      // Create an opposite connection
      // TODO: In future, the other user has to accept the connection request for it to work
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          connections: {
            connect: { id: currentUser.id }
          }
        }
      })
    }

    // Get updated connection status for both users
    const [updatedCurrentUser, updatedTargetUser] = await Promise.all([
      prisma.user.findUnique({
        where: { id: currentUser.id },
        include: {
          connections: true
        }
      }),
      prisma.user.findUnique({
        where: { id: userId },
        include: {
          connections: true
        }
      })
    ]);

    const isNowConnected = updatedCurrentUser?.connections.some(
      connection => connection.id === userId
    ) ?? false;

    revalidatePath('/home');

    return { 
      success: true, 
      isConnected: isNowConnected,
      targetUser: {
        id: targetUser.id,
        name: targetUser.name,
        connections: updatedTargetUser?.connections || []
      },
      currentUser: {
        connections: updatedCurrentUser?.connections || []
      }
    };
  } catch (error) {
    console.error('Error connecting with user:', error);
    return { success: false, error: 'Failed to connect with user' };
  }
}
