import { StudentTicket } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";
import {encrypt} from '@/utils/cryptoService'


export async function GET(request: NextRequest) {

  const { user } = await validateRequest();
  let ticket = null;

  const params = request.nextUrl.searchParams;

  if (params.get("idbooking")) {
    try {
      if (user && user.role === 'student' && user.status==='active') {
        const idbooking = parseInt(params.get("idbooking"));
        ticket = await StudentTicket(idbooking);
        if (ticket){
          ticket.idBooking = parseInt(params.get("idbooking"));
          ticket.code = encrypt(JSON.stringify({ id_Booking : idbooking , id_User : user.idUser }));
        }

      }
      else {
        return Response.json('Unauthorized', { status: 401 })
      }
    }
    catch (err) {
      console.log(err);
      ticket = null;
    }
  }

  return Response.json(ticket);
}