import { auth } from "@/lib/auth";
import { TopBar } from "@/components/home/TopBar";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="h-screen flex flex-col">
      <TopBar user={session?.user} />
      
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr] lg:grid-cols-[250px_350px_1fr_300px] gap-4 p-4">
        {/* Connect Recommendations */}
        <div className="hidden md:block bg-card rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Connect</h2>
          {/* Connect recommendations content will go here */}
        </div>

        {/* Posts Feed */}
        <div className="bg-card rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Posts</h2>
          {/* Posts content will go here */}
        </div>

        {/* Empty Section */}
        <div className="hidden lg:block bg-card rounded-lg border p-4">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          {/* Future content will go here */}
        </div>
      </div>
    </div>
  );
}