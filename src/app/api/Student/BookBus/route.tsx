import { bookBus } from "@/Repo/Logic"
import { validateRequest } from "@/lib/auth";

interface resType{
  status : number | null,
  message : string | null
}

export async function POST(request : Request){

    const {user}  = await validateRequest();
    var res : resType = {status : 401 ,message : "Unauthorised request!"}

   if(user && user.role==='student'){
   const booking = await request.json();
       
    if(booking){
     booking.id_User= user?.idUser;
    res = await  bookBus(booking);
    }

  }
  
    return new Response(JSON.stringify({msg : res}),{
      headers : {
        "Content-Type" : "application/json",
      },
      status : res.status ? res.status : 500,
   })
}