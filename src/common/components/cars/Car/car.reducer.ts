import { carsApi } from '@/common/components/cars/cars.api'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type CarState = {
  [id: number]: {
    color: string
    distance: number
    duration: number
    name: string
    position: number
    velocity: number
  }
}

const initialState: CarState = {}

const slice = createSlice({
  initialState,
  name: 'car',
  reducers: {
    setDistance(state, action: PayloadAction<{ distance: number; id: number }>) {
      const { distance, id } = action.payload

      if (!state[id]) {
        state[id] = { color: '', distance: 0, duration: 0, name: '', position: 0, velocity: 0 }
      }
      state[id].distance = distance
    },
    setDuration(state, action: PayloadAction<{ distance: number; id: number; velocity: number }>) {
      const { distance, id, velocity } = action.payload

      if (!state[id]) {
        state[id] = { color: '', distance: 0, duration: 0, name: '', position: 0, velocity: 0 }
      }
      state[id].duration = distance / velocity
    },
    setPosition(state, action: PayloadAction<{ id: number; position: number }>) {
      const { id, position } = action.payload

      if (!state[id]) {
        state[id] = { color: '', distance: 0, duration: 0, name: '', position: 0, velocity: 0 }
      }
      state[id].position = position
    },
    setVelocity(state, action: PayloadAction<{ id: number; velocity: number }>) {
      const { id, velocity } = action.payload

      if (!state[id]) {
        state[id] = { color: '', distance: 0, duration: 0, name: '', position: 0, velocity: 0 }
      }
      state[id].velocity = velocity
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
export const { setDistance, setDuration, setPosition, setVelocity } = slice.actions
