import Link from 'next/link';
import { Home, Users, Search, MessageSquare } from 'lucide-react';
import { Avatar } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/app/actions/user';

export function MobileNav() {
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });

  return (
    <nav className="md:hidden flex items-center justify-center fixed bottom-0 w-full bg-background border-t px-2 py-4">
      <div className="flex items-center justify-between w-full max-w-md">
        <Link href="/home" className="flex items-center">
          <Home className="h-6 w-6 icon-gradient" />
        </Link>

        <Link href="/home/hub" className="flex items-center">
          <Users className="h-6 w-6 icon-gradient" />
        </Link>

        <Link href="/home/discover" className="flex items-center">
          <Search className="h-6 w-6 icon-gradient" />
        </Link>

        <Link href="/home/messages" className="flex items-center">
          <MessageSquare className="h-6 w-6 icon-gradient" />
        </Link>

        <Link href="/home/profile" className="flex items-center">
          <Avatar 
            src={user?.image || undefined}
            name={user?.name || undefined}
            size="sm"
            isBordered
            className="transition-transform hover:scale-105"
          />
        </Link>
      </div>
    </nav>
  );
}
