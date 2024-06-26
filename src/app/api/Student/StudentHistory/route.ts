import { StudentBookingHistory, getAddressFromCoordinates } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
  const { user } = await validateRequest();
  let history = [];
  if (user && user.role === 'student' && user.status==='active') {
    const params = request.nextUrl.searchParams;
    const offset = parseInt(params.get("offset"));
    const limit = parseInt(params.get("limit"));
    history = await StudentBookingHistory(user.idUser, offset, limit)
    for (const item of history.booking) {
      item.realAddress = await getAddressFromCoordinates(item.Adress_lnt, item.Adress_lng);
    }
  }
  else {
    return Response.json('Unauthorized', { status: 401 })
  }

  return Response.json(history);
}