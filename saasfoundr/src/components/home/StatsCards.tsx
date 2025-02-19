'use client';

import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface StatsCardsProps {
  stats: {
    engagementRate: string;
    connections: number;
    communityPosts: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
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
          <h2 className="text-lg font-medium">Total Posts</h2>
        </CardHeader>
        <CardBody>
          <p className="text-2xl">{stats.communityPosts}</p>
        </CardBody>
      </Card>
    </div>
  );
}
