'use client';

import { User } from "@prisma/client";
import { getCurrentUser } from "@/app/actions/user";
import { useQuery } from "@tanstack/react-query";
import { UserSkeletonList } from "@/components/skeletons/UserSkeleton";
import { ConnectUserCard } from "@/components/shared/ConnectUserCard";

interface ConnectProps {
  users: (User & { isConnected: boolean })[]
}

export function Connect({ users: initialUsers }: ConnectProps) {
  const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!initialUsers,
  });

  const { data: users } = useQuery({
    queryKey: ['recommendedUsers'],
    queryFn: () => Promise.resolve(initialUsers),
    initialData: initialUsers
  });

  if (isCurrentUserLoading) {
    return <UserSkeletonList />;
  }

  return (
    <div className="space-y-4 scroll-effect">
      <h2 className="text-xl font-semibold">Connect</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <ConnectUserCard 
            key={user.id} 
            user={user} 
            currentUser={currentUser}
          />
        ))}
      </div>
    </div>
  );
}
