import { useState } from 'react'
import { Thread } from '../types/Types'
import Reply from './Reply'
import { useThreadContext } from '../context/ThreadContext'
import ButtonBase from './ButtonBase'
import { useUser } from '../context/UserContext'

const ThreadComponent = ({ thread }: { thread: Thread }): JSX.Element => {
  const [showReplyBoxForReply, setShowReplyBoxForReply] =
    useState<boolean>(false)
  const { userState } = useUser()

  const { threads, addThread } = useThreadContext()
  const children = threads.filter((th) => th.parent === thread.id)

  const handleButtonClick = () => {
    setShowReplyBoxForReply((oldState) => !oldState)
  }
  return (
    <div className="flex-col bg-white p-6 rounded-lg shadow-md" key={thread.id}>
      <p className="text-2xl font-sans mb-2 text-black">{thread.title}</p>
      <div className="text-black">
        <p>{thread.content}</p>
        {thread.mediacontent && (
          <img src={thread.mediacontent} className="w-auto h-36 my-2"></img>
        )}
      </div>
      <p className="text-l font-sans text-xs my-2 italic text-right text-black">
        User:&nbsp;{thread.owner?.username}
      </p>
      {children.map((child) => (
        <ThreadComponent thread={child} key={child.id}></ThreadComponent>
      ))}
      <div className="mt-4 space-y-2">
        <ButtonBase onClick={handleButtonClick}>
          {showReplyBoxForReply ? 'Close' : 'Reply'}
        </ButtonBase>
        {showReplyBoxForReply && (
          <Reply
            onSubmit={async (replyText: string, mediacontent: string) => {
              const newThread = {
                content: replyText,
                mediacontent,
                parent: thread.id,
                uploadtime: new Date(),
              }
              await addThread(newThread, userState!.token)
              handleButtonClick()
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ThreadComponent
