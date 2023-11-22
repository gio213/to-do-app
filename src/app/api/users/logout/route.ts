import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({ message: "Logout", success: true });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0), path: "/", domain: "https://to-do-app-ivory-nu.vercel.app/" });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
