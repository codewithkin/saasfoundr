'use client';

import Link from 'next/link';
import { Home, Users, Search, MessageSquare, Settings } from 'lucide-react';
import { Avatar } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';
import Image from 'next/image';
import { MobileNav } from './MobileNav';

export default function Sidebar() {
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
              className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-lg transition-colors"
            >
              <Home className="h-5 w-5 icon-gradient" />
              <span className="font-medium">Home</span>
            </Link>

            <Link
              href="/home/hub"
              className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-lg transition-colors"
            >
              <Users className="h-5 w-5 icon-gradient" />
              <span className="font-medium">Hub</span>
            </Link>

            <Link
              href="/home/discover"
              className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-lg transition-colors"
            >
              <Search className="h-5 w-5 icon-gradient" />
              <span className="font-medium">Discover</span>
            </Link>

            <Link
              href="/home/messages"
              className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-lg transition-colors"
            >
              <MessageSquare className="h-5 w-5 icon-gradient" />
              <span className="font-medium">Messages</span>
            </Link>
          </nav>
        </article>

        {/* Footer */}
        <footer className="space-y-4 w-full">
          <Link
            href="/home/settings"
            className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5 icon-gradient" />
            <span className="font-medium">Settings</span>
          </Link>

          <Link
            href="/home/profile"
            className="flex items-center gap-3 hover:bg-accent/10 p-2 rounded-lg transition-colors"
          >
            <Avatar 
              src={user?.image || undefined}
              name={user?.name || undefined}
              size="sm"
              isBordered
              className="transition-transform hover:scale-105"
            />
            <span className="font-medium">Profile</span>
          </Link>
        </footer>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </>
  );
}
