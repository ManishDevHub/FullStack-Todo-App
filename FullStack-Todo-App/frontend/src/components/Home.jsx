
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Home() {


    const [todos , setTodos] = useState([])
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const [newTodo , setNewTodo] = useState("");

    useEffect(() => {
        const fetchTodo = async () => {
            try{
            setLoading(true)
            const res = await axios.get("http://localhost:4000/todo/fetch" , {
                withCredentials:true
            })
            console.log(res.data.todos);
            setTodos(res.data.todos);
            setError(null)
            } catch(error){
                setError("Failed to fetch todos");
            }
            finally{
                setLoading(false)
            }
        };
        fetchTodo()
    },[])

    const todocreate = async ()=> {
        if(!newTodo) return;
        try{
            const response = await axios.post("http://localhost:4000/todo/create" ,{text:newTodo , completed:false},{ withCredentials:true})
            setTodos([...todos , response.data.newTodo]);
            setNewTodo("");
      
        }catch(error){
             setError("Failed to create todos");
        }
    }

    const todoStatus = async (id) => {
        const todo = todos.find((t) =>t._id === id)
        try{
 const response = await axios.put(`http://localhost:4000/todo/update/${id}` ,{...todo , completed:!todo.completed},{ withCredentials:true})
 setTodos(todos.map((t) =>t._id===id? response.data.todo:t))
        }catch (error){
             setError("failed to find todo status todos");
        }
    }
    const todoDelete = async (id) =>{
        try{
 await axios.delete(`http://localhost:4000/todo/delete/${id}`,{withCredentials:true})
 setTodos(todos.filter((t) => t._id!==id))
        }catch(error){
             setError("failed to Delete todos");
        }
    };
const NavigateTo = useNavigate();
    const logout = async ()=>{
        try{
await axios.get("http://localhost:4000/user/logout" , {
    withCredentials:true,
})
toast.success("User logout successfully")
NavigateTo("/login")
localStorage.removeItem("jwt")

        }catch(error){
            toast.error("failed to logout");
        }
    }
    const remainingTodos = todos.filter((todo)=>!todo.completed).length

  return <div className=' my-10 bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx- sm:mx-auto p-6 '>
    <h1 className='text-2xl font-semibold text-center mb-4'>Todo App</h1>

    <div className='mb-4'>
<input type="text" placeholder='Add a new todo'  value={newTodo} onChange={(e)=>setNewTodo(e.target.value)} onKeyDown={(e)=>e.key ==="Enter" && todocreate()} className='flex-grow p-2 border rounded w-[465px] focus:outline-none'/>
        <button  onClick ={todocreate}className='bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300'>Add</button>
        </div>
        {loading?(<div className='text-center justify-center'><span className='text-gray-500'>Loading...</span></div>):error?(<div className="text-center text-red-600 font-semibold">{error}</div>):(
            <ul className='space-y-2'>
                {todos.map((todo,index)=>(
                       <li key={(todo._id || index)} className='flex item-center justify-between p-3 bg-gray-100 rounded-md'>
                    <div className='flex items-center'>
                        <input type="checkbox" checked ={todo.completed} onChange={()=> todoStatus(todo._id)} className='mr-3' />
                        <span className={`${todo.completed?"line-through text-gray-800 font-semibold":""}
                        `}>{todo.text}</span>
                    </div>
                    <button className='text-red-500 hover:text-red-700 duration-300'
                    onClick={()=> todoDelete(todo._id)}>Delete</button>
                </li>
                ))}
             
            </ul>
        )}
            
<p className='mt-4 text-center text-gray-700'>{remainingTodos} remaining todos</p>
<button  onClick ={() =>logout()}  className='mt-5 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block'>Logout</button>
        </div>
        
  
}
