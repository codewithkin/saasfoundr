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
  });

  if (!currentUser?.lookingFor) {
    return null;
  }

  const recommendedUsers = await prisma.user.findMany({
    where: {
      role: currentUser.lookingFor,
      NOT: {
        email: session.user.email,
      },
    },
    take: 5,
  });

  if(recommendedUsers.length > 0) {
    return <Connect users={recommendedUsers} />;
  }

  const allUsers = await prisma.user.findMany();

  return <Connect users={allUsers} />;
}
