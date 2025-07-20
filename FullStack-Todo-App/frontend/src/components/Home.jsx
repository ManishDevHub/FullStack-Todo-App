
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {


    const [todos , setTodos] = useState([])
    const [error , setError] = useState(null)
    const [loading , setLoding] = useState(false)
    const [newTodo , setNewTodo] = useState("");

    useEffect(() => {
        const fetchTodo = async () => {
            try{
            setLoading(true)
            const res = await axios.get("http://localhost:4000/todo/fetch" , {
                withCredentials:true
            })
            setTodos(res.data)
            setError(null)
            } catch(error){
                setError("failed to fetch todos");
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
            setTodos([...todos , response.data]);
            setNewTodo("");
      
        }catch(error){
             setError("failed to create todos");
        }
    }

    const todoStatus = async (id) => {
        const todo = todos.find((t) =>t._id === id)
        try{
 const response = await axios.post(`http://localhost:4000/todo/update/${id}` ,{...todo , completed:todo.completed},{ withCredentials:true})
 setTodos(todos.map((t) =>t._id===id? response.data:t))
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
    }

  return <div className='bg-gray-100 max-w-lg lg:max-w-xl rounded-lg shadow-lg mx- sm:mx-auto p-6 '>
    <h1 className='text-2xl font-semibold text-center'>Todo App</h1>

    <div className='mb-4'>
<input type="text" placeholder='Add a new todo' className='flex-grow p-2 border rounded w-[465px] focus:outline-none'/>
        <button className='bg-blue-600 border rounded-r-md text-white px-4 py-2 hover:bg-blue-900 duration-300'>Add</button>
        </div>
            <ul className='space-y-2'>
                <li className='flex item-center justify-between p-3 bg-gray-100 rounded-md'>
                    <div className='flex items-center'>
                        <input type="checkbox" className='mr-3' />
                        <span className='text-gray-600'>hi there</span>
                    </div>
                    <button className='text-red-500 hover:text-red-700 duration-300'>Delete</button>
                </li>
            </ul>
<p className='mt-4 text-center text-gray-700'>0 Todo Remaining</p>
<button className='mt-5 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-800 duration-500 mx-auto block'>Logout</button>
        </div>
        
  
}
