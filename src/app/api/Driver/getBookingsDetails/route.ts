import { bookingsDetails}  from "@/Repo/driverLogic";
import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/auth";
import { getAddressFromCoordinates } from "@/Repo/Logic";


export async function GET(request : NextRequest){
     const params = request.nextUrl.searchParams;
      const {user}  = await validateRequest();
    
       if(user && user.role==='driver' && user.busId && user.status==='active'){
      var date = params.get("date") ? params.get("date") : null;
      var time = params.get("time") ? params.get("time") : null;
      var offset = 0;
      var limit = 0;
      if(params.get("offset"))
       offset = parseInt(params.get("offset"));
      if(params.get("limit"))
       limit = parseInt(params.get("limit"))

      var details = null;
      if(user.idUser){
      const results = await bookingsDetails(user.busId,time,date,limit,offset);
      if(results){
        for(const res of results){
          res.destination = await getAddressFromCoordinates(res.Adress_lnt,res.Adress_lng);
        }
      }
    
      details = results;
      }
    }
 
      return Response.json(details)
}