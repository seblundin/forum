import CommentResponse from '../interfaces/CommentResponse'
import ThreadResponse from '../interfaces/ThreadResponse'

const createThread = async (
  vars: {
    thread: { title?: string; content: string }
  },
  token: string
) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `mutation addThread($thread: ThreadInput!) {
            addThread(thread: $thread) {
              id
              title
              content
              uploadtime
              mediacontent
              owner {
                username
              }
              parent
            }
          }`,
        variables: vars,
      }),
    })

    const data = await response.json()
    console.log(data)
    return data.data.addThread
  } catch (error) {
    console.error(error)
  }
}

const getThreads = async (token: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query Query {
            threads {
              id
              title
              content
              uploadtime
              mediacontent
              owner {
                username
              }
              parent
            }
          }`,
      }),
    })

    const body: ThreadResponse = await response.json()
    console.log(body)
    return body.data.threads
  } catch (error) {
    console.error(error)
  }
}

const getComments = async (token: string, threadId: string) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `query commentsByThread($threadId: ID!) {
          commentsByThread(threadId: $threadId) {
            id
            title
            content
            uploadtime
            mediacontent
            owner {
              username
            }
            parent
          }
        }`,
        variables: {
          threadId,
        },
      }),
    })

    const body: CommentResponse = await response.json()
    console.log(body)
    return body.data.commentsByThread
  } catch (error) {
    console.error(error)
  }
}
export { createThread, getThreads, getComments }
