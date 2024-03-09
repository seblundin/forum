import Input from '../interfaces/Input'

interface Props {
  props: Input
}

const InputBase = ({ props }: Props): JSX.Element => {
  return (
    <input
      className="w-full p-2 border border-gray-300 rounded-md"
      {...props}
    />
  )
}

export default InputBase
