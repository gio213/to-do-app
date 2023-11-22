import Todo from "@/models/todoModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/helpers/getToken";
connect();



export async function PUT(request: NextRequest, response: NextResponse) {
    try {
        const userId = await getToken(request);
        const reqBody = await request.json();
        console.log(reqBody);
        const { completed, _id } = reqBody;
        if (!_id) {
            return NextResponse.json({ error: "Id is required" }, { status: 400 });
        }

        const todo = await Todo.findOne({ _id: _id, user: userId });
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        todo.completed = completed;
        await todo.save();
        return NextResponse.json({ message: "Todo completed", todo }, { status: 200 });


    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}