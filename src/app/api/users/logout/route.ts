import { NextResponse } from "next/server";
import { CookieSetOptions } from "@/types/tasksType";

export async function GET() {
  try {
    console.log("Logout route reached");
    const response = NextResponse.json({ message: "Logout", success: true });
    const domain =
      process.env.NODE_ENV === "production"
        ? "https://cute-mousse-93de58.netlify.app/"
        : "localhost";
    const cookieOptions: CookieSetOptions = {
      domain,
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    };

    // Delete the token cookie
    response.headers.append(
      "Set-Cookie",
      `token=; Max-Age=0; Path=/; Domain=${domain}; Secure; HttpOnly; SameSite=Strict`
    );

    return response;
  } catch (error: any) {
    console.error("Error in logout route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
