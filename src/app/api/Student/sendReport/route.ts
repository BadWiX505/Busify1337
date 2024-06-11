import { newStudentProblem } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {

    const { user } = await validateRequest();
    try {
        if (user && user.role === 'student' && user.status === 'active') {
            const data = await request.json();
            const message = data.message;
            const res = await newStudentProblem(user.idUser, message);
            if (res) {
                return Response.json('sent successfully', { status: 201 });
            }
            else {
                return Response.json('server error', { status: 500 });
            }
        }
    }
    catch (err) {
        return Response.json('server error', { status: 500 });
    }


}