/*
Front page that shows a list of threads
*/
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateThread from '../components/CreateThread'
import ThreadComponent from '../components/ThreadComponent'
import { useThreadContext } from '../context/ThreadContext'

const Home = () => {
  // const [showCreateThreadBox, setShowCreateThreadBox] = useState<boolean>(false)
  const { threads, addThread } = useThreadContext()
  const [showCreateThreadBox, setShowCreateThreadBox] = useState(false)

  const handleCreateThread = () => {
    setShowCreateThreadBox(true)
  }

  const handleCreateThreadSubmit = (title: string, content: string) => {
    const user = {
      id: '123',
      name: 'TestUser1',
    }
    const newThread = {
      id: Date.now().toString(),
      user: user,
      title: title,
      content: content,
      replies: [],
    }

    addThread(newThread)
    setShowCreateThreadBox(false)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-sans mb-4 text-center p-4">Foorumi</h1>
        <Link to="/login">
          <button className="bg-purple-500 text-white px-4 py-2 rounded">
            Login
          </button>
        </Link>
      </div>
      <main className="mt-16 bg-pink-100 text-white p-8 rounded-lg max-w-5xl mx-auto">
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleCreateThread}
          >
            Create Thread
          </button>
          {showCreateThreadBox && (
            <CreateThread onSubmit={handleCreateThreadSubmit} />
          )}
        </div>
        <div className="space-y-4">
          {threads
            .reverse()
            .map(
              (thread) =>
                !thread.parent && (
                  <ThreadComponent thread={thread}></ThreadComponent>
                )
            )}
        </div>
      </main>
    </>
  )
}

export default Home
