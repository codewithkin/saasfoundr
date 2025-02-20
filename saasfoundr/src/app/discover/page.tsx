import { getLatestUsers } from "@/app/actions/user";
import { prisma } from "@/lib/auth";
import { SearchBar } from "@/components/shared/SearchBar";

async function getLatestSaaSProducts() {
  const products = await prisma.saaSProduct.findMany({
    take: 5,
    orderBy: {
      createdAt: 'desc'
    },
    include: {
      creator: {
        select: {
          id: true,
          name: true,
          image: true
        }
      }
    }
  });
  return products;
}

export default async function DiscoverPage() {
  const latestUsers = await getLatestUsers();
  const trendingSaaS = await getLatestSaaSProducts();

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Search Section */}
      <article className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Explore the SaaSFoundr commmunity</h2>
        <SearchBar placeholder="Search for products, users, or posts..." />
      </article>

      {/* New Users Section */}
      <article className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">New Users</h2>
        <div className="space-y-4">
          {latestUsers.map((user) => (
            <div key={user.id} className="flex items-center space-x-4">
              <img 
                src={user.image || '/default-avatar.png'} 
                alt={user.name || 'User'} 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-600">{user.bio || 'No bio yet'}</p>
              </div>
            </div>
          ))}
        </div>
      </article>

      {/* Trending SaaS Products Section */}
      <article className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">Trending SaaS Products</h2>
        {trendingSaaS.length > 0 ? (
          <div className="space-y-4">
            {trendingSaaS.map((product) => (
              <div key={product.product_id} className="flex items-center space-x-4">
                <img 
                  src={product.image || '/default-product.png'} 
                  alt={product.saas_name} 
                  className="w-10 h-10 rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{product.saas_name}</h3>
                  <p className="text-sm text-gray-600">{product.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className="text-xl text-gray-600">No SaaS products here</h3>
        )}
      </article>
    </div>
  );
}
