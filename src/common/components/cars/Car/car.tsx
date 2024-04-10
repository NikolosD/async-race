import { deleteCar } from '@/common/components/cars/cars.reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Button } from 'antd'
import { IoCarSport } from 'react-icons/io5'

import s from './car.module.scss'

type CarProps = {
  color: string
  id: number
  name: string
}

export const Car = ({ color, id, name }: CarProps) => {
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    dispatch(deleteCar(id))
  }

  return (
    <>
      <div className={s.container}>
        <div className={s.selectRemovePanel}>
          <Button type={'primary'}>Select</Button>
          <Button danger onClick={handleDelete} type={'primary'}>
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
