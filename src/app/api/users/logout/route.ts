import { NextResponse } from "next/server";
import { cookies } from 'next/headers'
import { CookieSetOptions } from "@/types/tasksType";


export async function GET() {
  try {
    console.log("Logout route reached");
    const response = NextResponse.json({ message: "Logout", success: true });
    const domain = process.env.NODE_ENV === 'production' ? 'https://to-do-app-ivory-nu.vercel.app' : 'localhost'
    const cookieOptions: CookieSetOptions = {
      domain,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    // Delete the token cookie
    response.cookies.set("token", "", { ...cookieOptions, maxAge: 0 });



    return response;
  } catch (error: any) {
    console.error("Error in logout route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
