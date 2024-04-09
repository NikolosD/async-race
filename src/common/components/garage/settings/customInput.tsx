import { ComponentPropsWithoutRef } from 'react'

import { Button, ColorPicker, Input } from 'antd'

import s from '@/features/garage/garage.module.scss'

type Props = {
  name: string
} & ComponentPropsWithoutRef<'input'>
export const CustomInput = ({ name }: Props) => {
  return (
    <>
      <div className={s.form}>
        <Input />
        <ColorPicker />
        <Button danger type={'primary'}>
          {name}
        </Button>
      </div>
    </>
  )
}
