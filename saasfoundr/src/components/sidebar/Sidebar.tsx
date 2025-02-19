'use client';

import Link from 'next/link';
import { Home, Users, Search, MessageSquare, Settings } from 'lucide-react';
import {Avatar} from "@heroui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';

const iconStyles = {
  home: "text-[#00ff88] hover:text-[#00ff88]/80",
  hub: "text-[#ff00ff] hover:text-[#ff00ff]/80",
  discover: "text-[#00ffff] hover:text-[#00ffff]/80",
  messages: "text-[#ffff00] hover:text-[#ffff00]/80",
  settings: "text-[#ff3366] hover:text-[#ff3366]/80",
};

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
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent/10"
                >
                  <Home className={`h-5 w-5 ${iconStyles.home}`} />
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent/10"
                >
                  <Users className={`h-5 w-5 ${iconStyles.hub}`} />
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent/10"
                >
                  <Search className={`h-5 w-5 ${iconStyles.discover}`} />
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent/10"
                >
                  <MessageSquare className={`h-5 w-5 ${iconStyles.messages}`} />
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
                className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-accent/10"
              >
                <Settings className={`h-5 w-5 ${iconStyles.settings}`} />
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
                <Avatar 
                  src={user?.image || ""}
                  color='primary'
                  size='sm'
                  isBordered
                />
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
