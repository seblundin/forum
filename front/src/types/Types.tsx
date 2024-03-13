type Thread = {
  id: string
  title?: string
  content: string
  uploadtime: Date
  mediacontent: string
  owner: {
    id: string
    email?: string
    username?: string
  }
  parent: string
}

type ThreadInput = {
  title?: string
  content: string
  uploadtime: Date
  parent?: string
}

export type { Thread, ThreadInput }
