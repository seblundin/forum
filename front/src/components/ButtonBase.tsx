interface Props {
  color?: string
  props?: { [name: string]: string }
  onClick?: () => void
  children: React.ReactNode
}

const ButtonBase = ({ color = 'green', props, onClick, children }: Props) => {
  return (
    <button
      type="submit"
      className={`bg-${color}-500 text-white px-4 py-2 rounded-md hover:bg-${color}-600`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default ButtonBase
