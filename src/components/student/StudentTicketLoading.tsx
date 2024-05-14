
import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export default function TicketLoading() {
  return (
    <Card className="w-full max-w-md p-6 grid gap-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[150px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[60px]" />
        </div>
        <div className="grid gap-1">
          <Skeleton className="h-4 w-[80px]" />
          <Skeleton className="h-4 w-[100px]" />
        </div>
      </div>
      <div className="grid gap-1">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-4 w-[120px]" />
      </div>
      <div className="flex justify-center">
        <Skeleton className="h-30 w-30" />
      </div>
    </Card>
  )
}