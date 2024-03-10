import { useState } from 'react'
import { Link } from 'react-router-dom'
import CreateThread from '../components/CreateThread'
import ThreadComponent from '../components/ThreadComponent'
import { useThreadContext } from '../context/ThreadContext'
import ButtonBase from '../components/ButtonBase'
import ButtonColors from '../enums/ButtonColors'

const Home = () => {
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
      uploadtime: new Date(),
    }

    addThread(newThread)
    setShowCreateThreadBox(false)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-sans mb-4 text-center p-4">Foorumi</h1>
        <Link to="/login">
          <ButtonBase color={ButtonColors.purple}>Login</ButtonBase>
        </Link>
      </div>
      <main className="mt-16 bg-pink-100 text-white p-8 rounded-lg max-w-5xl mx-auto">
        <div>
          <ButtonBase color={ButtonColors.blue} onClick={handleCreateThread}>
            Create Thread
          </ButtonBase>
          {showCreateThreadBox && (
            <CreateThread onSubmit={handleCreateThreadSubmit} />
          )}
        </div>
        <div className="space-y-4">
          {threads
            .sort((a, b) => (b.uploadtime >= a.uploadtime ? 1 : -1))
            .map(
              (th) =>
                !th.parent && (
                  <ThreadComponent thread={th} key={th.id}></ThreadComponent>
                )
            )}
        </div>
      </main>
    </>
  )
}

export default Home
