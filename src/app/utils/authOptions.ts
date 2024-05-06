import type { NextAuthOptions } from "next-auth";
import  GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'

export const authOptions ={
    secret : process.env.NEXTAUTH_SECRET as string,

    providers : [
            GithubProvider({
                clientId : process.env.GITHUB_CLIENT_ID as string,
                clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            }),
            GoogleProvider({
                clientId : process.env.GOOGLE_CLIENT_ID as string,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            })
           ],

    
  
} satisfies NextAuthOptions;

  








// NextAuth({
//     providers : [
//     GithubProvider({
//         clientId : process.env.GITHUB_CLIENT_ID as string,
//         clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     }),
//     GoogleProvider({
//         clientId : process.env.GOOGLE_CLIENT_ID as string,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     })
//    ],
 
// })