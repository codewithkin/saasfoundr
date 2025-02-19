import { auth } from "@/lib/auth";
import { TopBar } from "@/components/home/TopBar";

export default async function HomePage() {
  const session = await auth();

  return (
    <div className="h-screen flex flex-col">
      <TopBar user={session?.user} />
      
      <main className="flex-1 flex justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[300px_600px_300px] gap-4 p-4">
          {/* Connect Recommendations */}
          <article className="hidden md:block">
            <h2 className="text-xl font-semibold mb-4">Connect</h2>
            {/* Connect recommendations content will go here */}
          </article>

          {/* Posts Feed */}
          <article>
            <h2 className="text-xl font-semibold mb-4">Posts</h2>
            {/* Posts content will go here */}
          </article>

          {/* Empty Section */}
          <article className="hidden lg:block">
            <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
            {/* Future content will go here */}
          </article>
        </div>
      </main>
    </div>
  );
}