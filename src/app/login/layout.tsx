import { redirect } from "next/navigation";
import { wallFunction } from "@/utils/wall";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const user  = await  wallFunction();
    if(user){
     switch(user.role){
      case 'student' : if(user.defTime) redirect('/Application/Student')
                       else redirect('/Application/getStarted');
      case 'driver'  : redirect('/Application/Driver');

      case 'staff' : redirect('/Application/Staff');
     }
    }
    
    return (
      <>
      {children}
      </>
    );
  }
  