'use client';

import { connectWithUser } from "@/app/actions/connect";
import { getCurrentUser } from "@/app/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ConnectUserCardProps {
  user: User & { connections?: User[] };
  currentUser?: User | null;
  variant?: 'default' | 'compact';
}

export function ConnectUserCard({ user, currentUser, variant = 'default' }: ConnectUserCardProps) {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    try {
      setLoading(true);
      const result = await connectWithUser(user.id);
      
      if (result.success) {
        // Update both users in the React Query cache
        queryClient.setQueryData(['recommendedUsers'], (oldUsers: any) => 
          oldUsers?.map((u: any) => 
            u.id === user.id
              ? { ...u, connections: result.targetUser.connections }
              : u
          )
        );

        queryClient.setQueryData(['hub-users'], (oldUsers: any) => 
          oldUsers?.map((u: any) => 
            u.id === user.id
              ? { ...u, connections: result.targetUser.connections }
              : u
          )
        );

        if (currentUser) {
          queryClient.setQueryData(['user'], {
            ...currentUser,
            connections: result.currentUser.connections
          });
        }
        
        toast.success(
          result.isConnected
            ? `You're now following ${result.targetUser.name}`
            : `You've unfollowed ${result.targetUser.name}`
        );
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast.error("Failed to update connection");
    } finally {
      setLoading(false);
    }
  };

  const isConnected = user.connections?.some(connection => connection.id === currentUser?.id);

  if (variant === 'compact') {
    return (
      <div className="flex items-center justify-between p-4 bg-card rounded-lg">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.image || undefined} alt={user.name || "User"} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{user.name}</div>
            {user.username && (
              <div className="text-sm text-muted-foreground">@{user.username}</div>
            )}
          </div>
        </div>
        <Button 
          size="sm"
          variant={isConnected ? "outline" : "default"}
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : isConnected ? (
            "Connected"
          ) : (
            "Connect"
          )}
        </Button>
      </div>
    );
  }

  return (
    <Card>
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
          variant={isConnected ? "outline" : "default"}
          onClick={handleConnect}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : isConnected ? (
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
  );
}
