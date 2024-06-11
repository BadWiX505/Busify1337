import { getStudentsReportsHistory } from "@/app/server/db";
import { validateRequest } from "@/lib/auth";


export async function GET() {
    const { user } = await validateRequest();
    try {
        if (user && user.role === 'student' && user.status === 'active') {
            const  res = await getStudentsReportsHistory();
            if(res)
            return Response.json(res,{status:200});
            else
            return Response.json('server error',{status : 500})
        }
        else {
            return Response.json('Unauthorized', { status: 401 })
        }
    } catch (err) {
        return Response.json('server error', { status: 500 })
    }

}