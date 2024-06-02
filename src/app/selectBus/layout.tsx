import { wallFunction } from "@/utils/wall";
import { redirect } from "next/navigation";



export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    const user  = await  wallFunction();
    if(!user){
      redirect('/login')
    }
    else{
      if(user.role!='driver' || user.busId || user.status!='active'){
        redirect('/login')
      }
    }

    return (
      <>
      {children}
      </>
    );
  }
  