import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ mess: "Error occurred in the todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json({ mess: "Todos fetched successfully", todos });
  } catch (error) {
    res.status(400).json({ mess: "Error occurred in todo fetching" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(400).json({ mess: "Error occurred in todo updating" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
   const todo = await Todo.findByIdAndDelete(req.params.id);
   if(!todo){
    res.status(404).json({message:"Todo not found"})
   }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ mess: "Error occurred in todo deletion" });
  }
};
