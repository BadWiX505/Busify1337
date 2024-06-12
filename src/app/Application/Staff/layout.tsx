/** @format */

import { cn } from "@/lib/utils";
import SideNavbar from "@/components/staff/SideNavbar";
import Navbare from "@/components/staff/Navbare";
import staffWall from "@/utils/staffWall";
import { redirect } from "next/navigation";



export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  // const user = await staffWall();
  // if(!user){
  //    redirect('/login')
  // }
  


  return (

    <div className={cn(
      "min-h-screen w-full bg-white text-black flex ",
      {
        "debug-screens": process.env.NODE_ENV === "development"
      }
    )}>
      {/* sidebar */}
      {/* <p className="border">Sidebar</p> */}
      <SideNavbar />
      <div className="flex-1 bg-gray-100 dark:bg-gray-950">
        <Navbare />
        {/* main page */}
        <div className="p-8 w-full">{children}</div>
      </div>
    </div>
  );
}
