import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";




export async function GET(){
  const { session } = await validateRequest();
  console.log(__dirname);
  console.log(__filename);
	if (session) {
	await lucia.invalidateSession(session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	}
    redirect('/login')
}