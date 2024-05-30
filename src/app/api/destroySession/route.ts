import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";




export async function GET(){
  const { session } = await validateRequest();
   let res = false;
	if (session) {
	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	res= true;
	}

   return Response.json(res);
}