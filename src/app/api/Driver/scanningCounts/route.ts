import { scanningCounts } from "@/Repo/driverLogic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){

    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let counts = null;

    const params = request.nextUrl.searchParams;
     
   if(params){
    if(userId){
     counts = await scanningCounts(params.get("date"),params.get("time"),params.get("busName"))
    }
    }

  return Response.json(counts);
}