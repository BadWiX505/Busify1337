import { DatabaseUserAttributes, validateRequest } from "@/lib/auth";

export async function wallFunction(){
    const {user} = await validateRequest();
    return user;
}