import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/")
  }
  return (
    <div>
      <h1>Register</h1>
      <button onClick={handleRegister}>Register</button>
      <Link to="/">Already have an account?</Link>
    </div>
  )
}

export default Register
