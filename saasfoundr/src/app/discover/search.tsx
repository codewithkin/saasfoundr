'use client';

import { searchUsersAndProducts } from "@/app/actions/search";
import { ConnectUserCard } from "@/components/shared/ConnectUserCard";
import { SearchBar } from "@/components/shared/SearchBar";
import { CardContent } from "@/components/ui/card";
import { useDebounce } from "@/hooks/useDebounce";
import { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";

interface SearchSectionProps {
  currentUser: User | null;
}

export function SearchSection({ currentUser }: SearchSectionProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const performSearch = useCallback(async (query: string) => {
    setIsSearching(true);
    try {
      const results = await searchUsersAndProducts(query);
      setUsers(results.users);
      setProducts(results.products);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // Effect to handle debounced search
  useEffect(() => {
    if (debouncedSearchTerm) {
      performSearch(debouncedSearchTerm);
    } else {
      setUsers([]);
      setProducts([]);
    }
  }, [debouncedSearchTerm, performSearch]);

  return (
    <CardContent>
      <SearchBar 
        placeholder="Search for products, users, or posts..." 
        value={searchTerm}
        onChange={(value) => setSearchTerm(value)}
      />
      
      {debouncedSearchTerm && (
        <div className="mt-6 space-y-6">
          {/* Users Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Users</h3>
            <div className="space-y-4">
              {users.length > 0 ? (
                users.map((user) => (
                  <ConnectUserCard
                    key={user.id}
                    user={user}
                    currentUser={currentUser}
                    variant="compact"
                  />
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No users found matching "{debouncedSearchTerm}"
                </p>
              )}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">SaaS Products</h3>
            <div className="space-y-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product.product_id} className="flex items-center space-x-4 p-4 rounded-lg border">
                    <img
                      src={product.image || '/default-product.png'}
                      alt={product.saas_name}
                      className="w-10 h-10 rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{product.saas_name}</h3>
                      <p className="text-sm text-muted-foreground">{product.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No products found matching "{debouncedSearchTerm}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </CardContent>
  );
}
