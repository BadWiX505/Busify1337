import { getAddressFromCoordinates , StudentBookingPending} from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";


export async function GET(){
     const {user} = await validateRequest();
      let history = null;

    if(user && user.role==='student'){
    history = await  StudentBookingPending(user.idUser);
    if(history){
      for(const item of history){
       item.realAddress = await getAddressFromCoordinates(item.Adress_lnt,item.Adress_lng);
      }
    }
    }
    else{
    return Response.json('Unauthorized',{status : 401})
    }

  return Response.json(history);
}