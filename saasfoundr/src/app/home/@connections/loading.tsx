import { Skeleton } from "@/components/ui/skeleton";

export default function ExtrasLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-32" />
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-24 w-full" />
        ))}
      </div>
    </div>
  );
}
