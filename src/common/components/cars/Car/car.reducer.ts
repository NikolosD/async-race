import { carsApi } from '@/common/components/cars/cars.api'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type CarState = {
  [id: number]: {
    color: string
    isAnimating: boolean
    name: string
    position: number
    speed: number
  }
}

const initialState: CarState = {}

const slice = createSlice({
  initialState,
  name: 'car',
  reducers: {
    setPosition(state, action: PayloadAction<{ id: number; position: number }>) {
      const { id, position } = action.payload

      if (!state[id]) {
        state[id] = { color: '', isAnimating: false, name: '', position: 0, speed: 5 }
      }
      state[id].position = position
    },
    setSpeed(state, action: PayloadAction<{ id: number; speed: number }>) {
      const { id, speed } = action.payload

      if (!state[id]) {
        state[id] = { color: '', isAnimating: false, name: '', position: 0, speed: 5 }
      }
      state[id].speed = speed
    },
    startAnimation(state, action: PayloadAction<{ id: number; isAnimating: boolean }>) {
      const { id, isAnimating } = action.payload

      if (!state[id]) {
        state[id] = { color: '', isAnimating: false, name: '', position: 0, speed: 5 }
      }
      state[id].isAnimating = isAnimating
    },
  },
})

export const toggleEngine = createAsyncThunk(
  'car/toggleEngine',
  async ({ id, status }: { id: number; status: 'started' | 'stopped' }) => {
    try {
      const response = await carsApi.toggleEngine({ id, status })

      return response
    } catch (error: any) {
      return Promise.reject(error.response.data)
    }
  }
)

export const switchToDriveMode = createAsyncThunk<{ id: number }, number, { rejectValue: string }>(
  'car/switchToDriveMode',
  async (id: number, thunkAPI) => {
    try {
      const response = carsApi.switchToDriveMode(id)

      return response
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 500) {
          return thunkAPI.rejectWithValue('Internal server error')
        }
      }

      return thunkAPI.rejectWithValue('An unexpected error occurred')
    }
  }
)
export const carReducer = slice.reducer
export const { setPosition, setSpeed, startAnimation } = slice.actions
