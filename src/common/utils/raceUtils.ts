import {
  setDistance,
  setPosition,
  setVelocity,
  switchToDriveMode,
  toggleEngine,
} from '@/common/components/cars/Car/car.reducer'
import { carsApi } from '@/common/components/cars/cars.api'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'
import { Modal } from 'antd'

export function useStartRace() {
  const dispatch = useAppDispatch()

  return async function startRace(cars: any[]) {
    const promises = cars.map(async car => {
      const id = car.id
      const carName = car.name

      try {
        const response = await dispatch(toggleEngine({ id, status: 'started' }))
        const responseData = response.payload

        dispatch(setDistance({ distance: responseData.distance, id }))
        dispatch(setVelocity({ id, velocity: responseData.velocity }))

        await dispatch(switchToDriveMode(id)).unwrap()

        return {
          carName,
          distance: responseData.distance,
          duration: responseData.distance / responseData.velocity,
          id,
          position: 100,
          velocity: responseData.velocity,
        }
      } catch (error) {
        return { id, position: Math.random() * 80 }
      }
    })

    const positions = await Promise.all(promises)

    positions.forEach(({ id, position }) => {
      dispatch(setPosition({ id, position }))
    })

    const winner = positions.reduce((prev, current) => {
      if (prev.duration === undefined) {
        return current
      } else if (current.duration === undefined) {
        return prev
      } else {
        return prev.duration < current.duration ? prev : current
      }
    })

    const minVelocity = positions.reduce((prev, current) => {
      if (prev.velocity === undefined) {
        return current
      } else if (current.velocity === undefined) {
        return prev
      } else {
        return prev.velocity < current.velocity ? prev : current
      }
    })

    const duration = minVelocity.distance / minVelocity.velocity
    let currentWins = 0
    let newWins = 0

    try {
      const res = await carsApi.getWinner(winner.id)

      currentWins = res.wins ?? 0
      newWins = currentWins + 1
    } catch (error) {
      console.error('Error while fetching winner data:', error)
    }

    try {
      const existingWinner = await carsApi.getWinner(winner.id)

      if (existingWinner) {
        await carsApi.updateWinner({ id: winner.id, time: winner.duration ?? 0, wins: newWins })
      } else {
        await carsApi.createWinner({ id: winner.id, time: winner.duration ?? 0, wins: newWins })
      }
    } catch (error) {
      console.error('Error while creating/updating winner:', error)
      try {
        await carsApi.createWinner({ id: winner.id, time: winner.duration ?? 0, wins: newWins })
      } catch (error) {
        console.error('Error while creating winner:', error)
      }
    }

    setTimeout(() => {
      Modal.success({
        content: `The winner is car ${winner.carName}`,
        title: 'Race Finished',
      })
    }, duration)
  }
}
