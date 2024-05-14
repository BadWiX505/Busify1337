import { getUserDefault } from "@/Repo/Logic";
import { cookies } from "next/headers";




export async function GET(){
     
   let userId ;
   userId = cookies().get("userId")?.value || null; 
   if(userId)
   userId = parseInt(userId) 
     var defUser = null;
     if(userId){
     const defaultUser = await getUserDefault(userId);
     defUser = defaultUser;
     }

     return Response.json({defU : defUser})
}