import { createUserAndKey } from "@/app/server/db";

export async function POST(request : Request){
    const data = await request.json();
    const res = await createUserAndKey(data);
    const result = res ? true : false;
    
   return new Response(JSON.stringify({finalRes : result}),{
      headers : {
        "Content-Type" : "application/json",
      },
      status : 201
   })
}



