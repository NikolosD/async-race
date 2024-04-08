import { carsApi } from '@/common/api/cars.api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface CarType {
  color: string
  id: number
  name: string
}

interface CarsState {
  cars: CarType[]
}

const initialState: CarsState = {
  cars: [],
}

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  return await carsApi.getCars()
})

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload.map(car => ({
        ...car,
      }))
    })
  },
  initialState,
  name: 'cars',
  reducers: {
    generateCars: state => {
      const cars: CarType[] = []

      for (let i = 0; i < 100; i++) {
        const randomColor = getRandomColor()
        const randomName = getRandomName()
        const randomId = i + 1

        cars.push({ color: randomColor, id: randomId, name: randomName })
      }

      return {
        ...state,
        cars: cars,
      }
    },
  },
})

function getRandomColor(): string {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

function getRandomName(): string {
  const names = ['Tesla', 'Toyota', 'Ford', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Lexus']
  const randomIndex = Math.floor(Math.random() * names.length)

  return names[randomIndex]
}

export const carsReducer = slice.reducer
export const { generateCars } = slice.actions
