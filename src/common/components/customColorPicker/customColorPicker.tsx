import { ColorPicker } from 'antd'
import { Color } from 'antd/lib/color-picker'

type Props = {
  color: string
  defaultValue: string
  onChange: (color: string) => void
}

export const CustomColorPickerComponent = ({ color, defaultValue, onChange }: Props) => {
  const handleColorChange = (color: Color) => {
    onChange(color.toHexString())
  }

  return (
    <ColorPicker defaultValue={defaultValue} onChangeComplete={handleColorChange} value={color} />
  )
}
