import { Skeleton } from '@/components/ui/skeleton'

export const SkeletonLoader = () => {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-6 w-[260px]" />
      <div>
        <Skeleton className="h-6 w-96" />
        <Skeleton className="mt-1 h-6 w-96" />
      </div>
      <Skeleton className="h-10 w-28" />
    </div>
  )
}
