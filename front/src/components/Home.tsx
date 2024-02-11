import { Thread } from '../types/Types'

const Home = () => {
  const thread: Thread = {
    id: 12312313,
    title: 'Testilanka',
    content: 'moi',
    replies: [
      { id: 1, message: 'Reply 1' },
      { id: 2, message: 'Reply 2' },
    ],
  }

  const thread2: Thread = {
    id: 12312314,
    title: 'Another Testilanka',
    content: 'hello',
    replies: [
      { id: 3, message: 'Reply 3' },
      { id: 4, message: 'Reply 4' },
    ],
  }

  const threadList: Thread[] = [thread, thread2]

  const handleCreateThread = () => {
    // Implement the logic to create a new thread
    console.log('Create thread button clicked')
  }

  return (
    <>
      <h1 className="text-5xl font-sans mb-4 text-center p-4">Foorumi</h1>
      <main className="mt-16 bg-pink-100 text-white p-8 rounded-lg max-w-5xl mx-auto">
        <div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
            onClick={handleCreateThread}
          >
            Create Thread
          </button>
        </div>
        <div className="space-y-4">
          {threadList.map((thread) => (
            <div
              className="bg-white p-6 rounded-lg shadow-md w-full"
              key={thread.id}
            >
              <p className="text-2xl font-sans mb-2 text-black">
                {thread.title}
              </p>
              <div className="text-black">
                <p>{thread.content}</p>
              </div>
              <div className="mt-4 space-y-2">
                {thread.replies &&
                  thread.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="bg-gray-100 p-4 rounded-lg shadow-md"
                    >
                      <p className="text-black">{reply.message}</p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home