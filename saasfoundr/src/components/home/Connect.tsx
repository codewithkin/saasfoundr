'use client';

import { User } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { connectWithUser } from "@/app/actions/connect";
import { useState } from "react";
import { toast } from "sonner";
import { getCurrentUser } from "@/app/actions/user";
import { useQuery } from "@tanstack/react-query";
import { UserSkeletonList } from "@/components/skeletons/UserSkeleton";
import { Loader2 } from "lucide-react";

interface ConnectProps {
  users: (User & { isConnected: boolean })[]
}

export function Connect({ users: initialUsers }: ConnectProps) {
  const [users, setUsers] = useState(initialUsers);
  const [loading, setLoading] = useState<string | null>(null);

  const { data: currentUser, isLoading: isCurrentUserLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
    enabled: !!initialUsers,
  });

  const handleConnect = async (userId: string) => {
    try {
      setLoading(userId);
      const result = await connectWithUser(userId);
      
      if (result.success) {
        setUsers(users.map(user => {
          if (user.id === userId) {
            return { ...user, isConnected: result.isConnected };
          }
          return user;
        }));
        
        toast.success(
          result.isConnected
            ? `You're now following ${result.targetUser.name}`
            : `You've unfollowed ${result.targetUser.name || ""}`
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update connection");
    } finally {
      setLoading(null);
    }
  };

  if (isCurrentUserLoading) {
    return <UserSkeletonList />;
  }

  return (
    <div className="space-y-4 scroll-effect">
      <h2 className="text-xl font-semibold">Connect</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
                <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <CardTitle className="text-lg">{user.name}</CardTitle>
                <CardDescription>{user.role}</CardDescription>
              </div>

              <Button 
                variant={user?.connections?.some((connection: User) => connection.id === currentUser?.id) ? "outline" : "default"}
                onClick={() => handleConnect(user.id)}
                disabled={loading === user.id}
              >
                {loading === user.id ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : user?.connections?.some((connection: User) => connection.id === currentUser?.id) ? (
                  "Connected"
                ) : (
                  "Connect"
                )}
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
