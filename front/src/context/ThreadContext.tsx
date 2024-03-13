import React, { createContext, useState, ReactNode, useContext } from 'react'
import { Thread, ThreadInput } from '../types/Types'
import {
  createThread,
  getComments,
  getThreads,
} from '../services/ThreadService'

interface ThreadContextProps {
  threads: Thread[]
  addThread: (newThread: ThreadInput, token: string) => Promise<void>
  getAllThreads: (token: string) => Promise<void>
}

interface ThreadProviderProps {
  children: ReactNode
}

const ThreadContext = createContext<ThreadContextProps | undefined>(undefined)

// eslint-disable-next-line react-refresh/only-export-components
export const useThreadContext = (): ThreadContextProps => {
  const context = useContext(ThreadContext)
  if (!context) {
    throw new Error('useThreadContext must be used within a ThreadProvider')
  }
  return context
}

export const ThreadProvider: React.FC<ThreadProviderProps> = ({ children }) => {
  const [threads, setThreadList] = useState<Thread[]>([])

  const addThread = async (newThread: ThreadInput, token: string) => {
    const thread: Thread = await createThread({ thread: newThread }, token)
    setThreadList((prevThreads) => [...prevThreads, thread])
  }

  const getAllThreads = async (token: string) => {
    const threads: Thread[] = (await getThreads(token))!
    const comments: Thread[] = []
    for (let i = 0; i < threads.length; i++) {
      const result = await getComments(token, threads[i].id)
      comments.push(...result!)
    }
    setThreadList([...threads, ...comments])
  }

  const contextValue: ThreadContextProps = { threads, addThread, getAllThreads }

  return (
    <ThreadContext.Provider value={contextValue}>
      {children}
    </ThreadContext.Provider>
  )
}
