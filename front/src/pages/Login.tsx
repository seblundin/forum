import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Register from '../components/Register'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Username:', username)
    console.log('Password:', password)
  }

  const handleRegisterClick = () => {
    setShowRegister(true)
  }

  return (
    <>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md relative">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </button>

          <div className="mt-2">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              New User?
            </p>
            <button
              type="button"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              onClick={handleRegisterClick}
            >
              Register
            </button>
          </div>
        </form>

        {showRegister && <Register />}
      </div>

      <Link
        to="/"
        className="absolute top-0 left-0 mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
      >
        Home
      </Link>
    </>
  )
}

export default Login
