import Skeleton from '@/components/ui/Skeleton';

export default function LoadingSkeleton() {
  return (
    <div className="space-y-4 p-4" aria-label="Laster innhold" role="status">
      <div className="flex gap-2 mb-4">
        <Skeleton className="h-6 w-16" count={5} />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex gap-3">
            <Skeleton className="h-12 w-9 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
