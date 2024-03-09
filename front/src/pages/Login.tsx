import { useState } from 'react'
import { Link } from 'react-router-dom'
import Register from '../components/Register'
import InputBase from '../components/InputBase'
import useInput from '../hooks/useInput'
import ButtonBase from '../components/ButtonBase'

const Login = () => {
  const [showRegister, setShowRegister] = useState(false)
  const username = useInput({
    placeholder: 'Enter your username',
  })
  const password = useInput({
    placeholder: 'Enter your password',
  })

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(password.value, username.value)
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
            <InputBase props={username} />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-600 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <InputBase props={password} />
          </div>

          <ButtonBase color="blue">Login</ButtonBase>

          <div className="mt-2">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              New User?
            </p>
            <ButtonBase
              onClick={handleRegisterClick}
              props={{ type: 'submit' }}
            >
              Register
            </ButtonBase>
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
