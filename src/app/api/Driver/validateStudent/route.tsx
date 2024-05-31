import { BookingStatusUpdate, scanTicket } from "@/Repo/driverLogic";
import { getDutyPropertiesFronId } from "@/app/server/db";
import { validateRequest } from "@/lib/auth";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {

  const { user } = await validateRequest();

  try {

    if (user && user.role === 'driver' && user.busId) {
      const data = await request.json();
      if (data.idDuty && data.ticket) {
            console.log(data)
        if (validateJsonString(data.ticket)) {
          const dutyProperties = await getDutyPropertiesFronId(parseInt(data.idDuty));
          const studentTicket = JSON.parse(data.ticket);
          const scanning = await scanTicket(studentTicket.id_Booking,studentTicket.id_User, dutyProperties?.duty_Time, dutyProperties?.duty_Date, user.busId);
          if (!scanning)
            return Response.json('Expired ticket', { status: 401 });
          else {
            const updateBookingStatus = await BookingStatusUpdate(data.ticket.id_Booking, 'Checked', 'Pending');
            if (updateBookingStatus) {
              return Response.json('success', { status: 201 });
            }
            else {
              throw new Error('an internal server error happened');
            }
          }

        }
        else {
          return Response.json('Invalid Qr code', { status: 401 });
        }

      }
      else {
        return Response.json('Uncompleted request', { status: 401 });
      }
    }
  } catch (err) {
    return Response.json('an internal server error happened', { status: 500 })
  }


}


function validateJsonString(jsonString: string) {
  // Define the expected structure
  const expectedStructure = {
    id_User: "string",
    id_Booking: "number",
  };

  // Try to parse the JSON string
  let obj;
  try {
    obj = JSON.parse(jsonString);
  } catch (e) {
    return false; // Invalid JSON string
  }

  // Check if obj is an object
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  // Validate the structure
  for (let key in expectedStructure) {
    if (!obj.hasOwnProperty(key) || typeof obj[key] !== expectedStructure[key]) {
      return false;
    }
  }

  return true;
}