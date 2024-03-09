import React, { createContext, useState, ReactNode, useContext } from 'react'
import { Thread } from '../types/Types'

interface ThreadContextProps {
  threads: Thread[]
  addThread: (newThread: Thread) => void
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

  const addThread = (newThread: Thread) => {
    setThreadList((prevThreads) => [...prevThreads, newThread])
  }

  const contextValue: ThreadContextProps = { threads, addThread }

  return (
    <ThreadContext.Provider value={contextValue}>
      {children}
    </ThreadContext.Provider>
  )
}
