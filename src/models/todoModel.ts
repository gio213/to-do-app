import mongoose from "mongoose";
const todoSchema = new mongoose.Schema({
 _id: mongoose.Schema.Types.ObjectId,
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


});


const Todo = mongoose.models.todos || mongoose.model("todos", todoSchema);

export default Todo;
