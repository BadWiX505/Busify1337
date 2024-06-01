import { getAlltravelTimes } from "@/app/server/db";
import { validateRequest } from "@/lib/auth";


export async function GET() {
    const { user } = await validateRequest();
    let res = null;

    if (user && user.role === 'student' && user.status==='active') {
        const travelsTimes = await getAlltravelTimes();
        res = travelsTimes;
    }
    else {
        return Response.json('Unauthorized', { status: 401 })
    }

    return Response.json(res);
}