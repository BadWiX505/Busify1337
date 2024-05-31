import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/auth";
import { dutyConfirm } from "@/Repo/driverLogic";


export async function PATCH(request : NextRequest){
      const {user}  = await validateRequest();
    

             
        try{
            if(user && user.role==='driver' && user.busId){
              const data = await request.json();
              const idDuty = parseInt(data);
              const confirmation = await dutyConfirm(idDuty,user.idUser);
              if(!confirmation)
                return Response.json('failed to confirm',{status : 500});

              return Response.json('success',{status : 201});
            }
            else{
              return Response.json('Unauthorized',{status : 401})
            }
        }catch(err){
            console.log(err)
            return Response.json('a problem happened',{status : 500})
        }
      
    
 
}