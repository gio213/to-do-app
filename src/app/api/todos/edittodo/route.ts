import Todo from "@/models/todoModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/helpers/getToken";
connect();


export async function PUT(request: NextRequest, response: NextResponse) {
    try {
        const userId = await getToken(request);
        const reqBody = await request.json();
        const { title, id } = reqBody;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }
        if (!id) {
            return NextResponse.json({ error: "Todo id is required" }, { status: 400 });
        }



        const todo = await Todo.findOne({ _id: id, user: userId });
        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }
        todo.title = title;
        todo.updated_at = Date.now();
        todo.updated = true;
        await todo.save();
        return NextResponse.json({ message: "Todo updated successfully", todo }, { status: 200 });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}