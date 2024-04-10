import { instance } from '@/common/api/common.api'
import { CarType } from '@/common/components/cars/cars.reducer'

export interface CarsApiResponse {
  data: CarType[]
}

export interface CarApiResponse {
  data: CarType
}

export const carsApi = {
  createCar(carData: CarType) {
    return instance.post('/garage', carData).then(response => response.data)
  },

  deleteCar(carId: number) {
    return instance.delete(`/garage/${carId}`).then(() => undefined)
  },

  getCars() {
    return instance.get<CarType[]>('/garage').then(response => response.data)
  },

  updateCar(carId: number, carData: CarType): Promise<CarType> {
    return instance.put(`/garage/${carId}`, carData).then(response => response.data)
  },
}
