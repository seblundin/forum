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
                email
                username
                id
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
export { createThread }
