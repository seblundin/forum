/*
Reply box that can be opened with button click
*/
import React, { useState } from 'react'

const Reply = ({ onSubmit }) => {
  const [replyText, setReplyText] = useState('')

  const handleTextareaChange = (event) => {
    setReplyText(event.target.value)
  }

  const handleSubmitReply = () => {
    onSubmit(replyText) // Pass the reply text to the parent component
    setReplyText('') // Clear the textarea after submitting
  }

  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md">
        <textarea
          placeholder="Type your reply..."
          rows={3}
          className="w-full p-2 text-black"
          value={replyText}
          onChange={handleTextareaChange}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          onClick={handleSubmitReply}
        >
          Submit Reply
        </button>
      </div>
    </>
  )
}

export default Reply
