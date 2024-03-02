import { useState } from 'react'
import { Thread, User } from '../types/Types'
import Reply from './Reply'
import { useThreadContext } from '../context/ThreadContext'

const ThreadComponent = ({ thread }: { thread: Thread }): JSX.Element => {
  const [showReplyBoxForReply, setShowReplyBoxForReply] =
    useState<boolean>(false)

  const { threads, addThread } = useThreadContext()
  const children = threads.filter((th) => th.parent?.id === thread.id)

  const handleButtonClick = () => {
    setShowReplyBoxForReply((oldState) => !oldState)
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full" key={thread.id}>
      <p className="text-2xl font-sans mb-2 text-black">{thread.title}</p>
      <p className="text-l font-sans mb-2 text-black">
        User:&nbsp;{thread.user.name}
      </p>
      <div className="text-black">
        <p>{thread.content}</p>
      </div>
      {children.map((child) => (
        <ThreadComponent thread={child}></ThreadComponent>
      ))}
      <div className="mt-4 space-y-2">
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => handleButtonClick()}
        >
          Reply
        </button>
        {showReplyBoxForReply && (
          <Reply
            onSubmit={(replyText: string) => {
              const user = {
                id: '123',
                name: 'TestUser1',
              } as User
              const newThread = {
                id: Date.now().toString(),
                user: user,
                content: replyText,
                parent: thread,
                uploadtime: new Date(),
              } as Thread
              addThread(newThread)
              handleButtonClick()
            }}
          />
        )}
      </div>
    </div>
  )
}

/**
 * <div
              key={reply.id}
              className="bg-gray-100 p-4 rounded-lg shadow-md"
            >
              <p className="text-l font-sans mb-2 text-black">
                User:&nbsp;{reply.user.name}
              </p>
              <p className="text-black">{reply.message}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={() => handleButtonClick(reply.id)}
              >
                Reply
              </button>
              {showReplyBoxForReply === reply.id && (
                <Reply
                  onSubmit={(replyText: string) =>
                    handleReplySubmit(replyText, reply.id)
                  }
                />
              )}
            </div>
 */

export default ThreadComponent
