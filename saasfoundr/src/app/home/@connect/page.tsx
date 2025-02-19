import { Connect } from "@/components/home/Connect";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function ConnectPage() {
  const session = await auth();
  
  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!currentUser?.looking_for) {
    return null;
  }

  const recommendedUsers = await prisma.user.findMany({
    where: {
      role: currentUser.looking_for,
      NOT: {
        email: session.user.email,
      },
    },
    take: 5,
  });

  return <Connect users={recommendedUsers} />;
}
