
import { Skeleton } from "@/components/ui/skeleton"
import { CardContent, Card } from "@/components/ui/card"

export default function StudentCardLoading() {
  return (
    <Card className="w-full p-6 bg-white rounded-lg shadow">
      <CardContent>
        <Skeleton className="h-6 w-32 mb-6" />
        <Skeleton className="h-4 w-48 mb-2" />
        <Skeleton className="h-10 w-full mb-4" />
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-28" />
          </div>
          <div>
            <Skeleton className="h-8 w-24 mb-2" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}