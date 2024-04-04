import { Button } from 'antd'
import { IoCarSport } from 'react-icons/io5'

import s from './car.module.scss'

export const Car = () => {
  return (
    <>
      <div className={s.container}>
        <div className={s.selectRemovePanel}>
          <Button>Select</Button>
          <Button>Remove</Button>
        </div>
        <div className={s.startStop}>
          <Button>A</Button>
          <Button>B</Button>
        </div>
        <div className={s.car}>
          <IoCarSport size={40} />
        </div>
      </div>
    </>
  )
}
