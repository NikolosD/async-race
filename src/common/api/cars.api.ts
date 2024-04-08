// Define the response shape for the cars API
import { instance } from '@/common/api/common.api'
import { CarType } from '@/components/cars/cars.reducer'

export interface CarsApiResponse {
  data: CarType[]
}

// Define the response shape for a single car API
export interface CarApiResponse {
  data: CarType
}

export const carsApi = {
  createCar(carData: CarType): Promise<CarType> {
    return instance.post('/garage', carData).then(response => response.data.data)
  },

  deleteCar(carId: number): Promise<void> {
    return instance.delete(`/garage/${carId}`).then(() => undefined)
  },

  getCars() {
    return instance.get<CarType[]>('/garage').then(response => response.data)
  },

  updateCar(carId: number, carData: CarType): Promise<CarType> {
    return instance.put(`/garage/${carId}`, carData).then(response => response.data.data)
  },
}
