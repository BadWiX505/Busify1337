// src/auth.ts
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { Lucia } from "lucia";
import { cookies } from "next/headers";
import { cache } from "react";
import type { Session, User } from "lucia";
import { PrismaClient } from "@prisma/client";
import { GitHub, Google } from "arctic";

const client = new PrismaClient();

const redirectURI = "https://busify1337.vercel.app/login/google/callback";

const adapter = new PrismaAdapter(client.session, client.user);

export const google = new Google(process.env.GOOGLE_CLIENT_ID!, process.env.GOOGLE_CLIENT_SECRET!,redirectURI);
export const github = new GitHub(process.env.GITHUB_CLIENT_ID!, process.env.GITHUB_CLIENT_SECRET!)

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		// this sets cookies with super long expiration
		// since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
		expires: false,
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
        
        
	},
    getUserAttributes: (attributes) => {
		return {
			// attributes has the type of DatabaseUserAttributes
			fullName : attributes.full_name,
            email : attributes.email,
			role : attributes.role,
			idUser : attributes.id_User, 
			image : attributes.image,
			defTime : attributes.default_time,
			busId : attributes.busId,
			status : attributes.status,
		};
	}
    
});

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
        DatabaseUserAttributes: DatabaseUserAttributes;
	}
}



export const validateRequest = cache(
	async (): Promise<{ user: User; session: Session } | { user: null; session: null }> => {
		const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
		if (!sessionId) {
			return {
				user: null,
				session: null
			};
		}

		const result = await lucia.validateSession(sessionId);
		// next.js throws when you attempt to set cookie when rendering page
		try {
			if (result.session && result.session.fresh) {
				const sessionCookie = lucia.createSessionCookie(result.session.id);
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
			if (!result.session) {
				const sessionCookie = lucia.createBlankSessionCookie();
				cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
			}
		} catch {}
		return result;
	}
);

export interface DatabaseUserAttributes {
    id_User    : String    
    full_name  : String
    email   : String
	role : String
	image : String
	default_time : String
	busId : number
	status : String
}