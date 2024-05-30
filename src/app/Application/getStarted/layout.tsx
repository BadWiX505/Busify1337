import { redirect } from "next/navigation";
import { wallFunction } from "@/utils/wall";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const user  = await  wallFunction();

    if(user){
      if(user.role !='student' || user.defTime){
          redirect('/login')
      }
    }
    
    return (
      <>
      {children}
      </>
    );
  }
  