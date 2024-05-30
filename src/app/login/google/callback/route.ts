// app/login/github/callback/route.ts
import { google, lucia } from "@/lib/auth";
import { cookies } from "next/headers";
import { OAuth2RequestError } from "arctic";
import { generateIdFromEntropySize } from "lucia";
import prisma from '@/lib/prisma';


export async function GET(request: Request) {
	const url = new URL(request.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");
    const codeVerifier = cookies().get("google_code_verifier")?.value ?? null;;
	const storedState = cookies().get("google_oauth_state")?.value ?? null;
	if (!code || !state || !storedState || state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}



	try {
		const tokens = await google.validateAuthorizationCode(code,codeVerifier!);
		const googleUserResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
			headers: {
				Authorization: `Bearer ${tokens.accessToken}`
			}
		});
		const googleUser: any = await googleUserResponse.json();

		//Replace this with your own DB client.

		const existingUser = await findProviderById(googleUser.sub);

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
		await createUserAndProvider({id : userId , fullName : "Houssam driver" , image : googleUser.picture ,role : 'driver' },{providerId: googleUser.sub , username : googleUser.name, email : googleUser.email});

		const session = await lucia.createSession(userId, {});
		const sessionCookie = lucia.createSessionCookie(session.id);
		cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
		return new Response(null, {
			status: 302,
			headers: {
				Location: "/login"
			}
		});
    
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
