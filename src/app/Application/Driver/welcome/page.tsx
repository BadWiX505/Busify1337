"use client"

import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react"
export default function Welcome(){
    const { data: session, status } = useSession();
    if(status==='loading')
        return('Loading....')
    if(!session)
        return('you are not logged')

    return(
    <div>
        welcome mr {session?.user?.name} <br/>
        your email is {session?.user?.email}
        <Button onClick={()=>signOut()}>SignOut</Button>
    </div>
)
}
