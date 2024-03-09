import { ChangeEvent } from 'react'

export default interface Input {
  type: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  properties?: { [name: string]: string }
}
