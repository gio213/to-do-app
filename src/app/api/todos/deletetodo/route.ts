import Todo from "@/models/todoModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/helpers/getToken";
connect();



export async function DELETE(request: NextRequest, response: NextResponse) {
    try{
        const userId = await getToken(request);
        const reqBody = await request.json();
         const {id} = reqBody;

            if(!id){
                return NextResponse.json({ error: "Id is required" }, { status: 400 });
            }
            const todo = await Todo.findOne({_id: id, user: userId});
            if(!todo){
                return NextResponse.json({ error: "Todo not found" }, { status: 404 });
            }
            await todo.delete();
            return NextResponse.json({message: "Todo deleted successfully", todo}, { status: 200 });
    }catch(err: any){
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}