import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },

  completed: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  id:{
    type: String,
    required: [true, "Id is required "],

  }
});

const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);

export default Todo;
