/*
Front page that shows list of threads
*/
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Thread, User } from '../types/Types'
import Reply from './Reply'
import CreateThread from './CreateThread'

const Home = () => {
  const [threadList, setThreadList] = useState<Thread[]>([])
  const [showReplyBoxForThread, setShowReplyBoxForThread] = useState<
    number | null
  >(null)
  const [showCreateThreadBox, setShowCreateThreadBox] = useState<boolean>(false)

  const handleCreateThread = () => {
    setShowCreateThreadBox(true)
  }

  const handleCreateThreadSubmit = (title: string, content: string) => {
    const user = {
      id: 123,
      name: 'TestUser1',
    }
    const newThread = {
      id: Date.now(),
      user: user,
      title: title,
      content: content,
      replies: [],
    }

    setThreadList((prevThreads) => [...prevThreads, newThread])
    setShowCreateThreadBox(false)
  }

  const handleButtonClick = (threadId: number) => {
    setShowReplyBoxForThread(threadId)
  }

  const handleReplySubmit = (replyText: string, threadId: number) => {
    const user = {
      id: 123,
      name: 'TestUser2',
    }
    const updatedThreadList = threadList.map((thread) =>
      thread.id === threadId
        ? {
            ...thread,
            replies: [
              ...thread.replies,
              { id: Date.now(), user: user, message: replyText },
            ],
          }
        : thread
    )

    setThreadList(updatedThreadList)
    setShowReplyBoxForThread(null)
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
          {threadList.map((thread) => (
            <div
              className="bg-white p-6 rounded-lg shadow-md w-full"
              key={thread.id}
            >
              <p className="text-2xl font-sans mb-2 text-black">
                {thread.title}
              </p>
              <p className="text-l font-sans mb-2 text-black">
                User:&nbsp;
                {thread.user.name}
              </p>
              <div className="text-black">
                <p>{thread.content}</p>
              </div>
              <div className="mt-4 space-y-2">
                {thread.replies &&
                  thread.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <p className="text-l font-sans mb-2 text-black">
                        User:&nbsp;
                        {thread.user.name}
                      </p>
                      <p className="text-black">{reply.message}</p>
                    </div>
                  ))}
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  onClick={() => handleButtonClick(thread.id)}
                >
                  Reply
                </button>
                {showReplyBoxForThread === thread.id && (
                  <Reply
                    onSubmit={(replyText) =>
                      handleReplySubmit(replyText, thread.id)
                    }
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home
