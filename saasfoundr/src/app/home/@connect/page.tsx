import { Connect } from "@/components/home/Connect";
import { prisma } from "@/lib/auth";
import { auth } from "@/lib/auth";

export default async function ConnectPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      connections: true
    }
  });
  
  const recommendedUsers = await prisma.user.findMany({
    where: {
      role: currentUser?.lookingFor,
      NOT: {
        email: session.user.email,
      },
    },
    take: 5,
    include: {
      connections: true,
      followedBy: true
    }
  });
  
  const usersWithConnectionStatus = recommendedUsers.map(user => ({
    ...user,
    isConnected: currentUser?.connections.some(
      connection => connection.id === user.id
    )
  }));

  if(recommendedUsers.length > 0) {
    return <Connect users={usersWithConnectionStatus} />;
  }

  const allUsers = await prisma.user.findMany({
    include: {
      connections: true
    }
  });

  return <Connect users={allUsers} />;
}
