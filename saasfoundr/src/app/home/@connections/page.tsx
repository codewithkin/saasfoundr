import { getMyConnections } from "@/app/actions/connections";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

export default async function ConnectionsPage() {
  const connections = await getMyConnections();

  if (!connections?.length) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No connections yet</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">My Connections</h2>
      {connections.map((connection) => (
        <Card key={connection.id} className="p-4 hover:bg-muted/50 transition-colors">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={connection.image || undefined} />
              <AvatarFallback>
                {connection.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{connection.name}</h3>
              <p className="text-sm text-muted-foreground">
                @{connection.username || "unnamed"}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {connection.role}
                </span>
                {connection.field && (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {connection.field}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
