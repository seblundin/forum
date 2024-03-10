type Thread = {
  id: string
  title?: string
  user: string
  content: string
  parent?: Thread
  uploadtime: Date
}

export type { Thread }
