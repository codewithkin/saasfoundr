import { auth } from "@/lib/auth";
import { TopBar } from "@/components/home/TopBar";

export default async function HomePage() {
  const session = await auth();

  return (
    <div>
      <TopBar user={session?.user} />
    </div>
  );
}