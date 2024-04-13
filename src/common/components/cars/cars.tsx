import { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { Car } from '@/common/components/cars/Car/car'
import { fetchCars } from '@/common/components/cars/cars.reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Spin } from 'antd'

import s from './cars.module.scss'

type Props = {}
export const Cars: FC<Props> = () => {
  const selectCars = (state: RootState) => state.cars
  const { cars, currentPage, pageSize } = useSelector(selectCars)
  const dispatch = useAppDispatch()

  const isLoading = useSelector((state: RootState) => state.cars.isLoading)

  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch])

  const indexOfLastCar = currentPage * pageSize
  const indexOfFirstCar = indexOfLastCar - pageSize

  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar)

  if (isLoading) {
    return <Spin className={s.loader} size={'large'} tip={'Loading'} />
  }

  return (
    <>
      <div>
        {currentCars.map(({ color, id, name }) => (
          <Car color={color} id={id} key={id} name={name} />
        ))}
      </div>
    </>
  )
}
