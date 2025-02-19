import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Card, CardHeader, CardBody } from "@nextui-org/react";

async function getStats() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const userId = session.user.id;

  const stats = await prisma.$transaction(async (tx) => {
    // Get total content count (posts, comments, etc.)
    const totalContent = await tx.post.count({
      where: { userId }
    });

    // Get total engagement (likes, comments on user's content)
    const totalEngagements = await tx.engagement.count({
      where: {
        post: {
          userId
        }
      }
    });

    // Calculate engagement rate
    const engagementRate = totalContent > 0 
      ? ((totalEngagements / totalContent) * 100).toFixed(1)
      : "0.0";

    // Get connection count
    const connections = await tx.connection.count({
      where: {
        OR: [
          { userId },
          { connectedUserId: userId }
        ],
        status: "ACCEPTED"
      }
    });

    // Get community posts count
    const communityPosts = await tx.post.count({
      where: {
        communityId: {
          not: null
        },
        userId
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

  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Engagement Rate</h2>
        </CardHeader>
        <CardBody>
          <p className="text-2xl">{stats.engagementRate}%</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Connections</h2>
        </CardHeader>
        <CardBody>
          <p className="text-2xl">{stats.connections}</p>
        </CardBody>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Community Posts</h2>
        </CardHeader>
        <CardBody>
          <p className="text-2xl">{stats.communityPosts}</p>
        </CardBody>
      </Card>
    </div>
  );
}
