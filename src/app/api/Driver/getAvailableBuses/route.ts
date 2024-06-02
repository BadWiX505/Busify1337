import { availableBuses } from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";


export async function GET(){
   const {user}  = await validateRequest();
    if(user && user.role==='driver' && !user.busId && user.status==='active'){
        const avBuses = await availableBuses();
        return Response.json(avBuses,{status : 200});
    }
    else{
        return Response.json('Unauthorized',{status : 401})
    }
}
