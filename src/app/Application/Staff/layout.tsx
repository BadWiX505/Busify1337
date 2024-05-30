
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    
 
    return (
      children
    );
  }