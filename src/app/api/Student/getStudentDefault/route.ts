import { getUserDefault } from "@/Repo/Logic";
import { validateRequest } from "@/lib/auth";



export async function GET() {

  const { user } = await validateRequest();
  var defUser = null;

  if (user && user.role === 'student' && user.status==='active') {
    if (user?.idUser) {
      const defaultUser = await getUserDefault(user.idUser);
      defUser = defaultUser;
    }
  } else {
    return Response.json('Unauthorized', { status: 401 })
  }

  return Response.json({ defU: defUser })
}