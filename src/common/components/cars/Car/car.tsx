import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import {
  setDistance,
  setPosition,
  setVelocity,
  switchToDriveMode,
  toggleEngine,
} from '@/common/components/cars/Car/car.reducer'
import { CarType, deleteCar, selectCar } from '@/common/components/cars/cars.reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Button } from 'antd'
import { IoCarSport } from 'react-icons/io5'

import s from './car.module.scss'

export const Car = ({ color, id, name }: CarType) => {
  const car = useSelector((state: RootState) => state.car[id])
  const currentPosition = car ? car.position : 0
  const currentVelocity = car ? car.velocity : 0
  const currentDistance = car ? car.distance : 0
  const dispatch = useAppDispatch()

  const handleDelete = () => {
    if (id != null) {
      dispatch(deleteCar(id))
    }
  }

  const handleClick = () => {
    dispatch(selectCar(id))
  }

  const handleClickA = async () => {
    try {
      const response = await dispatch(toggleEngine({ id, status: 'started' }))
      const responseData = response.payload

      dispatch(setVelocity({ id, velocity: responseData.velocity }))
      dispatch(setDistance({ distance: responseData.distance, id }))

      await dispatch(switchToDriveMode(id)).unwrap()
      dispatch(setPosition({ id, position: 100 }))
    } catch (error) {
      dispatch(setPosition({ id, position: Math.random() * 80 }))
    }
  }

  const handleClickB = () => {
    dispatch(toggleEngine({ id, status: 'stopped' }))
    dispatch(setPosition({ id, position: 0 }))
  }

  const duration = currentDistance / currentVelocity

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
        <Button onClick={handleClickA} type={'primary'}>
          A
        </Button>
        <Button danger onClick={handleClickB} type={'primary'}>
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
