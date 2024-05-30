"use client"


import { Button } from "@/components/ui/button"
import { DialogTitle, DialogDescription, DialogHeader, DialogFooter, DialogContent } from "@/components/ui/dialog"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useEffect, useState } from "react";
import StudentHistoryLoading from "@/components/student/StudentHistoryLoading"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const OFFSET = 3;
const LIMIT = 3;

export default function BookingsDetails({ data }) {


    const [page, setPage] = useState(0);
    const [hasMoreRows, setHasMoreRows] = useState(true); // State to track if there are more rows
    const [loading, setLoading] = useState(true);
    const [details, setDetails] = useState(null);


    async function fetchDetails() {

        const res = await fetch(`/api/Driver/getBookingsDetails?date=${data.date}&time=${data.time}&limit=${LIMIT}&offset=${page}`);
        const STdetails = await res.json();
        setHasMoreRows(STdetails.length <= LIMIT && STdetails.length >= 1); // Check if there are more rows
        setDetails(STdetails);
    }



    useEffect(() => {
        fetchDetails();
    }, [page])

    useEffect(() => {
        if (details) {
            setLoading(false);
        }
    }, [details])


    function next() {
        if (hasMoreRows) {
            setLoading(true)
            setPage(pre => pre + OFFSET);
        }
    }

    function previous() {
        if (page >= OFFSET) {
            setLoading(true);
            setPage(pre => pre - OFFSET);
        }
    }






    return (

        <DialogContent className="sm:max-w-[1000px]">
            <DialogHeader>
                <DialogTitle>Bookings Details</DialogTitle>
                <DialogDescription className="mt-2">View more student bookings details.</DialogDescription>
            </DialogHeader>
            <div className="w-full overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px] md:w-auto"> Studnet</TableHead>
                            <TableHead className="w-[200px] md:w-auto">Destination</TableHead>

                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading && <StudentHistoryLoading limit={LIMIT} />}


                        {!loading &&

                            details.map((row, index) => (
                                <TableRow key={index}>

                                    <TableCell className="flex text-center items-center gap-3">
                                        <Avatar>
                                        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                      {row.user.full_name}</TableCell>
                                    <TableCell>{row.destination}</TableCell>
                                </TableRow>
                            )
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