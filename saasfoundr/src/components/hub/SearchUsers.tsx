'use client';

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ConnectUserCard } from "@/components/shared/ConnectUserCard";
import { getCurrentUser } from "@/app/actions/user";
import { useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { UserSkeletonList } from "@/components/skeletons/UserSkeleton";

export function SearchUsers() {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 300);

  const { data: currentUser } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ['hub-users', debouncedQuery],
    queryFn: async () => {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(debouncedQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    },
    enabled: debouncedQuery.length > 0
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search users..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <UserSkeletonList />
      ) : searchQuery.length > 0 && users ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user: any) => (
            <ConnectUserCard 
              key={user.id} 
              user={user}
              currentUser={currentUser}
              variant="compact"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
