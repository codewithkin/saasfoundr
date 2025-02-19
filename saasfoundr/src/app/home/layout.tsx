import Sidebar from "@/components/sidebar/Sidebar";

export default function HomeLayout({
  children,
  connect,
  posts,
  extras,
}: {
  children: React.ReactNode;
  connect: React.ReactNode;
  posts: React.ReactNode;
  extras: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        {children}
        <main className="flex-1 flex-col md:flex-row w-full justify-between">
          <div className="w-full flex flex-col md:flex-row gap-4 p-4">
            <div className="hidden md:block md:w-1/4">
              {connect}
            </div>
            <div className="md:w-2/4">
              {posts}
            </div>
            <div className="hidden lg:block md:w-1/4">
              {extras}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
