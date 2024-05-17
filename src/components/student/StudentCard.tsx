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



export default function StudentCard({ data }) {

  const [isDialogOpen , setisDialogOpen] = useState(false);



   function changeDialogeMode(){
      setisDialogOpen(!isDialogOpen)
   }
  function formatShortReadableDate(dateString: string) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Get time in HH:MM format from the date string
    const time = `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;

    return `${formattedDate}, ${date.getFullYear()} ${time}`;
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