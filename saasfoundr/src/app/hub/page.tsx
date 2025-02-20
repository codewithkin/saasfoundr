import { getRecommendedUsers } from "@/app/actions/user";
import { ConnectUserCard } from "@/components/shared/ConnectUserCard";
import { SearchUsers } from "@/components/hub/SearchUsers";

export default async function HubPage() {
  // Get recommended users server-side
  const users = await getRecommendedUsers();

  return (
    <main className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Hub</h1>
        
        <SearchUsers />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Recommended Users</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map((user) => (
              <ConnectUserCard 
                key={user.id} 
                user={user}
                variant="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
