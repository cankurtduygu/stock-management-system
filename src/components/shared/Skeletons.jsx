import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function FirmCardSkeleton() {
  return (
    <Card className="relative mx-auto flex h-full w-full max-w-sm flex-col overflow-hidden pt-0 shadow-lg">
      <Skeleton className="aspect-video w-full rounded-none" />

      <CardHeader className="flex-1 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </CardHeader>

      <CardFooter className="mt-auto flex gap-2">
        <Skeleton className="h-9 flex-1" />
        <Skeleton className="h-9 w-16" />
        <Skeleton className="h-9 w-20" />
      </CardFooter>
    </Card>
  );
}

export function FirmCardsSkeleton( { count }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, idx) => (
        <FirmCardSkeleton key={idx} />
      ))}
    </div>
  );
}
