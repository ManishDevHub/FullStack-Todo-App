import React, { useState } from 'react'
import { Link,useNavigate  } from "react-router-dom"
import toast from 'react-hot-toast'
import axios from 'axios';

export default function Signin() {

  const  [username , setusername] = useState("")
  const  [email , setemail] = useState("")
  const [password , setpassword] = useState("")
   const navigateTo = useNavigate()

  const handleRegister = async (e)=>{
    e.preventDefault();
    if (!username || !email || !password) {
      return toast.error("Please fill in all fields");
    }

    try{
const {data} = await axios.post("http://localhost:400/user/signin",{
  username, 
  email , 
  password,
},{
  withCredentials:true ,
  headers:{
    "Content-Type":"application/json"
  }
})
console.log(data);
toast.success(data.message || "User registered successfully")

localStorage.setItem("jwt", data.token);
navigateTo("/login")
setusername("")
setemail("")
setpassword("")


    }catch(error){
console.log(error)
toast.error(error.response?.data?.errors || "User registeration failed")
    }
  }
  return (
<div>
  <div>
    <div className='flex h-screen items-center justify-center bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold mb-5 text-center'>Signup</h2>
        <form onSubmit={handleRegister}>{/* username */}
          
          <div className='mb-4'><label  className='block mb-2 font-semibold' htmlFor="">Username</label>
        <input 
        value = {username} 
        onChange = {(e)=>setusername(e.target.value)}
        className='w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500' type="text" placeholder='Enter your username' />
      </div>
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
    
      <button  type= "submit" className=' p-3 w-full bg-blue-600 text-white hover:bg-blue-900 duration-300 rounded-xl font-semibold'>Signup</button> 
      <p className='mt-4 text-center text-gray-600 '>Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login</Link></p>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}
