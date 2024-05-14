import { UpdateStudent } from "@/Repo/Logic";
import { cookies } from "next/headers";


export async function POST(request : Request){

    let userId ;
    userId = cookies().get("userId")?.value || null; 
    let res=null;

    if(userId){
    userId = parseInt(userId) 
    const data = await request.json();
     res = await UpdateStudent(userId,data);
    }


    const result = res ? true : false;
    
   return new Response(JSON.stringify({finalRes : result}),{
      headers : {
        "Content-Type" : "application/json",
      },
      status : 201
   })
}



