import { getAddressFromCoordinates , StudentBookingPending, StudentTicket} from "@/Repo/Logic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){

    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let history = null;

    const params = request.nextUrl.searchParams;
    
   if(params.get("idbooking")){
    if(userId){
     const idbooking = parseInt(params.get("idbooking"));
     history = await  StudentTicket(idbooking);
    }
    }

  return Response.json(history);
}