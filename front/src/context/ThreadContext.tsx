import React, { createContext, useState, ReactNode, useContext } from 'react'
import { Thread } from '../types/Types'
import { createThread } from '../services/ThreadService'

interface ThreadContextProps {
  threads: Thread[]
  addThread: (newThread: Thread, token: string) => Promise<void>
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

  const addThread = async (newThread: Thread, token: string) => {
    const thread = await createThread({ thread: newThread }, token)
    setThreadList((prevThreads) => [...prevThreads, thread])
  }

  const contextValue: ThreadContextProps = { threads, addThread }

  return (
    <ThreadContext.Provider value={contextValue}>
      {children}
    </ThreadContext.Provider>
  )
}
