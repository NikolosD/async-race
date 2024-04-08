import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/app/store'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Car } from '@/components/cars/Car/car'
import { fetchCars } from '@/components/cars/cars.reducer'

export const Cars = () => {
  const dispatch = useAppDispatch()
  const selectCars = (state: RootState) => state.cars
  const { cars, currentPage, pageSize } = useSelector(selectCars)

  useEffect(() => {
    dispatch(fetchCars())
  }, [dispatch])

  const indexOfLastCar = currentPage * pageSize
  const indexOfFirstCar = indexOfLastCar - pageSize

  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar)

  return (
    <>
      <div>
        {currentCars.map(car => (
          <Car color={car.color} id={car.id} key={car.id} name={car.name} />
        ))}
      </div>
    </>
  )
}
