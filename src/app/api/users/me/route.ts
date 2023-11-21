import { getToken } from "@/helpers/getToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getToken(request);
    const user = await User.findOne({ _id: userId }).select("-password");
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
