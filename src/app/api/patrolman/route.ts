import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { getRole } from "@/Repo/Logic";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request:NextRequest,response:NextResponse){
    const session = await getServerSession(authOptions);
    var user=null;
    var link =null;

    if(session){
     
        user = await getRole({userName:session?.user?.name,email:session?.user?.email});
        if(user){
          console.log("role : "+user.role);
          switch(user.role){
             case 'student':link ="/Application/Student"; break;
             case 'staff': link ="/Application/Staff/welcome"; break;
             case 'driver': link ="/Application/Driver"; break;
             default : break;
          }      
            
            const threeMonths = 2190 * 60 * 60 * 1000;
            cookies().set("userId",user.id_User,{ expires: Date.now() + threeMonths });
        }
        else{
          //intra checking
         link = "/Application/getStarted"
        }
     
     }

    return   Response.json({linkvalue : link});
}