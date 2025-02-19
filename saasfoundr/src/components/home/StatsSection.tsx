import { auth, prisma } from "@/lib/auth";
import { StatsCards } from "./StatsCards";

async function getStats() {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      engagementRate: "0.0",
      connections: 0,
      communityPosts: 0
    };
  }

  const userId = session.user.id;

  const stats = await prisma.$transaction(async (tx) => {
    // Get total content count (posts)
    const totalContent = await tx.post.count({
      where: { user_id: userId }
    });

    // Get total engagements (connections and followers)
    const totalConnections = await tx.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            connections: true,
            followed_by: true
          }
        }
      }
    });

    // Calculate engagement rate based on connections and followers
    const totalEngagements = (totalConnections?._count.connections || 0) + 
                           (totalConnections?._count.followed_by || 0);
    
    const engagementRate = totalContent > 0 
      ? ((totalEngagements / totalContent) * 100).toFixed(1)
      : "0.0";

    // Get connection count
    const connections = totalConnections?._count.connections || 0;

    // Get total posts
    const communityPosts = await tx.post.count({
      where: {
        user_id: userId
      }
    });

    return {
      engagementRate,
      connections,
      communityPosts
    };
  });

  return stats;
}

export async function StatsSection() {
  const stats = await getStats();
  return <StatsCards stats={stats} />;
}
