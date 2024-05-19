import { scanStudnet } from "@/Repo/driverLogic";
import { NextApiRequest } from "next";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let isValidated = false;
    const params = request.nextUrl.searchParams;

    if(params.get("idBooking")){

    if(userId){
     const bookingId = parseInt(params.get("idBooking"));
      isValidated = await scanStudnet(bookingId);
    }
    
    }

  return Response.json(isValidated);
}