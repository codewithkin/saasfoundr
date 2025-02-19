import { auth } from "@/lib/auth";
import { TopBar } from "@/components/home/TopBar";
import { StatsSection } from "@/components/home/StatsSection";

export default async function HomePage() {
  const session = await auth();

  return (
    <div>
      <TopBar user={session?.user} />
      <div className="container mx-auto py-2 px-1">
        <StatsSection />
      </div>
    </div>
  );
}