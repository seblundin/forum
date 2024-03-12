import { useState } from 'react'
import useInput from '../hooks/useInput'
import InputBase from './InputBase'
import ButtonBase from './ButtonBase'
import ButtonColors from '../enums/ButtonColors'

const CreateThread = ({
  onSubmit,
}: {
  onSubmit: (title: string, content: string) => void
}) => {
  const [threadContent, setThreadContent] = useState('')

  const threadTitle = useInput({
    placeholder: 'Thread Title',
    className: 'w-full p-2 mb-2',
  })

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setThreadContent(event.target.value)
  }

  const handleSubmit = () => {
    onSubmit(threadTitle.value, threadContent)
    threadTitle.onChange()
    setThreadContent('')
  }

  return (
    <div className="bg-gray-200 p-4 rounded-lg shadow-md text-black">
      <InputBase props={threadTitle} />
      <textarea
        placeholder="Thread Content..."
        rows={3}
        value={threadContent}
        onChange={handleContentChange}
        className="w-full p-2 mb-2"
      />
      <ButtonBase color={ButtonColors.blue} onClick={handleSubmit}>
        Create Thread
      </ButtonBase>
    </div>
  )
}

export default CreateThread
