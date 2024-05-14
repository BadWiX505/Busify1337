import { getUserDefault } from "@/Repo/Logic";
import { cookies } from "next/headers";




export async function GET(){
     let res = false;
   if(cookies().get("userId")){
     cookies().delete("userId");
     res=true;
   }

   return Response.json(res);
}