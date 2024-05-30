"use client"

import { createContext } from "react"


export const UserContext = createContext({});

export default function DriverParent({children,driver}) 
{
  
 return(
     <UserContext.Provider value={driver} >
      {children}
    </UserContext.Provider>
 )
    
}