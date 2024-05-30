"use client"

import StudentCards from "@/components/student/StudentCards";
import StudentMain from "@/components/student/StudentMain";
import StudentNav from "@/components/student/StudentNav";


export default function Student() {
    return (
        <div>
                <div className="bg-black bg-cover bg-no-repeat mb-[100px]" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}>
                {/* //<div className="absolute inset-0 lg:w-1/2 md:w-1/2 xl:w-1/2 w-full h-full bg-cover bg-no-repeat" style={{backgroundImage : 'url("https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")'}}></div> */}

                <StudentNav />
                <StudentMain />
                </div>
                <StudentCards />
         
       </div>
    )
}