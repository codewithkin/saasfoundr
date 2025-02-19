import Sidebar from "@/components/sidebar/Sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/auth/signup');
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
