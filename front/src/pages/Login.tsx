import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Register from '../components/Register'
import InputBase from '../components/InputBase'
import useInput from '../hooks/useInput'
import ButtonBase from '../components/ButtonBase'
import ButtonColors from '../enums/ButtonColors'
import { useUser } from '../context/UserContext'

const Login = () => {
  const [showRegister, setShowRegister] = useState(false)
  const [loggingIn, setLoggingIn] = useState(false)
  const { login } = useUser()

  const username = useInput({
    id: 'username',
    placeholder: 'Enter your email',
    required: true,
    autoComplete: 'email',
  })
  const password = useInput({
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    autoComplete: 'current-password',
    minLength: '6',
  })

  const navigate = useNavigate()

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoggingIn(true)
    const result = await login({
      username: username.value,
      password: password.value,
    })
    if (result === 'ok') {
      navigate('/')
      return
    }
    window.alert(result)
    setLoggingIn(false)
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
              Email
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

          <ButtonBase
            color={ButtonColors.blue}
            props={{ type: 'submit', disabled: loggingIn }}
          >
            Login
          </ButtonBase>

          <div className="mt-2">
            <p className="text-gray-600 text-sm font-semibold mb-2">
              New User?
            </p>
            <ButtonBase onClick={handleRegisterClick}>Register</ButtonBase>
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
