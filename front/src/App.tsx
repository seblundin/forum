import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { ThreadProvider } from './context/ThreadContext'
import { UserProvider } from './context/UserContext'

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThreadProvider>
          <UserProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </UserProvider>
        </ThreadProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
