import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function GET(){
  const { session } = await validateRequest();
  const os = require('os');
  console.log(os.platform()+' '+os.homedir());
	if (session) {
	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}
    redirect('/login')
}