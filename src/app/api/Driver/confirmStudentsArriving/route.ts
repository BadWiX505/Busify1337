import { NextRequest } from "next/server";
import { validateRequest } from "@/lib/auth";
import { BookingStatusUpdate } from "@/Repo/driverLogic";


export async function POST(request : NextRequest){
      const {user}  = await validateRequest();
    

             
        try{
            if(user && user.role==='driver' && user.busId && user.status==='active'){


            const students= await request.json();
             if(students){
                var checkIssue = false;
                for(var student of students){
                    if(student.id_Booking){
                    const res = await BookingStatusUpdate(student.id_Booking,'Completed','Checked');
                    if(!res){
                        checkIssue=true;
                    }
                    }
                }
                if(checkIssue)
                return Response.json('some Students have not been confirmed for some reason resfresh and  try again!',{status : 500})

                return Response.json('success',{status : 201});
             }

             return Response.json('there is no student to update',{status : 402})
            }
            return Response.json('Unauthorized',{status : 405})
        }catch(err){
            console.log(err)
            return Response.json('a problem happened',{status : 500})
        }
      
    
 
}