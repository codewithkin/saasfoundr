'use client';

import { Card, CardContent, CardHeader } from "../ui/card";

interface StatsCardsProps {
  stats: {
    engagementRate: number;
    connections: number;
    communityPosts: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
      <Card className="hover:cursor-pointer transition duration-300 hover:shadow-xl">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Engagement Rate</h2>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{stats.engagementRate}%</p>
        </CardContent>
      </Card>

      <Card className="hover:cursor-pointer transition duration-300 hover:shadow-xl">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Connections</h2>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{stats.connections}</p>
        </CardContent>
      </Card>

      <Card className="hover:cursor-pointer transition duration-300 hover:shadow-xl">
        <CardHeader className="pb-2">
          <h2 className="text-lg font-medium">Total Posts</h2>
        </CardHeader>
        <CardContent>
          <p className="text-2xl">{stats.communityPosts}</p>
        </CardContent>
      </Card>
    </div>
  );
}
