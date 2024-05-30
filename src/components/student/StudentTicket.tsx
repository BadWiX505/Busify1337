"use client"


import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { useEffect, useState } from "react";
import TicketLoading from "./StudentTicketLoading";
import QRCodeGenerator from "../QR/qrComponent";

export default function StudentTicket({idBooking}) {
  
   const [ticket,setTicket] = useState(null);
   const [loading , setLoading] = useState(true);

   async function getStudentTicket(){
      const res = await fetch("/api/Student/getStudentTicket?idbooking="+idBooking);
      const Sticket = await res.json();
      setTicket(Sticket);
   }

   useEffect(()=>{
      if(ticket){
        setLoading(false);
      }
   },[ticket])

   useEffect(()=>{
       getStudentTicket();
   },[])

  return (
    <DialogContent className="sm:max-w-[500px]">
    <DialogHeader>
      <DialogTitle>Student Ticket</DialogTitle>
    </DialogHeader>

    {loading ? <TicketLoading />   :

    <Card className="w-full max-w-md p-6 grid gap-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage alt="Student" src="https://github.com/shadcn.png" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <div className="font-semibold">{ticket.full_name}</div>
          <div className="text-gray-500 dark:text-gray-400 text-sm">Student</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-1">
          <div className="text-gray-500 dark:text-gray-400 text-sm">Departure</div>
          <div className="font-medium">{ticket.depart_Time}</div>
        </div>
        <div className="grid gap-1">
          <div className="text-gray-500 dark:text-gray-400 text-sm">Date</div>
          <div className="font-medium">{ticket.depart_Date}</div>
        </div>
      </div>
      <div className="grid gap-1">
        <div className="text-gray-500 dark:text-gray-400 text-sm">Bus</div>
        <div className="font-medium">{ticket.bus_Name}</div>
      </div>
      <div className="flex justify-center">
        <QRCodeGenerator jsonData={ticket}/>
      </div>
    </Card> }

    </DialogContent>
    
  )
}