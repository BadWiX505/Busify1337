import { cookies } from "next/headers";
import { getDutiesTimes}  from "@/Repo/driverLogic";
import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/auth";


export async function GET(request : NextRequest){
     const params = request.nextUrl.searchParams;
     const {user}  = await validateRequest();
    if(user && user.role==='driver'){

      var date = params.get("date") ? params.get("date") : null;
      var duties = null;
      
      if(user?.idUser){
      const res = await getDutiesTimes(user.idUser,date);
      duties = res;
      }

    }
 
      return Response.json(duties)
}