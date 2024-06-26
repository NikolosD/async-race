import { RootState } from '@/app/store'
import { carsApi } from '@/common/components/cars/cars.api'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export type CarType = {
  color: string
  id: number
  name: string
}

type CarsState = {
  cars: CarType[]
  currentPage: number
  isLoading: boolean
  pageSize: number
  selectedCarId: number
  totalCarsCount: number
}

const initialState: CarsState = {
  cars: [],
  currentPage: 1,
  isLoading: false,
  pageSize: 7,
  selectedCarId: 0,
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

export const deleteCar = createAsyncThunk<{ id: number }, number>(
  'cars/deleteCar',
  async (id: number, { rejectWithValue }) => {
    try {
      await carsApi.deleteCar(id)

      return { id }
    } catch (error: any) {
      return rejectWithValue({ id, message: error.message })
    }
  }
)

export const updateCar = createAsyncThunk<
  { color: string; id: number; name: string },
  { color: string; id: number; name: string },
  { rejectValue: { errorMessage: string } }
>('cars/updateCar', async (newCarData, { rejectWithValue }) => {
  try {
    const response = await carsApi.updateCar(newCarData)

    return response.data
  } catch (err: any) {
    return rejectWithValue({ errorMessage: err.message })
  }
})

export const generateCars = createAsyncThunk(
  'cars/generateCars',
  async (_, { dispatch, getState }) => {
    const { totalCarsCount } = (getState() as RootState).cars

    for (let i = 0; i < 100; i++) {
      const randomColor = getRandomColor()
      const randomName = getRandomName()
      const randomId = totalCarsCount + i + 1

      await dispatch(createCar({ color: randomColor, id: randomId, name: randomName }))
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
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(todo => todo.id === action.payload.id)

        if (index !== -1) {
          state.cars.splice(index, 1)
        }
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(car => car.id === action.payload.id)

        if (index !== -1) {
          state.cars[index] = action.payload
        }
      })
      .addCase(generateCars.fulfilled, (state, action) => {
        // @ts-ignore
        state.cars.push(...action.payload)
      })
  },
  initialState,
  name: 'cars',
  reducers: {
    selectCar: (state, action) => {
      state.selectedCarId = action.payload
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
export const { selectCar, setCurrentPage, setLoading } = slice.actions
