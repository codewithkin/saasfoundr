'use client';

import Link from 'next/link';
import { Home, Users, Search, MessageSquare, Settings, Flame, PlayCircle } from 'lucide-react';
import { Avatar } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';
import Image from 'next/image';
import { MobileNav } from './MobileNav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from '../ui/button';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex min-h-screen max-h-screen w-[70px] flex-col items-center justify-between border-r bg-background p-3">
        <article className="space-y-8">
          {/* App Icon */}
          <Link href="/home" className="flex items-center justify-center">
            <Image 
              src="/brand/logo.png"
              alt="SaaSFoundr Logo"
              width={40}
              height={40}
            />
          </Link>

          {/* Navigation */}
          <nav className="flex flex-col items-center gap-6">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/home"
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      pathname === "/home"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-accent/10"
                    )}
                  >
                    <Home className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Home</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/hub"
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      pathname === "/hub"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-accent/10"
                    )}
                  >
                    <Users className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Hub</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/discover"
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      pathname === "/discover"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-accent/10"
                    )}
                  >
                    <Search className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Discover</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/messages"
                    className={cn(
                      "p-2 rounded-lg transition-colors",
                      pathname === "/messages"
                        ? "bg-blue-500 text-white"
                        : "hover:bg-accent/10"
                    )}
                  >
                    <MessageSquare className="h-5 w-5" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Messages</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild className="relative bg-red-500 hover:bg-red-600 text-white">
                    <Link
                      href="/videos"
                      className={cn(
                        "p-2 rounded-lg transition-colors",
                        pathname === "/videos"
                          ? "bg-red-500 text-white"
                          : "hover:bg-red-500/10"
                      )}
                    >
                      <PlayCircle className="h-5 w-5" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Videos</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </nav>
        </article>

        {/* Footer */}
        <footer className="space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home/settings"
                  className={cn(
                    "p-2 rounded-lg transition-colors block",
                    pathname === "/home/settings"
                      ? "bg-blue-500 text-white"
                      : "hover:bg-accent/10"
                  )}
                >
                  <Settings className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/home/profile"
                  className={cn(
                    "block",
                    pathname === "/home/profile"
                      ? "bg-blue-500 rounded-full"
                      : ""
                  )}
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
              <TooltipContent side="right">Profile</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </footer>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  );
}
