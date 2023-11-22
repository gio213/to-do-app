import Todo from "@/models/todoModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/helpers/getToken";
import { log } from "console";
connect();



export async function DELETE(request: NextRequest, response: NextResponse) {
    try {
        const userId = await getToken(request);
        const reqBody = await request.json();
        const { _id } = reqBody;
        console.log(`req id ${_id}}`);
        if (!_id) {
            return NextResponse.json({ error: "Id is required" }, { status: 400 });
        }

        // Ensure the todo exists and belongs to the user
        const todo = await Todo.findOne({ _id: _id, user: userId });

        if (!todo) {
            return NextResponse.json({ error: "Todo not found" }, { status: 404 });
        }

        await Todo.deleteOne({ _id: _id, user: userId });

        return NextResponse.json({ message: "Todo deleted successfully", }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
