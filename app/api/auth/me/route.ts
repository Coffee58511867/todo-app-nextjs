import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get("OurSideJWT");
    // if(!token) {

    // }
    console.log(token);
}