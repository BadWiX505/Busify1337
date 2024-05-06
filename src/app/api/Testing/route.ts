import { createUserLogic } from "@/Repo/Logic";
import { getUserRole } from "@/app/server/db";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic"

export async function POST(){
  const userInfo = {
    full_name: "John Doe",
    image: "profile.jpg",
    role: "driver",
    status: "active",
    default_Adress_lnt: null, // Example latitude for New York City
    default_Adress_lng: null, // Example longitude for New York City
    default_time: null, // Example default time
    userName: "Houssam naouali",
    email: "houssamnaouali04@gmail.com"
  };
  
  const res = await createUserLogic(userInfo);

  return  Response.json({result : res}); 
}