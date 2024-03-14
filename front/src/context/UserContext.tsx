import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
} from '../services/UserService'

interface UserData {
  user: {
    username: string
    email: string
    id: string
  }
  token: string
}

interface LoginData {
  username: string
  password: string
}

interface RegisterData {
  username: string
  password: string
  email: string
}

interface UpdateData {
  username?: string
  password?: string
  email?: string
}

interface UserContextProps {
  userState: UserData | null
  login: (userData: LoginData) => Promise<string>
  logout: () => void
  register: (userData: RegisterData) => Promise<string>
  userUpdate: (userData: UpdateData) => Promise<string>
  userDelete: () => Promise<string>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userState, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    // Check session storage for user data
    const storedUser = JSON.parse(sessionStorage.getItem('user') || 'null')

    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  const login = async (userData: LoginData) => {
    const response = await loginUser({ credentials: userData })
    if (response) {
      const loginData = response.data.login
      const user = loginData.user
      const data = {
        token: loginData.token,
        user,
      }
      setUser(data)

      // Save user data to session storage
      sessionStorage.setItem('user', JSON.stringify(data))
      return 'ok'
    }
    return 'username or password incorrect'
  }

  const logout = () => {
    setUser(null)

    // Clear user data from session storage
    sessionStorage.removeItem('user')
  }

  const register = async (userData: RegisterData) => {
    const response = await registerUser({ user: userData })
    if (response) {
      const { email, password } = userData
      await login({ username: email, password })
      return 'ok'
    }
    return 'something went wrong, please try again later'
  }

  const userUpdate = async (userData: UpdateData) => {
    const response = await updateUser({ user: userData }, userState!.token)
    if (response) {
      logout()
      return 'ok'
    }
    return 'something went wrong, please try again later'
  }

  const userDelete = async () => {
    const response = await deleteUser(userState!.token)
    if (response) {
      logout()
      return 'ok'
    }
    return 'something went wrong, please try again later'
  }

  const contextValue: UserContextProps = {
    userState,
    login,
    logout,
    register,
    userUpdate,
    userDelete,
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
