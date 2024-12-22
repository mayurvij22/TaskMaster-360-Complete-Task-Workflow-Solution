import Todo from "../model/todo.model.js";

export const createTodo = async (req, res) => {
  const { text, completed } = req.body;

  // Validation
  if (!text || typeof text !== "string" || text.trim() === "") {
    return res
      .status(400)
      .json({ message: "Text is required and must be a string" });
  }
  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "Completed must be a boolean value" });
  }

  const todo = new Todo({
    text: text.trim(),
    completed,
    user: req.user._id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo Created Successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id });
    res.status(200).json({ message: "Todo Fetched Successfully", todos });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in todo fetching" });
  }
};

export const updateTodo = async (req, res) => {
  const { text, completed } = req.body;

  if (text && (typeof text !== "string" || text.trim() === "")) {
    return res.status(400).json({ message: "Text must be a non-empty string" });
  }
  if (completed !== undefined && typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ message: "Completed must be a boolean value" });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo Updated Successfully", todo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in todo updating" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({ message: "Todo Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurring in todo deletion" });
  }
};
