import { updateBusIdUsingUserId } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";

export async function GET(){
    const {user}  = await  validateRequest();
    if(user && user.role==='driver' && user.status==='active' && user.busId){
     const res = await updateBusIdUsingUserId(user.idUser,null);
     if(res){
        return Response.json('sucess',{status : 201});
     }
     else{
        return Response.json('something was wrong ',{status : 500});
     }

    }else{
        return Response.json('Unauthorized',{status : 401});
    }
}