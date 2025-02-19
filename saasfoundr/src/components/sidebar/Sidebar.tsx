'use client';

import Link from 'next/link';
import { Home, Users, Search, MessageSquare, Settings } from 'lucide-react';
import { Avatar } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';
import Image from 'next/image';
import { MobileNav } from './MobileNav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Sidebar() {
  const pathname = usePathname();
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex min-h-screen flex-col items-start justify-between border-r bg-background p-3">
        <article className="space-y-8 w-full">
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
          <nav className="flex flex-col gap-6 w-full">
            <Link
              href="/home"
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                pathname === "/home" 
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-accent/10"
              )}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>

            <Link
              href="/home/hub"
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                pathname === "/home/hub"
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-accent/10"
              )}
            >
              <Users className="h-5 w-5" />
              <span>Hub</span>
            </Link>

            <Link
              href="/home/discover"
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                pathname === "/home/discover"
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-accent/10"
              )}
            >
              <Search className="h-5 w-5" />
              <span>Discover</span>
            </Link>

            <Link
              href="/home/messages"
              className={cn(
                "flex items-center gap-3 p-2 rounded-lg transition-colors",
                pathname === "/home/messages"
                  ? "bg-blue-500 text-white font-semibold"
                  : "hover:bg-accent/10"
              )}
            >
              <MessageSquare className="h-5 w-5" />
              <span>Messages</span>
            </Link>
          </nav>
        </article>

        {/* Footer */}
        <footer className="space-y-4 w-full">
          <Link
            href="/home/settings"
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg transition-colors",
              pathname === "/home/settings"
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-accent/10"
            )}
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>

          <Link
            href="/home/profile"
            className={cn(
              "flex items-center gap-3 p-2 rounded-lg transition-colors",
              pathname === "/home/profile"
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-accent/10"
            )}
          >
            <Avatar 
              src={user?.image || undefined}
              name={user?.name || undefined}
              size="sm"
              isBordered
              className="transition-transform hover:scale-105"
            />
            <span>Profile</span>
          </Link>
        </footer>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  );
}
