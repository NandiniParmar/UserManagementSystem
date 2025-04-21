import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const handleLogin = () => {
    setIsAuth(true)
    navigate("/dashboard")
  }
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <Link to={"/register"}>Don't have an account?</Link>
    </div>
  )
}

export default Login
