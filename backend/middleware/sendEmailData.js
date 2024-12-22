import { sendEmail } from "../utils/sendEmail.js";
import Todo from "../model/todo.model.js";

const sendEmailData = async (req, res, next) => {
  try {
    // Fetch todos only for the logged-in user
    const todos = await Todo.find({ user: req.user._id });

    // Check if todos exist
    if (!todos || todos.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No to-dos found for the user.",
      });
    }

    // Construct message from the todos
    const todoMessage = todos
      .map((todo, index) => `${index + 1}. ${todo.text}`)
      .join("\n");

    try {
      // Sending email using sendEmail function
      await sendEmail({
        email: req.user.email, // Recipient email
        subject: "Your To-Do List",
        message: `Here are your to-dos:\n\n${todoMessage}`, // Formatted message
        userEmail: req.user.email, // Email of the logged-in user
      });

      // Success response
      res.status(200).json({
        success: true,
        message: "Message Sent Successfully.",
      });
    } catch (error) {
      console.error("Error sending email:", error); // Log error for debugging
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  } catch (error) {
    console.error("Error fetching todos:", error); // Improved logging
    res.status(400).json({ message: "Error while fetching todos" });
  }
};

export default sendEmailData;
