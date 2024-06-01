import StudentProvider from "@/components/student/StudentProvider";
import { wallFunction } from "@/utils/wall";
import { redirect } from "next/navigation";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const user  = await  wallFunction();
  if(user){
    if(user.status!='active'){
      redirect('/BannPage')
    }
    if(user.role!='student'){
      redirect('/login');
    }
  }
  else{
    redirect('/login')
  }
  
  return (
    <>
              
    <StudentProvider student={user} >
        {children}
      </StudentProvider>
      
    </>
  );
}