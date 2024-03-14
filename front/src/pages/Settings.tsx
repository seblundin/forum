import { Link, useNavigate } from 'react-router-dom'
import InputBase from '../components/InputBase'
import useInput from '../hooks/useInput'
import ButtonBase from '../components/ButtonBase'
import ButtonColors from '../enums/ButtonColors'
import { useUser } from '../context/UserContext'
import { useState } from 'react'

const Settings = () => {
  const { userUpdate, userDelete, userState } = useUser()
  const [isUpdating, setIsUpdating] = useState(false)
  const username = useInput(
    {
      id: 'username',
      placeholder: 'Enter your username',
      required: true,
    },
    userState?.user.username
  )
  const password = useInput({
    id: 'password',
    type: 'password',
    placeholder: 'Enter your password',
  })
  const confirmPassword = useInput({
    id: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
  })
  const email = useInput(
    {
      id: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      required: true,
    },
    userState?.user.email
  )
  const navigate = useNavigate()

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsUpdating(true)
    if (password.value !== confirmPassword.value) {
      console.error('Passwords do not match')
      setIsUpdating(false)
      return
    }
    let result
    if (password.value === '') {
      result = await userUpdate({
        username: username.value,
        email: email.value,
      })
    } else {
      result = await userUpdate({
        username: username.value,
        password: password.value,
        email: email.value,
      })
    }
    if (result === 'ok') {
      navigate('/')
    } else {
      window.alert(result)
    }
    setIsUpdating(false)
  }

  const handleDelete = async () => {
    if (window.confirm('Do you really want to delete user?')) {
      setIsUpdating(true)
      const result = await userDelete()
      if (result === 'ok') {
        navigate('/')
      } else {
        window.alert(result)
      }
      setIsUpdating(false)
    }
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Settings</h2>
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
        <ButtonBase props={{ type: 'submit', disabled: isUpdating }}>
          Update
        </ButtonBase>
      </form>
      <div>
        <ButtonBase
          color={ButtonColors.purple}
          onClick={handleDelete}
          props={{ disabled: isUpdating }}
        >
          Delete user
        </ButtonBase>
      </div>
      <Link
        to="/"
        className="absolute top-0 left-0 mt-2 ml-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
      >
        Home
      </Link>
    </div>
  )
}

export default Settings
