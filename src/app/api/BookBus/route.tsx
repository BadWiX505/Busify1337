import { bookBus } from "@/Repo/Logic"
import { cookies } from "next/headers";

interface resType{
  status : number | null,
  message : string | null
}

export async function POST(request : Request){
  //  const booking = {
  //    id_User : 23,
  //    depart_time : '21:00',
  //    depart_date : '2024-05-10',
  //    adress_lat : 32.23372686,
  //    adress_lng : 6.38237632    
  //  }
   const booking = await request.json();
   var res : resType = {status : 500 ,message : "something went wrong !"}
   let userId;
  
   userId = cookies().get("userId")?.value || null; 
   if(userId)
   userId = parseInt(userId) 
  

   booking.id_User= userId;
    if(booking)
    res = await  bookBus(booking);
  
    return new Response(JSON.stringify({msg : res}),{
      headers : {
        "Content-Type" : "application/json",
      },
      status : 201
   })
}