/*
Reply box that can be opened with button click
*/
import { useState } from 'react'
import ButtonBase from './ButtonBase'
import ButtonColors from '../enums/ButtonColors'
import useInput from '../hooks/useInput'
import InputBase from './InputBase'

const Reply = ({
  onSubmit,
}: {
  onSubmit: (comment: string, mediacontent: string) => void
}) => {
  const [replyText, setReplyText] = useState('')
  const media = useInput({
    placeholder: 'Link to image...',
    maxLength: '500',
  })

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyText(event.target.value)
  }

  const handleSubmitReply = () => {
    onSubmit(replyText, media.value) // Pass the reply text to the parent component
    setReplyText('') // Clear the textarea after submitting
  }

  return (
    <>
      <div className="bg-gray-200 p-4 rounded-lg shadow-md text-black">
        <textarea
          placeholder="Type your reply..."
          rows={3}
          className="w-full p-2"
          value={replyText}
          minLength={1}
          maxLength={500}
          onChange={handleTextareaChange}
        />
        <InputBase props={media} />
        {media.value && (
          <img src={media.value} className="w-auto h-36 my-2"></img>
        )}
        <ButtonBase color={ButtonColors.blue} onClick={handleSubmitReply}>
          Submit Reply
        </ButtonBase>
      </div>
    </>
  )
}

export default Reply
