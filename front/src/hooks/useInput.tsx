import { ChangeEvent, useState } from 'react'

const useInput = (
  properties?: { [name: string]: string | boolean },
  defaultValue: string = '',
  type: string = 'text'
) => {
  const [value, setValue] = useState(defaultValue)

  const onChange = (event?: ChangeEvent<HTMLInputElement>, data?: string) => {
    setValue(event?.target.value || data || '')
  }

  return {
    type,
    value,
    onChange,
    maxLength: '50',
    ...properties,
  }
}

export default useInput
