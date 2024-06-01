import { availableTimes } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
const {user} = await validateRequest();
try{
if(user && user.role==='student'){
   const params = request.nextUrl.searchParams;
   const  date=params.get("date");
   const avT = await availableTimes(date);

   return Response.json({availaibleTimes : avT})
}
else{
   return Response.json('Unauthorized',{status : 401})
}
}catch(err){
   return Response.json({availaibleTimes : null})
}
}