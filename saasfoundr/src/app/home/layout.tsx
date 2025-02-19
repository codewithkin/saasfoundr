import Sidebar from "@/components/sidebar/Sidebar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="flex md:flex-row flex-col-reverse min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto md:pb-0 pb-20">
        {children}
      </main>
    </div>
  );
}
