'use client';

import Link from 'next/link';
import { Home, Users, Search, MessageSquare, Settings } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';

export function Sidebar() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  });

  return (
    <div className="flex min-h-screen flex-col justify-between border-r bg-background p-3">
      <article className="space-y-8">
        {/* App Icon */}
        <Link href="/home" className="flex items-center gap-2">
          <div className="h-8 w-8">
            <img src="/logo.png" alt="SaaSFoundr" className="h-full w-full object-contain" />
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/home"
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground"
                >
                  <Home className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/home/hub"
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground"
                >
                  <Users className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Hub</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/home/discover"
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground"
                >
                  <Search className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Discover</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/home/messages"
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground"
                >
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Messages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </article>

      <article className="space-y-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                href="/home/settings"
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent hover:text-accent-foreground"
              >
                <Settings className="h-5 w-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Link 
                href="/home/profile"
                className="block"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.image || ''} alt={user?.name || 'Profile'} />
                  <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </article>
    </div>
  );
}
