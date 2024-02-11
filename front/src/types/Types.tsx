type Thread = {
  id: number
  title: string
  content: string
  replies: Reply[]
}

type Reply = {
  id: number
  message: string
}

export { Thread, Reply }
