import { UpdateStudent } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import {z} from 'zod'

export async function POST(request : Request){

     const {user}  = await validateRequest();
     let res=null;
     let message = null;

     try{
      const addressShema = z.object({

      })
    if(user){
    const data = await request.json();
     res = await UpdateStudent(user.idUser,data);
    }
   }
   catch(err){
     
   }


    const result = res ? true : false;
    
   return new Response(JSON.stringify(result),{
      headers : {
        "Content-Type" : "application/json",
      },
      status : 201
   })
}



