import { dutyPropsFromId, scanningCounts } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){

  const {user}  = await validateRequest();
  try{
 if(user && user.role==='driver' && user.busId && user.status==='active'){
  const params = request.nextUrl.searchParams;
  const idDuty = params.get('idDuty') ? parseInt(params.get('idDuty')) : null;
   const dutyProperties = await dutyPropsFromId(idDuty);
   if(dutyProperties){
     const counts = await scanningCounts(dutyProperties.duty_Date,dutyProperties.duty_Time,user.busId);
     if(counts){
        return Response.json(counts,{status : 200});
     }
     throw new Error('an internal error happened');

   }
   else{
    throw new Error('an internal error happened');
   }
}
}
catch(err){
  return Response.json('an internal server error happened',{status : 500})
}

}