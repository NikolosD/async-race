import { carsReducer } from '@/common/components/cars/cars.reducer'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: { cars: carsReducer },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
