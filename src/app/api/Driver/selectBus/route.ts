import { driverToBus } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function PATCH(request : NextRequest){
  
  const {user} = await validateRequest();
  if(user && user.role==='driver' && !user.busId && user.status==='active'){
    const idBus = await  request.json();
    const isASigned = await driverToBus(user.idUser,idBus);
    if(!isASigned)
      return Response.json('error',{status : 500})

    return Response.json('updated successfully',{status : 201})
  }
  else{
    return Response.json('Unauthorizes',{status : 401})
  }

}