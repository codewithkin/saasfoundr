'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { UserPlus } from "lucide-react";

export function UserList({ searchQuery }: { searchQuery: string }) {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['hub-users', searchQuery],
    queryFn: async () => {
      const res = await fetch(`/api/users/search?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) throw new Error('Failed to fetch users');
      return res.json();
    }
  });

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user: User) => (
        <div key={user.id} className="flex items-center justify-between p-4 bg-card rounded-lg">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.image || undefined} />
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              {user.username && (
                <div className="text-sm text-muted-foreground">@{user.username}</div>
              )}
            </div>
          </div>
          <Button size="sm" variant="outline">
            <UserPlus className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      ))}
    </div>
  );
}
