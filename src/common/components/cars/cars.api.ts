import { instance } from '@/common/api/common.api'
import { CarType } from '@/common/components/cars/cars.reducer'

export type CarsApiResponse = {
  data: CarType[]
}

export type CarApiResponse = {
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

  switchToDriveMode(id: number) {
    return instance
      .patch('/engine', null, {
        params: {
          id,
          status: 'drive',
        },
      })
      .then(response => response.data)
  },
  toggleEngine({ id, status }: { id: number; status: 'started' | 'stopped' }) {
    return instance
      .patch('/engine', null, {
        params: {
          id,
          status,
        },
      })
      .then(response => response.data)
  },

  updateCar(carData: CarType) {
    return instance.put(`/garage/${carData.id}`, { color: carData.color, name: carData.name })
  },
}
