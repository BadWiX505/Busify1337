import { UpdateStudent } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";
import { isInTravelsTime } from "@/utils/dateUtils";
import { z } from 'zod'

export async function POST(request: Request) {

  const { user } = await validateRequest();
  let res = null;
  let message = null;

  try {

    if (user && user.role === 'student') {

      const dataShema = z.object({
        lat: z.number({ message: 'invalid destination' }),
        lng: z.number({ message: 'invalid destination' }),
        time: z.string().regex(/^\d{2}:\d{2}$/, { message: "Invalid Hour" }),
      }, { message: 'something was wrong with request' });


      const data = await request.json();
      const validatedData = dataShema.parse(data);
      const isTimeExist = await isInTravelsTime(validatedData.time);
      if (!isTimeExist) {
        throw new Error("there is a problem in selected Time");
      }
      res = await UpdateStudent(user.idUser, validatedData);
    }
    else {
      return Response.json('Unauthorized', { status: 401 })
    }

  }
  catch (error) {
    if (error instanceof z.ZodError) {
      message = error.errors[0].message;
    } else {
      message = 'some thing went wrong'
    }
  }

  const result = res ? true : false;

  return new Response(JSON.stringify({ result, message }), {
    headers: {
      "Content-Type": "application/json",
    },
    status: 201
  })
}



