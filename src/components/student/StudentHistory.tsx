"use client"


import { Button } from "@/components/ui/button"
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent} from "@/components/ui/dialog"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react";
import StudentHistoryLoading from "@/components/student/StudentHistoryLoading"

const OFFSET = 3;
const LIMIT = 3;

export default function StudentHistory() {

    const [history, setHistory] = useState([]);
    const [page, setPage] = useState(0);
    const [hasMoreRows, setHasMoreRows] = useState(true); // State to track if there are more rows
    const [loading , setLoading] = useState(true);


    async function getHistory() {
        const res = await fetch(`/api/StudentHistory?limit=${LIMIT}&offset=${page}`);
        const resp = await res.json();
        const historYArray = resp.booking;
        setHasMoreRows(historYArray.length <= LIMIT && historYArray.length>=1); // Check if there are more rows
        setHistory(historYArray);
        setLoading(false);
    }

   useEffect(()=>{
     getHistory();
   },[page])

    function next(){
        if(hasMoreRows){
            setLoading(true)
        setPage(pre => pre + OFFSET);
        }
    }

    function previous(){
        if(page>=OFFSET){
        setLoading(true);
        setPage(pre => pre - OFFSET);
        }
    }


    function getBorderColor(bookingStatus) {
        switch (bookingStatus) {
          case 'Pending':
            return 'border-yellow-500';
          case 'Completed':
            return 'border-green-500';
          case 'Missed':
            return 'border-red-500';
          default:
            return 'border-gray-500'; // Default border color
        }
      }
      

    function formatDateTime(isoString : string | number | Date ) {
        const date = new Date(isoString);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return date.toLocaleDateString(undefined, options);
      }


    return (
        
            <DialogContent className="sm:max-w-[1000px]">
                <DialogHeader className="mt-2">
                    <DialogTitle className="my-2">Bookings History</DialogTitle>
                    <DialogDescription>View all your bookings</DialogDescription>
                </DialogHeader>
                <div className="w-full overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[200px] md:w-auto">Depart Time</TableHead>
                                <TableHead className="w-[200px] md:w-auto">Depart Date</TableHead>
                                <TableHead className="w-[200px] md:w-auto">Bus Name</TableHead>
                                <TableHead className="w-[150px] md:w-auto">Destination</TableHead>
                                <TableHead className="w-[100px] md:w-auto">Booked At</TableHead>
                                <TableHead className="w-[100px] md:w-auto">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading && <StudentHistoryLoading limit={LIMIT}/>}

                            {!loading &&

                            history.map(historyElemet => 
                                <TableRow key={historyElemet.bookedAt}>
                                    <TableCell>{historyElemet.depart_Time}</TableCell>
                                    <TableCell>{historyElemet.depart_Date}</TableCell>
                                    <TableCell>{historyElemet.bus.bus_Name}</TableCell>
                                    <TableCell>{historyElemet.realAddress}</TableCell>
                                    <TableCell> {formatDateTime(historyElemet.bookedAt)}</TableCell>
                                    <TableCell>
                                    <Badge className={`border ${getBorderColor(historyElemet.bookingStatus)} bg-white dark:bg-gray-950`} variant="outline">
                                            {historyElemet.bookingStatus}
                                        </Badge>
                                    </TableCell>
                                </TableRow>  
                            )
                            
                            }
                        


                        </TableBody>
                    </Table>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mt-4">
                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" onClick={previous}>
                            Previous
                        </Button>
                        <Button size="sm" variant="outline" onClick={next}>
                            Next
                        </Button>
                    </div>
                    <div className="mt-4 md:mt-0" />
                </div>
                <DialogFooter />
            </DialogContent>
        
    )
}