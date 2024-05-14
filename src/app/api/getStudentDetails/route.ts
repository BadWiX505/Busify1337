import { getStudentDetailsforStudent } from "@/Repo/Logic";
import { cookies } from "next/headers";




export async function GET(){
     
   let userId ;
   userId = cookies().get("userId")?.value || null; 
   var finalStudent = null;
   if(userId){
   userId = parseInt(userId) 
   const Student = await  getStudentDetailsforStudent(userId);
   finalStudent = Student;
   }

   return Response.json({finalStudent}) 
}