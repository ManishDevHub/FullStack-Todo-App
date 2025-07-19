import { asyncWrapProviders } from 'async_hooks'
import React from 'react'
import { useEffect } from 'react'
import { use } from 'react'
import { useState } from 'react'
import axios from 'axios'

export default function Home() {


    const [todos , setTodos] = useState([])
    const [error , setError] = useState(null)
    const [loding , setLoding] = useState(false)

    useEffect(() => {
        const fetchTodo = async () => {
            try{
            setLoding(true)
            const res = await axios.get("http://http://localhost:4000/todo/fetch" , {
                withCredentials:true
            })
            setTodos(res.data)
            setError(null)
            } catch(error){
                setError("failed to fetch todos");
            }
            finally{
                setLoding(false)
            }
        };
        fetchTodo()
    },[])

  return (<div>Home</div>)
}
