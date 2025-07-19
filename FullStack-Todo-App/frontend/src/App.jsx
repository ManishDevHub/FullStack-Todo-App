import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login';
import Signin from './components/Signin';
import PageNotFound from './components/PageNotFound';


export default function App() {
  return (
    <div> 
      <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
         <Route path = "/login" element = {<Login />} />
         <Route path = "/signin" element = {<Signin />} />
         <Route path = "*" element = {<PageNotFound />} />
      </Routes>
      </BrowserRouter>

    </div>
  )
}
