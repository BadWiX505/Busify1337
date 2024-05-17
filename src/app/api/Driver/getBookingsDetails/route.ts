import { cookies } from "next/headers";
import { bookingsDetails, getDutiesTimes}  from "@/Repo/driverLogic";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
     const params = request.nextUrl.searchParams;
    let userId ;
    userId = cookies().get("userId")?.value || null; 

    if(userId)
    userId = parseInt(userId) 

    

      var date = params.get("date") ? params.get("date") : null;
      var time = params.get("time") ? params.get("time") : null;
      var limit = params.get("limit") ? params.get("limit") : null;
      var offset = params.get("offset") ? params.get("offset") : null;
      var details = null;
      if(userId){
      const res = await bookingsDetails(userId,time,date,limit,offset);
      details = res;
      }
 
      return Response.json(details)
}