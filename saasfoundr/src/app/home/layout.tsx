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
        <main className="flex-1 flex justify-center">
          <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-[300px_600px_300px] gap-4 p-4">
            <div className="hidden md:block">
              {connect}
            </div>
            <div>
              {posts}
            </div>
            <div className="hidden lg:block">
              {extras}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
