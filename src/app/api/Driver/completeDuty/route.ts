import { completeDuty } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
      const {user}  = await validateRequest();
    

             
        try{
            if(user && user.role==='driver' && user.busId && user.status==='active'){
                  const params = request.nextUrl.searchParams;
                  const idDuty = params.get("idDuty") ? parseInt(params.get("idDuty")) : null;
                  if(idDuty){
                  const res = await completeDuty(idDuty,user.idUser);
                  if(res){
                    return Response.json('success',{status : 200})
                  }
                  else{
                    throw new Error("errror");
                  }
                  }
            }
            return Response.json('Unauthorized',{status : 405})
        }catch(err){
            console.log(err)
            return Response.json('a problem happened',{status : 500})
        }
      
    
 
}