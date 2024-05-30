import { cookies } from "next/headers";
import {driverInfo}  from "@/Repo/driverLogic";
import { validateRequest } from "@/lib/auth";


export async function GET(){
     
     const {user}  = await validateRequest();
      let driver = null;
      if(user && user.role==='driver'){
      const defaultUser = await driverInfo(user.idUser);
      driver = defaultUser;
      }
 
      return Response.json(driver)
}