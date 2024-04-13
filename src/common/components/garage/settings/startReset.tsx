import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { useStartRace } from '@/common/utils/raceUtils'
import { Button } from 'antd'

import s from '@/features/garage/garage.module.scss'

import { setPosition, toggleEngine } from '../../cars/Car/car.reducer'

export const StartReset = () => {
  const dispatch = useAppDispatch()
  const cars = useSelector((state: RootState) => state.cars.cars)
  const startRace = useStartRace()

  const resetRace = () => {
    cars.map(car => {
      const id = car.id

      try {
        dispatch(toggleEngine({ id, status: 'stopped' }))
        dispatch(setPosition({ id, position: 0 }))
      } catch (error) {
        console.log(error)
      }
    })
  }

  return (
    <>
      <div className={s.startReset}>
        <Button onClick={() => startRace(cars)} type={'primary'}>
          Race
        </Button>
        <Button danger onClick={resetRace} type={'primary'}>
          Reset
        </Button>
      </div>
    </>
  )
}
