import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import StudentTicket from "./StudentTicket";
import { useState } from "react";
import { formatShortReadableDate } from "@/utils/dateUtils";



export default function StudentCard({ data }) {

  const [isDialogOpen , setisDialogOpen] = useState(false);



   function changeDialogeMode(){
      setisDialogOpen(!isDialogOpen)
   }

  function extractFirstName(locationString: string) {
    var addr = "";
    if (locationString.split(',').length <= 3) {
      addr = locationString.split(',')[0].trim();
    }
    else {
      addr = locationString.split(',')[0].trim() + ',' + locationString.split(',')[1].trim();
    }
    return addr;
  }

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-lg max-w-md mx-auto relative overflow-hidden">
      <div className="absolute w-100 h-50 bg-[#A7E92F] rounded-full"    style={{ width: '200px', height: '200px',top : '-20%', left: '-20%' , zIndex : '0'}}></div>
      <div className="absolute w-100 h-50 bg-[#A7E92F] rounded-full"    style={{ width: '200px', height: '200px',top : '55%', right: '-20%' , zIndex : '0'}}></div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold relative z-3">Bus Ticket</h2>
        <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium ">Booked</div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="relative z-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 ">Destination</p>
          <p className="font-medium">{extractFirstName(data.realAddress)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="relative z-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Bus Name</p>
          <p className="font-medium">{data.bus.bus_Name}</p>
        </div>
        <div className="relative z-3">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">BookedAt</p>
          <p className="font-medium">{formatShortReadableDate(data.bookedAt)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4 relative z-3">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Departure Time</p>
          <p className="font-medium">{data.depart_Time}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">Departure Date</p>
          <p className="font-medium">{data.depart_Date}</p>
        </div>
      </div>
      <div className="mt-6 flex justify-end relative z-3">
      
        <Dialog onOpenChange={changeDialogeMode}>
        <DialogTrigger asChild>
        <Button size="sm" variant="outline" className=" bg-transparent hover:bg-black hover:text-white">
          Get ticket
        </Button>
        </DialogTrigger>
        {isDialogOpen &&
        <StudentTicket idBooking = {data.id_Booking}/>
          }
        </Dialog>
      </div>
    </div>
  )
}





/*
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import StudentTicket from "./StudentTicket";
import { useState } from "react";
import { formatShortReadableDate } from "@/utils/dateUtils";



export default function StudentCard({ data }) {

  const [isDialogOpen , setisDialogOpen] = useState(false);



   function changeDialogeMode(){
      setisDialogOpen(!isDialogOpen)
   }

  function extractFirstName(locationString: string) {
    var addr = "";
    if (locationString.split(',').length <= 3) {
      addr = locationString.split(',')[0].trim();
    }
    else {
      addr = locationString.split(',')[0].trim() + ',' + locationString.split(',')[1].trim();
    }
    return addr;
  }

  return (
    <Card
      style={{
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('https://img.freepik.com/free-vector/flat-polygonal-background_23-2148919305.jpg?w=826&t=st=1714900403~exp=1714901003~hmac=aca0f56a7bd17076ce6f50cba79a3e1907feb08285779afdc1c9fdb475d2babc')",
      }}
    >
      <CardHeader>
        <CardTitle>{data.bus.bus_Name}</CardTitle>
        <CardDescription>Booked At : {formatShortReadableDate(data.bookedAt)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-lg font-bold">{extractFirstName(data.realAddress)}</div>
            <div className="text-gray-600">Destination</div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <div className="text-lg font-bold">{data.depart_Time}</div>
            <div className="text-gray-600">Depart time</div>
          </div>
          <div>
            <div className="text-lg font-bold">{data.depart_Date}</div>
            <div className="text-gray-600">Depart date</div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Dialog onOpenChange={changeDialogeMode}>
        <DialogTrigger asChild>
        <Button>Get ticket</Button>
        </DialogTrigger>
        {isDialogOpen &&
        <StudentTicket idBooking = {data.id_Booking}/>
          }
        </Dialog>
      </CardFooter>
      

    </Card>
  )
}
*/