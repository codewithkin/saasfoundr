'use client';

import { UserList } from "@/components/hub/UserList";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export default function HubPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Hub</h1>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search users..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <UserList searchQuery={searchQuery} />
      </div>
    </main>
  );
}
