import { carsApi } from '@/common/components/cars/cars.api'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type CarType = {
  color: string
  id?: number
  name: string
}

type CarsState = {
  cars: CarType[]
  currentPage: number
  isLoading: boolean
  pageSize: number
  totalCarsCount: number
}

const initialState: CarsState = {
  cars: [],
  currentPage: 1,
  isLoading: false,
  pageSize: 7,
  totalCarsCount: 1,
}

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await carsApi.getCars()

      dispatch(setLoading(false))

      return response
    } catch (error: any) {
      dispatch(setLoading(false))

      return rejectWithValue(error.message)
    }
  }
)

export const createCar = createAsyncThunk(
  'cars/createCar',
  async (newCar: CarType, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await carsApi.createCar(newCar)

      dispatch(setLoading(false))

      return response
    } catch (error: any) {
      dispatch(setLoading(false))

      return rejectWithValue(error.message)
    }
  }
)

const slice = createSlice({
  extraReducers: builder => {
    builder
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload
        state.totalCarsCount = action.payload.length
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.cars.push(action.payload)
        state.totalCarsCount += 1
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
    setLoading: (state, action) => {
      state.isLoading = action.payload
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
export const { generateCars, setCurrentPage, setLoading } = slice.actions
