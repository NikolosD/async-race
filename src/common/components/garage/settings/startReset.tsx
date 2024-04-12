import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Button } from 'antd'

import s from '@/features/garage/garage.module.scss'

import {
  setDistance,
  setPosition,
  setVelocity,
  switchToDriveMode,
  toggleEngine,
} from '../../cars/Car/car.reducer'

const StartReset = () => {
  const dispatch = useAppDispatch()
  const cars = useSelector((state: RootState) => state.cars.cars)

  const startRace = async () => {
    const promises = cars.map(async car => {
      const id = car.id

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
    })

    await Promise.allSettled(promises)
  }

  return (
    <>
      <div className={s.startReset}>
        <Button onClick={startRace} type={'primary'}>
          Race
        </Button>
        <Button danger type={'primary'}>
          Reset
        </Button>
      </div>
    </>
  )
}

export default StartReset
