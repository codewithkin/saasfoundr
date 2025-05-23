'use client';

import { MobileNav } from "@/components/sidebar/MobileNav";
import Sidebar from "@/components/sidebar/Sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Mobile navigation */}
      <MobileNav className="lg:hidden" />
    </div>
  );
}
