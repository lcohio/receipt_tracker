import React from 'react'
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import { BrowserRouter, Routes, Route, ProtectedRoute } from 'react-router-dom';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App