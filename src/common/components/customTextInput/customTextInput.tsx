// TextInput.tsx
import { ChangeEvent } from 'react'

import { Input } from 'antd'

type Props = {
  onChange: (inputValue: string) => void
  placeholder: string
  value: string
}

export const CustomTextInput = ({ onChange, placeholder, value }: Props) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.currentTarget.value)
  }

  return <Input onChange={handleInputChange} placeholder={placeholder} value={value} />
}
