import { getCurrentUser, getLatestUsers } from "@/app/actions/user";
import { prisma } from "@/lib/auth";
import { SearchBar } from "@/components/shared/SearchBar";
import { ConnectUserCard } from "@/components/shared/ConnectUserCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
  const currentUser = await getCurrentUser();

  return (
    <div className="space-y-8 p-4 md:p-8">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle>Explore the SaaSFoundr commmunity</CardTitle>
          <CardDescription>
            Connect with founders, discover products, and join the conversation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SearchBar placeholder="Search for products, users, or posts..." />
        </CardContent>
      </Card>

      {/* New Users Section */}
      <Card>
        <CardHeader>
          <CardTitle>New Users</CardTitle>
          <CardDescription>
            Connect with the latest members of our community
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {latestUsers.map((user) => (
            <ConnectUserCard 
              key={user.id} 
              user={user} 
              currentUser={currentUser}
              variant="compact"
            />
          ))}
        </CardContent>
      </Card>

      {/* Trending SaaS Products Section */}
      <Card>
        <CardHeader>
          <CardTitle>Trending SaaS Products</CardTitle>
          <CardDescription>
            Discover the latest and most exciting SaaS products
          </CardDescription>
        </CardHeader>
        <CardContent>
          {trendingSaaS.length > 0 ? (
            <div className="space-y-4">
              {trendingSaaS.map((product) => (
                <div key={product.product_id} className="flex items-center space-x-4 p-4 rounded-lg border">
                  <img 
                    src={product.image || '/default-product.png'} 
                    alt={product.saas_name} 
                    className="w-10 h-10 rounded-lg"
                  />
                  <div>
                    <h3 className="font-semibold">{product.saas_name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xl text-muted-foreground">No SaaS products here</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
