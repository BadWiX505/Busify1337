"use client"

import { createContext } from "react"

  

export const StudentContext = createContext({});
export default function StudentProvider({children,student}){
    return(
       <StudentContext.Provider value={student}>
           {children}
       </StudentContext.Provider>
    )
}