import {checkAuth} from '@/Repo/Logic'
import { authOptions } from '@/app/utils/authOptions'
import { getServerSession } from 'next-auth'


export async function GET(){
     const session = await getServerSession(authOptions);
     var isAuth= false;
     if(session){
       isAuth = await checkAuth({userName : session.user?.name , email : session.user?.email});
     }
 
    return Response.json({ok:isAuth});
}




