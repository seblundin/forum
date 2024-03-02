import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { ThreadProvider } from './context/ThreadContext'

function App() {
  return (
    <div>
      <BrowserRouter>
        <ThreadProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </ThreadProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
