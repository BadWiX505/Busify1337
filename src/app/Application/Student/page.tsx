"use client"

import StudentCards from "@/components/student/StudentCards";
import StudentMain from "@/components/student/StudentMain";
import StudentNav from "@/components/student/StudentNav";
import { LoadScript } from "@react-google-maps/api";


export default function Student() {
    return (
        <>
           
                <StudentNav />
                <StudentMain />
                <StudentCards />
         
        </>
    )
}