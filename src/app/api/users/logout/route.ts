import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Logout route reached");
    const response = NextResponse.json({ message: "Logout", success: true });
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0), path: "/" });
    console.log("Cookie deleted");
    return response;
  } catch (error: any) {
    console.error("Error in logout route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
