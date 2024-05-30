// app/login/github/callback/route.ts
import { github, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";



import prisma from '@/lib/prisma';


export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
	const storedState = cookies().get("github_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	try {
		const tokens = await github.validateAuthorizationCode(code);

		const githubUserResponseEmail = await fetch("https://api.github.com/user/emails", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

		const githubUserResponse = await fetch("https://api.github.com/user", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});

        
		const userTmp1: any = await githubUserResponse.json();
		const userTmp_Email : any  = await githubUserResponseEmail.json();
		const githubUser = {id : userTmp1.id , name : userTmp1.login , email : userTmp_Email[0].email}
		//Replace this with your own DB client.
		const existingUser = await findProviderById(githubUser.id);

		if (existingUser) {
			const session = await lucia.createSession(existingUser.userId, {});
			const sessionCookie = lucia.createSessionCookie(session.id);
			cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			return new Response(null, {
				status: 302,
				headers: {
					Location: "/login"
				}
			});
		}

		const userId = generateIdFromEntropySize(10); // 16 characters long

		// Replace this with your own DB client.
		await createUserAndProvider({id : userId , fullName : "Houssam Student" , image : 'studentImage' ,role : 'student' },{providerId: githubUser.id , username : githubUser.name, email : githubUser.email});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/login"
			}
		});
    //  console.log(githubUser)

	// 	return Response.json(true);
	} catch (e) {
		// the specific error message depends on the provider
		if (e instanceof OAuth2RequestError) {
			// invalid code
			return new Response(null, {
				status: 400
			});
		}
		return new Response(null, {
			status: 500
		});
	}
}




async function findProviderById(providerId:number) {
  try {
    const provider = await prisma?.provider.findUnique({
      where: {
        provider_Id: providerId+"",
      },
    });
    return provider;
  } catch (error) {
    console.error('Error finding provider:', error);
  }
}


async function createUserAndProvider(userData: { id : string ; fullName: string; image: string; role :string }, providerData: {providerId : number;  username: string ,email :string}) {
	if (!prisma) {
	  throw new Error('PrismaClient is not initialized.');
	}
  
	try {
	  const newUser = await prisma.user.create({
		data: {
		  full_name : userData.fullName,
		  image: userData.image,
		  id_User: userData.id,
		  role : userData.role,
		  email : providerData.email,
		  providers: {
			create: {
			 provider_Id : providerData.providerId+"",
			  username: providerData.username,
			},
		  },
		},
		include: {
		  providers: true,
		},
	  });
  
	  console.log('New User and Provider:', newUser);
	} catch (error) {
	  console.error('Error creating user and provider:', error);
	} finally {
	  await prisma.$disconnect();
	}
  }


interface GitHubUser {
	id: number;
	login: string;
	email : string
}