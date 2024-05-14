import { availableTimes } from "@/Repo/Logic";
import { NextRequest } from "next/server";


export async function GET(request : NextRequest){
   const params = request.nextUrl.searchParams;
   const  date=params.get("date");
   const avT = await availableTimes(date);

   return Response.json({availaibleTimes : avT})
}