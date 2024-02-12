import React, { useState } from 'react'

const CreateThread = ({ onSubmit }) => {
  const [threadTitle, setThreadTitle] = useState('')
  const [threadContent, setThreadContent] = useState('')

  const handleTitleChange = (event) => {
    setThreadTitle(event.target.value)
  }

  const handleContentChange = (event) => {
    setThreadContent(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit(threadTitle, threadContent)
    setThreadTitle('')
    setThreadContent('')
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md text-black">
      <input
        type="text"
        placeholder="Thread Title"
        value={threadTitle}
        onChange={handleTitleChange}
        className="w-full p-2 mb-2"
      />
      <textarea
        placeholder="Thread Content..."
        rows={3}
        value={threadContent}
        onChange={handleContentChange}
        className="w-full p-2 mb-2"
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Create Thread
      </button>
    </div>
  )
}

export default CreateThread
