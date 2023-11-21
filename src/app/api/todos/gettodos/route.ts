import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import {getToken} from "@/helpers/getToken";
import Todo from "@/models/todoModel";
connect();


export async function GET(request: NextRequest, response: NextResponse) {
    try{
        const userId = await getToken(request);
        const todos = await Todo.find({user: userId});

        if(!todos){
            return NextResponse.json({ error: "No todos found" }, { status: 404 });
        }

        return NextResponse.json({message: "Your tasks", todos}, { status: 200 });



    }catch(err: any){
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}