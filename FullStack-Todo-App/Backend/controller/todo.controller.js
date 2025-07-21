import Todo from "../models/todo.model.js";

export const createTodo = async (req, res) => {
    if (!req.body.text) {
    return res.status(400).json({ message: "Todo text is required" });
  }
  const todo = new Todo({
    text: req.body.text,
    completed: req.body.completed,
    user:req.user._id,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json({ message: "Todo created successfully", newTodo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error occurred in the todo creation" });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({user:req.user._id}); //fetch todos only for loggedin user
    res.status(200).json({ message: "Todos fetched successfully", todos });
  } catch (error) {
    res.status(400).json({ message: "Error occurred in todo fetching" });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate({_id:req.params.id, user: req.user._id}, req.body, {
      new: true,
    });
      if (!todo) {
      return res.status(404).json({ message: "Todo not found or unauthorized" });
    }
    res.status(200).json({ message: "Todo updated successfully", todo });
  } catch (error) {
    res.status(400).json({ message: "Error occurred in todo updating" });
  }
};

export const deleteTodo = async (req, res) => {
  try {
   const todo = await Todo.findByIdAndDelete({_id:req.params.id , user:req.user._id});
   if(!todo){
    res.status(404).json({message:"Todo not found"})
   }
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error occurred in todo deletion" });
  }
};
