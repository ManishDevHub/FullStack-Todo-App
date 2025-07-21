import React from 'react'
import { Navigate,BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Signin from './components/Signin';
import PageNotFound from './components/PageNotFound';
import { Toaster } from 'react-hot-toast';


export default function App() {
  const token = localStorage.getItem("jwt");
  return (
    <div> 
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {token?<Home />:<Navigate to={"/login"}/>} />
         <Route path = "/login" element = {<Login />} />
         <Route path = "/signin" element = {<Signin />} />
         <Route path = "*" element = {<PageNotFound />} />
      </Routes>
      </BrowserRouter>
      <Toaster />

    </div>
  )
}
