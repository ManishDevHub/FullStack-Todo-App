import Todo from "../modal/todo.modal.js"


 export const createTodo = async (req , res ) =>{
    const todo  = new Todo({
        text :req.body.text ,
        completed:req.body.completed
    })

    try{
        const newTodo = await todo.save()
        res.status(201).json({message:"todo Created Successfully" , newTodo});
    } catch(error){
       console.log(error)
        res.status(400).json({mess:"error occuring in the todo creation"});
       
    }
  };

  export const getTodos = async(req , res )=>{
    try{
        const todos = await Todo.find()
        res.status(200).json({mess: "Todo feched Successfully" , todos})

    } catch (error){
        response.status(400).josn({mess: "error occuring in todo feching"})
    }
     
    
  }

  export const updateTodo = async (req,res ) =>{
    try{
         const todo = await Todo.findByIdAnUpdate(req.params.id , req,body,{
            new:true ,
         })
          res.status(201).json({message:"todo Updated  Successfully" , Todo});
    }catch(error){
        res.status(400).json({mess: "error occureung in todo updating "})
    }
    
  }
  export const deleteTodo = async (req,res ) =>{
    try{
         const todo = await Todo.findByIdAnDelete(req.params.id );
          res.status(201).json({message:"todo deleted  Successfully" });
    }catch(error){
        res.status(400).json({mess: "error occureung in todo deletion "})
    }
    
  }

