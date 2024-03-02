type Thread = {
  id: string
  title?: string
  user: User
  content: string
  parent?: Thread
  uploadtime: Date
}

type User = {
  id: string
  name: string
}

export type { Thread, User }
