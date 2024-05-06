"use client"

import { Button } from "@mui/material";
import { signOut, useSession } from "next-auth/react"
export default function Welcome(){
   
    return(
    <div>
      djoijoijd
        <Button onClick={()=>signOut()}>SignOut</Button>
    </div>
)
}
