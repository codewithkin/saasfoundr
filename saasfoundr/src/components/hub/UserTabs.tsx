'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ConnectUserCard } from "@/components/shared/ConnectUserCard";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "@/app/actions/user";
import { UserSkeletonList } from "@/components/skeletons/UserSkeleton";

interface UserTabsProps {
  recommendedUsers: User[];
}

export function UserTabs({ recommendedUsers }: UserTabsProps) {
  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  });

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ['all-users'],
    queryFn: async () => {
      const res = await fetch('/api/users/all');
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    }
  });

  return (
    <Tabs defaultValue="recommended" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="all">All Users</TabsTrigger>
        <TabsTrigger value="recommended">Recommended</TabsTrigger>
      </TabsList>

      <TabsContent value="all" className="space-y-4">
        {isLoading ? (
          <UserSkeletonList />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allUsers?.map((user: User) => (
              <ConnectUserCard 
                key={user.id} 
                user={user}
                currentUser={currentUser}
                variant="compact"
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="recommended" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recommendedUsers.map((user) => (
            <ConnectUserCard 
              key={user.id} 
              user={user}
              currentUser={currentUser}
              variant="compact"
            />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
