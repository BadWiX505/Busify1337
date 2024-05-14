import { getRole } from "@/Repo/Logic";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
   
    const session = await getServerSession(authOptions);

    if(session){
      const res= await getRole({userName:session?.user?.name,email:session?.user?.email});
       if(!res || res.role!=="driver"){
        redirect("/login");
       }
    }    

        
    return (
      children
    );
  }