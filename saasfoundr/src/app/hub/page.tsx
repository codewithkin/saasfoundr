import { getRecommendedUsers } from "@/app/actions/user";
import { SearchUsers } from "@/components/hub/SearchUsers";
import { UserTabs } from "@/components/hub/UserTabs";

export default async function HubPage() {
  // Get recommended users server-side
  const recommendedUsers = await getRecommendedUsers();

  return (
    <main className="container max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold">Hub</h1>
        
        <SearchUsers />

        <UserTabs recommendedUsers={recommendedUsers} />
      </div>
    </main>
  );
}
