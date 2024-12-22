import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, "Todo text is required"],
      maxlength: [200, "Todo text cannot exceed 200 characters"],
      minlength: [1, "Todo text cannot be empty"],
    },
    completed: {
      type: Boolean,
      required: [true, "Completion status is required"],
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
  },
  { timestamps: true }
);

// Create the Todo model
const Todo = mongoose.model("Todo", todoSchema);
export default Todo;
