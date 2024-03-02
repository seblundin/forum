type Thread = {
  id: number
  title: string
  user: User
  content: string
  replies: Reply[]
}

type Reply = {
  id: number
  message: string
  user: User
}

type User = {
  id: number
  name: string
}

export type { Thread, Reply, User }
