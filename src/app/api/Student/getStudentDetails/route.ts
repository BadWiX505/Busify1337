import { getStudentDetailsforStudent } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";




export async function GET() {

  const { user } = await validateRequest()
  var finalStudent = null;
  if (user && user.role === 'student') {
    const Student = await getStudentDetailsforStudent(user.idUser);
    finalStudent = Student;
  } else {
    return Response.json('Unauthorized', { status: 401 })
  }

  return Response.json(finalStudent)
}