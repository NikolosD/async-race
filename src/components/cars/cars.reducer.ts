import { carsApi } from '@/common/api/cars.api'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface CarType {
  color: string
  id: number
  name: string
}

interface CarsState {
  cars: CarType[]
  currentPage: number
  pageSize: number
  totalCarsCount: number
}

const initialState: CarsState = {
  cars: [],
  currentPage: 1,
  pageSize: 7,
  totalCarsCount: 1,
}

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  return await carsApi.getCars()
})

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.cars = action.payload
      state.totalCarsCount = action.payload.length
    })
  },
  initialState,
  name: 'cars',
  reducers: {
    generateCars: state => {
      const newCars: CarType[] = []

      for (let i = 0; i < 100; i++) {
        const randomColor = getRandomColor()
        const randomName = getRandomName()
        const randomId = state.totalCarsCount + i + 1

        newCars.push({ color: randomColor, id: randomId, name: randomName })
      }
      state.cars.push(...newCars)
      state.totalCarsCount += newCars.length
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
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
export const { generateCars, setCurrentPage } = slice.actions
