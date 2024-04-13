import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { setDuration } from '@/common/components/cars/Car/car.reducer'
import { CarType, deleteCar, selectCar } from '@/common/components/cars/cars.reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useHandleClick } from '@/common/hooks/useHandleClick'
import { Button } from 'antd'
import { IoCarSport } from 'react-icons/io5'

import s from './car.module.scss'

export const Car = ({ color, id, name }: CarType) => {
  const car = useSelector((state: RootState) => state.car[id])
  const currentPosition = car ? car.position : 0
  const currentVelocity = car ? car.velocity : 0
  const currentDistance = car ? car.distance : 0
  const duration = car ? car.duration : 0
  const dispatch = useAppDispatch()
  const handleClickAa = useHandleClick(true, id)
  const handleClickBb = useHandleClick(false, id)

  const handleDelete = () => {
    if (id != null) {
      dispatch(deleteCar(id))
    }
  }

  const handleClick = () => {
    dispatch(selectCar(id))
  }

  dispatch(setDuration({ distance: currentDistance, id, velocity: currentVelocity }))

  const style = {
    left: `${currentPosition}%`,
    transition: `left ${duration}ms linear`,
  }

  return (
    <div className={s.container}>
      <div className={s.selectRemovePanel}>
        <Button onClick={handleClick} type={'primary'}>
          Select
        </Button>
        <Button danger onClick={handleDelete} type={'primary'}>
          Remove
        </Button>
      </div>
      <div className={s.startStop}>
        <Button onClick={handleClickAa} type={'primary'}>
          A
        </Button>
        <Button danger onClick={handleClickBb} type={'primary'}>
          B
        </Button>
      </div>
      <div className={s.carContainer}>
        <div className={s.car} style={style}>
          <IoCarSport color={color} size={40} />
        </div>
        <div className={s.name}>{name}</div>
      </div>
    </div>
  )
}
