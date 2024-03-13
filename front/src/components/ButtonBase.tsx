import ButtonColors from '../enums/ButtonColors'

interface Props {
  color?: ButtonColors
  props?: { [name: string]: string }
  onClick?: () => void
  children: React.ReactNode
}

const ButtonBase = ({
  color = ButtonColors.green,
  props,
  onClick,
  children,
}: Props) => {
  const colorVariants: { [name: string]: string } = {
    green: 'bg-green-500 hover:bg-green-600',
    blue: 'bg-blue-500 hover:bg-blue-600',
    purple: 'bg-purple-500 hover:bg-purple-600',
  }
  return (
    <button
      type="button"
      className={`${colorVariants[color]} text-white px-4 py-2 rounded-md m-1`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonBase
