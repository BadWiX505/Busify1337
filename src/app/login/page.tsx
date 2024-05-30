"use client"


import Image from "next/image"

import { Button } from "@/components/ui/button"
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIconSVG from "@/components/ui/GoogleIcon";
import { useState } from "react";
import Loader from "@/components/ui/loader";



export default function LoginPage() {
    
    const [isloading ,setIsLoading]= useState(false);
   
    

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
                        <a href="/login/github" >
                        <Button type="submit" className="w-full">
                            <GitHubIcon className="mr-2" />
                            Sign in with Github
                        </Button>
                        </a>
                        <Divider>Or Driver</Divider>
                        <a href="/login/google" >
                        <Button variant="outline" className="w-full">
                            <GoogleIconSVG /> Sign in with Google
                        </Button>
                        </a>
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


