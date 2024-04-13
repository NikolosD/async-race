import {
  setDistance,
  setPosition,
  setVelocity,
  switchToDriveMode,
  toggleEngine,
} from '@/common/components/cars/Car/car.reducer'
import { useAppDispatch } from '@/common/hooks/useAppDispatch'

export function useHandleClick(isA: boolean, id: number) {
  const dispatch = useAppDispatch()

  const handleClick = async () => {
    if (isA) {
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
    } else {
      dispatch(toggleEngine({ id, status: 'stopped' }))
      dispatch(setPosition({ id, position: 0 }))
    }
  }

  return handleClick
}
