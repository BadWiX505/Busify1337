import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { getRole } from "@/Repo/Logic";


export async function GET(){
    const session = await getServerSession(authOptions);
    var role=null;
    var link =null;

    if(session){
        role = await getRole({userName:session?.user?.name,email:session?.user?.email});
        if(role){
          console.log("role : "+role);
          switch(role){
             case 'student':link ="/Application/Student/welcome"; break;
             case 'staff': link ="/Application/Staff/welcome"; break;
             case 'driver': link ="/Application/Driver/welcome"; break;
             default : break;
          }      
        }
        else{
         link = "/Application/getStarted"
        }
     
     }

    return   Response.json({linkvalue : link});
}