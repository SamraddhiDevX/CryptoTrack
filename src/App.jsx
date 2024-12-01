import React from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Coin from './Pages/Coin'
import Navbar from './Pages/Navbar'
import './App.css'

const App = () => {

  

  return (
    <div >
      
     <BrowserRouter>
     <Navbar/>
       <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/coin/:coinId" element={<Coin />}></Route>
       </Routes>
     
     </BrowserRouter> 
    </div>
  )
}

export default App

