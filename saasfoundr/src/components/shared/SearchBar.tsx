'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '../ui/input';

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export function SearchBar({ placeholder = 'Search...', onSearch }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-center">
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 w-5 h-5 text-gray-400" />
      </div>
    </form>
  );
}
