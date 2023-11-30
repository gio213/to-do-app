import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';


connect();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token } = reqBody;
        console.log(token);
        const user = await User.findOne({ verifayToken: token, verifayTokenExpire: { $gt: Date.now() } })

        if (user.isVerifed) {
            console.log("User already verified");
            return NextResponse.json({ error: "User already verified" }, { status: 400 })
        }

        if (!user) {
            return NextResponse.json({ error: "User not  found " }, { status: 400 })
        }
        user.isVerifed = true;
        user.verifayToken = undefined;
        user.verifayTokenExpire = undefined;
        await user.save();
        return NextResponse.json({ message: "User is verified" }, { status: 200 })

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 })
    }
}