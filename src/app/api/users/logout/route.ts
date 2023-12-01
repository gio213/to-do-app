import { NextResponse } from "next/server";
import { CookieSetOptions } from "@/types/tasksType";



export async function GET() {
  try {
    console.log("Logout route reached");



    const response = NextResponse.json({ message: "Logout", success: true });



    return response;
  } catch (error: any) {
    console.error("Error in logout route:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
