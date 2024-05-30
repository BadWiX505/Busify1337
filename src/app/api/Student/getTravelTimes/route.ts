import { getAlltravelTimes } from "@/app/server/db";
import { validateRequest } from "@/lib/auth";


export async function GET(){
    const {user} = await validateRequest();
    let res = null;
    
    if(user){
       const travelsTimes = await getAlltravelTimes();
        res = travelsTimes;
    }

    return Response.json(res);
}