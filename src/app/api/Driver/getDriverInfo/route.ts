import { cookies } from "next/headers";
import {driverInfo}  from "@/Repo/driverLogic";


export async function GET(){
     
    let userId ;
    userId = cookies().get("userId")?.value || null; 
    if(userId)
    userId = parseInt(userId) 
  userId =26;

      var user = null;
      if(userId){
      const defaultUser = await driverInfo(userId);
      user = defaultUser;
      }
 
      return Response.json(user)
}