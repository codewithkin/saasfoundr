'use client';

import Link from 'next/link';
import { Home, Users, Search, MessageSquare, Settings } from 'lucide-react';
import { Avatar } from "@nextui-org/react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';
import Image from 'next/image';

export default function Sidebar() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between border-r bg-background p-3">
      <article className="space-y-8">
        {/* App Icon */}
        <Link href="/home" className="flex items-center gap-2">
        <Image 
          src="/brand/logo.png"
          alt="SaaSFoundr Logo"
          width={50}
          height={50}
        />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col justify-center items-center gap-6">
          <TooltipProvider>
            {/* Home */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home"
                  className="flex items-center gap-2"
                >
                  <Home className="h-6 w-6 icon-gradient" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Home</p>
              </TooltipContent>
            </Tooltip>

            {/* Hub */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home/hub"
                  className="flex items-center gap-2"
                >
                  <Users className="h-6 w-6 icon-gradient" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Hub</p>
              </TooltipContent>
            </Tooltip>

            {/* Discover */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home/discover"
                  className="flex items-center gap-2"
                >
                  <Search className="h-6 w-6 icon-gradient" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Discover</p>
              </TooltipContent>
            </Tooltip>

            {/* Messages */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home/messages"
                  className="flex items-center gap-2"
                >
                  <MessageSquare className="h-6 w-6 icon-gradient" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Messages</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </article>

      {/* Footer */}
      <footer className="space-y-6">
        <TooltipProvider>
          {/* Settings */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/home/settings"
                className="flex items-center gap-2"
              >
                <Settings className="h-6 w-6 icon-gradient" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>

          {/* Profile */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/home/profile"
                className="block"
              >
                <Avatar 
                  src={user?.image || undefined}
                  name={user?.name || undefined}
                  size="sm"
                  isBordered
                  className="transition-transform hover:scale-105"
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </footer>
    </div>
  );
}
