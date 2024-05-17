"use client"


import Image from "next/image"

import { Button } from "@/components/ui/button"
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIconSVG from "@/components/ui/GoogleIcon";
import { signIn} from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/loader";



export default function LoginPage() {
    const router = useRouter();
    const [isloading ,setIsLoading]= useState(true);
   
   
    async function patrolman(){
    const res = await fetch("/api/patrolman");
    const link = await res.json();
    if (link.linkvalue) {
        router.push(link.linkvalue);
    }

    setIsLoading(false);
}


useEffect(()=>{
    patrolman();
},[])

    return (
        
        <div className="w-full lg:grid lg:min-h-[580px] lg:grid-cols-2 ">
            <div className="flex items-start justify-center py-12 ">
                <div className="mx-auto grid w-[350px] gap-10 ">
                {isloading && <Loader />}
                    <div>
                        <Image
                            src="/img/1337.png"
                            alt="Image"
                            width="300"
                            height="250"
                            className="mx-auto mb-2"
                        />
                    </div>
                    <div className="grid gap-2 text-center">

                        <h1 className="text-3xl font-bold">Login</h1>
                        <p className="text-balance text-muted-foreground">
                            Sign in to Busify
                        </p>
                    </div>
                    <div className="grid gap-4">
                        <Divider>Staff or Student</Divider>
                        <Button type="submit" className="w-full" onClick={() => signIn("github")}>
                            <GitHubIcon className="mr-2" />
                            Sign in with Github
                        </Button>
                        <Divider>Or Driver</Divider>
                        <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
                            <GoogleIconSVG /> Sign in with Google
                        </Button>
                    </div>

                    <p className="text-balance text-muted-foreground text-center">
                        &copy; {new Date().getFullYear()} Busify. All Rights Reserved.
                    </p>
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="/img/sideImage.jpg"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}


