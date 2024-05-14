import { StudentBookingHistory, getAddressFromCoordinates } from "@/Repo/Logic";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let history = [];
    if(userId){
   const params = request.nextUrl.searchParams;
   const  offset = parseInt(params.get("offset"));
   const  limit = parseInt(params.get("limit"));
    userId = parseInt(userId);
    history = await  StudentBookingHistory(userId,offset,limit)
      for(const item of history.booking){
       item.realAddress = await getAddressFromCoordinates(item.Adress_lnt,item.Adress_lng);
      }
    }

  return Response.json(history);
}