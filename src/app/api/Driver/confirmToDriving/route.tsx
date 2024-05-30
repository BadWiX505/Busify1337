import { dutyConfirm } from "@/Repo/driverLogic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let isConfirmed = false;
    const params = request.nextUrl.searchParams;

    if(params.get("idDuty")){

    if(userId){
      userId = parseInt(userId);
     const dutyId = parseInt(params.get("idDuty"));
      isConfirmed = await dutyConfirm(dutyId,userId);
    }
    
    }

  return Response.json(isConfirmed);
}