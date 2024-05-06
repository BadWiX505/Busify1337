import {checkUserExistance,getUserRole,createUserAndKey} from '@/app/server/db';



export function checkUserExistenceInLocalDB(userData) {
       
    return true;  
}

export async function createUserLogic(userInfo){
   const res = await createUserAndKey(userInfo)
   if(res)
      return true;
   else
   return false
}

export async function checkAuth(user){
   if(user){
      const isExsist = await checkUserExistance(user);
      // if(isExsist){
      //    const role = await
      // }
   }
   return false;
}


export async function getRole(userkey){
   const role = await getUserRole(userkey);
   return role;
}

// export async function door(){
//    const session = await getServerSession(authOptions);
   
//    if(!session){
//      redirect('/login');
//    }
//    else{
//       // if()
//    }
// }




