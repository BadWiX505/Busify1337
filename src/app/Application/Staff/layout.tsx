
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/utils/authOptions";
import { getRole } from "@/Repo/Logic";
export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
    
    const session = await getServerSession(authOptions);

    if(session){
      const res= await getRole({userName:session?.user?.name,email:session?.user?.email});
       if(!res || res!=="staff"){
        redirect("/login");
       }
    }    

    return (
      children
    );
  }