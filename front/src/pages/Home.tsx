import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CreateThread from '../components/CreateThread'
import ThreadComponent from '../components/ThreadComponent'
import { useThreadContext } from '../context/ThreadContext'
import ButtonBase from '../components/ButtonBase'
import ButtonColors from '../enums/ButtonColors'
import { useUser } from '../context/UserContext'

const Home = () => {
  const { threads, addThread, getAllThreads } = useThreadContext()
  const [showCreateThreadBox, setShowCreateThreadBox] = useState(false)
  const { userState, logout } = useUser()

  useEffect(() => {
    const fetchData = async () => {
      if (userState && userState.token) {
        await getAllThreads(userState!.token)
      }
    }
    fetchData()
  }, [userState?.token])

  const handleCreateThread = () => {
    setShowCreateThreadBox((oldState) => !oldState)
  }

  const handleCreateThreadSubmit = (
    title: string,
    content: string,
    mediacontent: string
  ) => {
    const newThread = {
      title,
      content,
      mediacontent,
      uploadtime: new Date(),
    }

    addThread(newThread, userState!.token)
    setShowCreateThreadBox(false)
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-5xl font-sans mb-4 text-center p-4">Foorumi</h1>
        {!userState ? (
          <Link to="/login">
            <ButtonBase color={ButtonColors.purple}>Login</ButtonBase>
          </Link>
        ) : (
          <div>
            <ButtonBase color={ButtonColors.purple} onClick={logout}>
              Logout
            </ButtonBase>
            <Link to="/settings">
              <ButtonBase color={ButtonColors.blue}>Settings</ButtonBase>
            </Link>
          </div>
        )}
      </div>
      {userState ? (
        <main className="mt-16 bg-pink-100 text-white p-8 rounded-lg max-w-5xl mx-auto">
          <div>
            <ButtonBase color={ButtonColors.blue} onClick={handleCreateThread}>
              {showCreateThreadBox ? 'Close' : 'Create thread'}
            </ButtonBase>
            {showCreateThreadBox && (
              <CreateThread onSubmit={handleCreateThreadSubmit} />
            )}
          </div>
          <div className="space-y-4 break-words">
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
      ) : (
        <></>
      )}
    </>
  )
}

export default Home
