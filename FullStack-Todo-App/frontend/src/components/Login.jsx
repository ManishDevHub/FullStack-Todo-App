import React, { useState } from 'react'
import { Link,useNavigate  } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from "axios";


export default function Login() {

  
  const  [email , setemail] = useState("")
  const [password , setpassword] = useState("")
   const navigateTo = useNavigate()

  const handellogin = async (e)=>{
    e.preventDefault();
    try{
const {data} = await axios.post("http://localhost:400/user/login",{
  
  email , 
  password,
},{
  withCredentials:true ,
  headers:{
    "Content-Type":"application/json"
  }
})
console.log(data);
toast.success(data.message || "User loggedin successfully")

localStorage.setItem("jwt" , data.token)
navigateTo("/")
setemail("")
setpassword("")


    }catch(error){
console.log(error)
toast.error(error.response.data.errors || "User login failed")
    }
  }
  return (
<div>
  <div>
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-5 text-center'>Login</h2>
        <form onSubmit={handellogin}>
          
        
      {/*email */}

        <div className='mb-4'><label className='block mb-2 font-semibold' htmlFor="">Email</label>
        <input   
        value = {email} 
        onChange = {(e)=> setemail(e.target.value)}
        className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="email" placeholder='Enter your email' />
        </div>
        {/*password*/}
          <div className='mb-4'><label  className='block mb-2 font-semibold' htmlFor="">Password</label>
        <input  value = {password} 
        onChange = {(e)=> setpassword(e.target.value)} className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="password" placeholder='Enter your password' />
      </div> 
    
      <button  type= "submit" className=' p-3 w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold'>Login</button> 
      <p className='mt-4 text-center text-gray-600 '>New user? <Link to="/signin" className='text-blue-600 hover:underline'>signin</Link></p>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}
