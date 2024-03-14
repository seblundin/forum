/*
Reply box that can be opened with button click
*/
import { useState } from 'react'
import ButtonBase from './ButtonBase'
import ButtonColors from '../enums/ButtonColors'

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
          minLength={1}
          maxLength={500}
          onChange={handleTextareaChange}
        />
        <ButtonBase color={ButtonColors.blue} onClick={handleSubmitReply}>
          Submit Reply
        </ButtonBase>
      </div>
    </>
  )
}

export default Reply
