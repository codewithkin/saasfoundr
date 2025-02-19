import Sidebar from "@/components/sidebar/Sidebar";

export default function HomeLayout({
  children,
  connect,
  posts,
  connections,
}: {
  children: React.ReactNode;
  connect: React.ReactNode;
  posts: React.ReactNode;
  connections: React.ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {/* Sidebar - Hidden on mobile, shown from md up */}
      <div className="hidden md:block md:w-64 md:flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full">
        {/* Page Header/Children */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {children}
        </div>

        {/* Main Grid Layout */}
        <main className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Sidebar - Connect Section */}
            <div className="hidden md:block md:col-span-3 lg:col-span-3 space-y-6">
              <div className="sticky top-24">
                {connect}
              </div>
            </div>

            {/* Main Feed - Posts */}
            <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-6">
              {posts}
            </div>

            {/* Right Sidebar - Connections */}
            <div className="hidden lg:block lg:col-span-3 space-y-6">
              <div className="sticky top-24">
                {connections}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
