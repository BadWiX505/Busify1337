import { getStudentDetailsforStudent } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";




export async function GET(){
     
  const {user}  = await validateRequest()
   var finalStudent = null;
   if(user){
   const Student = await  getStudentDetailsforStudent(user.idUser);
   finalStudent = Student;
   }

   return Response.json(finalStudent) 
}