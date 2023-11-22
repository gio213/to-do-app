import Todo from "@/models/todoModel";
import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "@/helpers/getToken";
import mongoose from "mongoose";
connect();

export async function POST(request: NextRequest, response: NextResponse) {
    const userId = await getToken(request);
    try {
        const reqBody = await request.json();

        const { title } = reqBody;

        const newTodo = new Todo({
            _id: new mongoose.Types.ObjectId(),
            title,
            user: userId,

        });
        console.log(newTodo);
        if (!title) {
            return NextResponse.json({ error: "Title is required " }, { status: 400 });
        }
        const todo = await newTodo.save();
        console.log(todo);
        return NextResponse.json({ message: "Todo added successfully", todo }, { status: 201 });



    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }



}