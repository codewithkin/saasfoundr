import { User } from "next-auth";

function getGreeting() {
  const hour = new Date().getHours();
  
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

interface TopBarProps {
  user: User | null | undefined;
}

export function TopBar({ user }: TopBarProps) {
  const greeting = getGreeting();

  return (
    <div className="w-full border-b px-4 py-4 bg-background">
      <div className="container mx-auto">
        <h1 className="text-2xl font-medium">
          {greeting}, {user?.name?.split(" ")[0] || "there"}
        </h1>
      </div>
    </div>
  );
}
