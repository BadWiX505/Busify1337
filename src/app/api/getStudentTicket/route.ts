import { getAddressFromCoordinates , StudentTicket} from "@/Repo/Logic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){

    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let ticket = null;

    const params = request.nextUrl.searchParams;
    
   if(params.get("idbooking")){
    if(userId){
     const idbooking = parseInt(params.get("idbooking"));
     ticket = await  StudentTicket(idbooking);
     if(ticket)
     ticket.idBooking = parseInt(params.get("idbooking"));
    }
    }

  return Response.json(ticket);
}