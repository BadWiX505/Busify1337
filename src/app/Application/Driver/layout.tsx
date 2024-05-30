import DriverNavBar from "@/components/driver/DriverNavbar2";
import DriverParent from "@/components/driver/driverParent";
import { DatabaseUserAttributes } from "@/lib/auth";

import { wallFunction } from "@/utils/wall";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
   
    
  const user  = await  wallFunction();
  if(user){
    if(user.role!='driver'){
      redirect('/login');
    }
  }
  else{
    redirect('/login')
  }

        
    return (
      <>
      <DriverNavBar driverInfo={user} />
      <DriverParent driver={user}>
      {children}
      </DriverParent>
      </>
    );
  }