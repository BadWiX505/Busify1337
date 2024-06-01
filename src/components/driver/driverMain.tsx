"use client"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { useContext, useEffect, useState } from "react"

import {
    format,
    addDays,
    subDays,
    isBefore,
    isAfter,
    startOfDay,
} from "date-fns";
import StudentHistoryLoading from "@/components/student/StudentHistoryLoading"
import { Dialog } from "@/components/ui/dialog"
import { DialogTrigger } from "@/components/ui/dialog"
import BookingsDetails from "@/components/driver/detailsModal"
import ScanButton from "@/components/driver/scanButton"
import DriveButton from "@/components/driver/driveButton"
import Link from "next/link"
import { formatDateToModern } from "@/utils/dateUtils"
import { UserContext } from "./driverParent"


export default function DriverMain() {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [popoverOpen, setPopoverOpen] = useState(false); // State to manage popover visibility
    const [duties, setDuties] = useState(null);
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setisDialogOpen] = useState(false);
    const [selectedDutyIndex, setSelectedDutyIndex] = useState(null);

    const user = useContext(UserContext);

   //////////////// handlers ///////////////////

   const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setPopoverOpen(false); // Close the popover after selecting a date
      };


      
    function changeDialogeMode(index) {
        setisDialogOpen(!isDialogOpen)
        setSelectedDutyIndex(index);
    }


    const togglePopover = () => {
        setPopoverOpen(!popoverOpen);
    };




    //////////// End handlers /////////////////////

    

    // Calculate the range of selectable dates
    const today = new Date();
    const minDate = subDays(today, 1); // Yesterday
    const maxDate = addDays(today, 7); // Today + 7 days

    // Function to check if a date is within the range
    const isSelectable = (date) => {
        return !isBefore(date, minDate) && !isAfter(date, maxDate);
    };

    // Modifier function to disable dates outside the range
    const modifiers = {
        disabled: (date) => !isSelectable(date),
    };


   



//////////// useEffects //////////////////

    useEffect(() => {
        if (duties) {
            setLoading(false);
           
        }

    }, [duties])


    useEffect(() => {
        filterWorkingHours();
    }, [selectedDate])


    




    //////// End use Effects ////////////////



    //////////////// async //////////////////

   

    async function filterWorkingHours() {
        setLoading(true)
        const res = await fetch("/api/Driver/getDuties?date=" + formatDateToModern(selectedDate));
        const duties = await res.json();
        if(duties)
        setDuties(duties);        
    }
 
    /////////////////////// end async /////////////






    

    return (
        <div key="1" className="flex flex-col items-center justify-center min-h-screen gap-8">

            <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <img
                    alt="Driver"
                    className="object-cover w-full h-full"
                    height={128}
                    src= {user ? user.image : ''}
                    style={{
                        aspectRatio: "128/128",
                        objectFit: "cover",
                    }}
                    width={128}
                />
            </div>
            <h1 className="text-3xl font-bold text-center">Welcome, <span className="text-[#A7E92F]">{user ? user.fullName : "Driver"}</span></h1>
            <div className="w-full max-w-4xl">
                <div className="flex items-center justify-between mb-4 px-4">
                    <h2 className="text-xl font-semibold">Filter By date</h2>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button className="flex items-center gap-2" variant="outline" onClick={togglePopover}>
                                <CalendarDaysIcon className="w-4 h-4" />
                                <span>
                                    {selectedDate
                                        ? format(selectedDate, "PPP")
                                        : "Select date"}
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="p-4 w-84">
                            <Calendar
                                mode="single"
                                onSelect={handleDateSelect}
                                modifiers={modifiers}
                                defaultValue={startOfDay(today)} // Default value should be today
                                minDate={minDate} // Limit selection from yesterday
                                maxDate={maxDate} // Limit selection to today + 7 days
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="border rounded-lg overflow-auto px-2 mb-3">
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="px-4 py-3 whitespace-nowrap">Time</TableHead>
                                <TableHead className="px-4 py-3 whitespace-nowrap">Date</TableHead>
                                <TableHead className="px-4 py-3 whitespace-nowrap">Bookings</TableHead>
                                <TableHead className="px-4 py-3 whitespace-nowrap">See Details</TableHead>
                                <TableHead className="px-4 py-3 whitespace-nowrap">Duty</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {loading ? <StudentHistoryLoading limit={3} /> : duties.map((duty, index) =>
                                <TableRow className="hover:bg-gray-100 dark:hover:bg-gray-800" key={index}>
                                    <TableCell className="px-4 py-3 whitespace-nowrap">{duty.time}</TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap">{duty.date}</TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap">{duty.count}</TableCell>
                                    <TableCell className="px-4 py-3 whitespace-nowrap">
                                        <Dialog onOpenChange={() => changeDialogeMode(index)} key={index}>
                                            <DialogTrigger key={index}>

                                                <EyeIcon className="w-4 h-4" />

                                            </DialogTrigger>
                                            {isDialogOpen && selectedDutyIndex === index && <BookingsDetails data={duty} />}
                                        </Dialog>
                                    </TableCell>


                                    <TableCell className="px-4 py-3 whitespace-nowrap text-">

                                        
                                        {duty.status == 'Pending' && duty.status}
                                        {duty.status == 'Scanning' && <Link href={{
                                            pathname: "/Application/Driver/Scanning",
                                            query: {
                                                idDuty : duty.idDuty,
                                            }
                                        }}> <ScanButton /> </Link>}

                                        {duty.status == 'Driving' && 
                                          <Link href={{
                                            pathname: "/Application/Driver/Driving",  
                                            query: {
                                                idDuty : duty.idDuty,
                                            }                                      
                                           }}>

                                          <DriveButton />

                                          </Link>
                                         }


                                         {
                                            duty.status == 'Completed' &&
                                            <span>{duty.status}</span>
                                         }


                                    </TableCell>


                                </TableRow>
                            )

                            }
                        </TableBody>
                    </Table>
                </div>
            </div>

        </div>
    )
}

function CalendarDaysIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
            <path d="M8 14h.01" />
            <path d="M12 14h.01" />
            <path d="M16 14h.01" />
            <path d="M8 18h.01" />
            <path d="M12 18h.01" />
            <path d="M16 18h.01" />
        </svg>
    )
}




function EyeIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    )
}


