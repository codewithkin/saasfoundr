import { User } from "next-auth";

function getGreeting(name: string) {
  const hour = new Date().getHours();
  let timeGreeting = "Good evening";
  
  if (hour < 12) timeGreeting = "Good morning";
  else if (hour < 17) timeGreeting = "Good afternoon";
  
  return `${timeGreeting}, ${name}`;
}

interface TopBarProps {
  user: User | null | undefined;
}

export function TopBar({ user }: TopBarProps) {
  const firstName = user?.name?.split(" ")[0];
  const displayName = firstName || "user";
  const greeting = getGreeting(displayName);

  return (
    <div className="w-full border-b px-4 py-4 bg-background">
      <div className="container mx-auto">
        <h1 className="text-2xl font-medium">
          {greeting}
        </h1>
      </div>
    </div>
  );
}
