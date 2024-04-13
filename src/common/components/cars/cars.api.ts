import { instance } from '@/common/api/common.api'
import { CarType } from '@/common/components/cars/cars.reducer'

type Winner = {
  id: number
  time: number
  wins: number
}

export const carsApi = {
  createCar(carData: CarType) {
    return instance.post('/garage', carData).then(response => response.data)
  },

  createWinner(winnerData: Winner) {
    return instance.post('/winners', winnerData)
  },
  deleteCar(carId: number) {
    return instance.delete(`/garage/${carId}`).then(() => undefined)
  },
  getCars() {
    return instance.get<CarType[]>('/garage').then(response => response.data)
  },
  getWinner(carId: number) {
    return instance.get<Winner>(`/winners/${carId}`).then(response => response.data)
  },
  getWinners(page?: number, limit?: number, sort?: string, order?: string) {
    const queryParams = {
      _limit: limit,
      _order: order,
      _page: page,
      _sort: sort,
    }

    return instance
      .get<Winner[]>('/winners', { params: queryParams })
      .then(response => response.data)
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

  updateWinner(winner: Winner) {
    return instance.put(`/winners/${winner.id}`, { time: winner.time, wins: winner.wins })
  },
}
