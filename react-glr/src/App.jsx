import React from 'react'
import './App.css';
import Navbar from './Navbar';
import Login from './Login';
import Signup from './Signup';
import Expenses from './Expenses';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import AuthProvider from './context/AuthProvider';
import CreateExpense from './CreateExpense';
import EditExpense from './EditExpense';

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route element={<PrivateRoute />}>
              <Route path='/expenses' element={<Expenses />}></Route>
              <Route path='/expenses/create' element={<CreateExpense />}></Route>
              <Route path='/expenses/edit/:id' element={<EditExpense />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App