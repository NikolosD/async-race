import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import {
  setPosition,
  setSpeed,
  startAnimation,
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
      await dispatch(toggleEngine({ id, status: 'started' }))
      await dispatch(switchToDriveMode(id)).unwrap()
      dispatch(setPosition({ id, position: 100 }))
    } catch (error) {
      dispatch(setPosition({ id, position: Math.random() * 80 }))
    }
  }

  const handleClickB = () => {
    dispatch(toggleEngine({ id, status: 'stopped' }))
    dispatch(setPosition({ id, position: 0 }))
    dispatch(setSpeed({ id, speed: 0 }))
    dispatch(startAnimation({ id, isAnimating: false }))
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
        <div
          className={s.car}
          style={{ left: `${currentPosition}%`, transition: 'left 2s linear' }}
        >
          <IoCarSport color={color} size={40} />
        </div>
        <div className={s.name}>{name}</div>
      </div>
    </div>
  )
}
