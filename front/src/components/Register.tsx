import { useUser } from '../context/UserContext'
import useInput from '../hooks/useInput'
import ButtonBase from './ButtonBase'
import InputBase from './InputBase'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const username = useInput({
    id: 'usernameRegister',
    placeholder: 'Enter your username',
    required: true,
    autoComplete: 'username',
  })
  const password = useInput({
    id: 'passwordRegister',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
    autoComplete: 'new-password',
    minLength: '6',
  })
  const confirmPassword = useInput({
    type: 'password',
    id: 'confirmPassword',
    placeholder: 'Confirm your password',
    required: true,
    autoComplete: 'new-password',
    minLength: '6',
  })
  const email = useInput({
    id: 'email',
    type: 'email',
    placeholder: 'Enter your email',
    required: true,
    autoComplete: 'email',
  })
  const { register } = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password.value !== confirmPassword.value) {
      window.alert('Passwords do not match')
      return
    }
    const result = await register({
      username: username.value,
      password: password.value,
      email: email.value,
    })
    if (result === 'ok') {
      navigate('/')
      return
    }
    window.alert(result)
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="usernameRegister"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Username
          </label>
          <InputBase props={username} />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Email
          </label>
          <InputBase props={email} />
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
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-600 text-sm font-semibold mb-2"
          >
            Confirm Password
          </label>
          <InputBase props={confirmPassword} />
        </div>
        <ButtonBase props={{ type: 'submit' }}>Register</ButtonBase>
      </form>
    </div>
  )
}

export default Register
