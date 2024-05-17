import { cookies } from "next/headers";
import { getDutiesTimes}  from "@/Repo/driverLogic";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
     const params = request.nextUrl.searchParams;
    let userId ;
    userId = cookies().get("userId")?.value || null; 

    if(userId)
    userId = parseInt(userId) 
      var date = params.get("date") ? params.get("date") : null;
      var duties = null;
      if(userId){
      const res = await getDutiesTimes(userId,date);
      duties = res;
      }
 
      return Response.json(duties)
}