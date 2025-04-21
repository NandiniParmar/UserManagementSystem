import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../modules/Login'
import Dashboard from '../modules/Dashboard'
import Register from '../modules/Register'
import ProtectedRoutes from './ProtectedRoutes'

const RoutesPage = () => {
  const [isAuth, setIsAuth] = useState(false)


  return (
    <div>
      <Routes>
        <Route path='/' element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/dashboard" element={
          <ProtectedRoutes isAuth={isAuth}>
            <Dashboard />
          </ProtectedRoutes>
        } />
        <Route path='/register' element={<Register />} />
      </Routes>
    </div>
  )
}

export default RoutesPage
