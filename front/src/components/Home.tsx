import { Thread } from '../types/Types'

const Home = () => {
  const thread: Thread = {
    id: 12312313,
    title: 'Testilanka',
    content: 'moi',
  }

  const thread2: Thread = {
    id: 12312314,
    title: 'Another Testilanka',
    content: 'hello',
  }

  const threadList: Thread[] = [thread, thread2]

  return (
    <>
      <h1 className="text-5xl font-sans mb-4">Foorumi</h1>
      <main className="mt-16 bg-pink-100 text-white p-8 rounded-lg">
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
            </div>
          ))}
        </div>
      </main>
    </>
  )
}

export default Home
