import { Button } from 'antd'
import { IoCarSport } from 'react-icons/io5'

import s from './car.module.scss'

type CarProps = {
  color: string
  id: number
  name: string
}

export const Car = ({ color, name }: CarProps) => {
  return (
    <>
      <div className={s.container}>
        <div className={s.selectRemovePanel}>
          <Button type={'primary'}>Select</Button>
          <Button danger type={'primary'}>
            Remove
          </Button>
        </div>
        <div className={s.startStop}>
          <Button type={'primary'}>A</Button>
          <Button danger type={'primary'}>
            B
          </Button>
        </div>
        <div className={s.car}>
          <IoCarSport color={color} size={40} />
        </div>
        <div className={s.name}>{name}</div>
      </div>
    </>
  )
}
