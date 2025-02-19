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
import { UserPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ConnectProps {
  users: User[];
}

export function Connect({ users }: ConnectProps) {
  return (
    <div className="space-y-4">
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
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{user.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="sm">
                <UserPlus className="w-4 h-4 mr-2" />
                Follow
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
