import { getAddressFromCoordinates , StudentBookingPending} from "@/Repo/Logic";
import { cookies } from "next/headers";


export async function GET(){
    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let history = [];
   
    if(userId){
     userId = parseInt(userId);
    history = await  StudentBookingPending(userId);

      for(const item of history){
       item.realAddress = await getAddressFromCoordinates(item.Adress_lnt,item.Adress_lng);
      }
    }

  return Response.json(history);
}