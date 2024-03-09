/*
Reply box that can be opened with button click
*/
import { useState } from 'react'
import ButtonBase from './ButtonBase'

const Reply = ({ onSubmit }: { onSubmit: (comment: string) => void }) => {
  const [replyText, setReplyText] = useState('')

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
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
        <ButtonBase color="blue" onClick={handleSubmitReply}>
          Submit Reply
        </ButtonBase>
      </div>
    </>
  )
}

export default Reply
