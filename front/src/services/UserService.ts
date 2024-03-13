import LoginResponse from '../interfaces/LoginResponse'
import RegisterResponse from '../interfaces/RegisterResponse'

const loginUser = async (vars: {
  credentials: { username: string; password: string }
}): Promise<LoginResponse | undefined> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation Login($credentials: Credentials!) {
          login(credentials: $credentials) {
            token
            message
            user {
              email
              username
              id
            }
          }
        }`,
        variables: vars,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: LoginResponse = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

const registerUser = async (vars: {
  user: {
    username: string
    email: string
    password: string
  }
}) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `mutation Mutation($user: UserInput!) {
          register(user: $user) {
            message
            user {
              id
              username
              email
            }
          }
        }`,
        variables: vars,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data: RegisterResponse = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

const updateUser = async (
  vars: {
    user: {
      username: string
      email: string
      password: string
    }
  },
  token: string
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `mutation Mutation($user: UserModify!) {
          updateUser(user: $user) {
            message
            user {
              id
              username
              email
            }
          }
        }`,
        variables: vars,
      }),
    })

    const data: RegisterResponse = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

const deleteUser = async (token: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `mutation DeleteUser {
          deleteUser {
            message
            user {
              id
              username
              email
            }
          }
        }`,
      }),
    })

    const data: RegisterResponse = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.error(error)
  }
}

export { loginUser, registerUser, updateUser, deleteUser }
