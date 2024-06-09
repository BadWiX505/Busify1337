import { validateRequest } from "@/lib/auth";


export default async function staffWall(){
  
     const {user}= await validateRequest();
     if(user && user.role==='staff' && user.status==='active'){
        return user;
     }

     return false;

}
