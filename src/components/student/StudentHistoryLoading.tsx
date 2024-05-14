import { Skeleton } from "../ui/skeleton";
import { TableCell, TableRow } from "../ui/table";



export default function StudentHistoryLoading({ limit }) {
    const loadingRows = Array.from({ length: limit }).map((_, index) => (
      <TableRow key={index}>
        <TableCell colSpan={5}>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        </TableCell>
      </TableRow>
    ));
  
    return <>{loadingRows}</>;
  }