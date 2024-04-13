import { carsApi } from '@/common/components/cars/cars.api'
import { setLoading } from '@/common/components/cars/cars.reducer'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

type Winner = {
  id: number
  time: number
  wins: number
}

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await carsApi.getWinners()

      dispatch(setLoading(false))

      return response
    } catch (error: any) {
      dispatch(setLoading(false))

      return rejectWithValue(error.message)
    }
  }
)

type WinnersState = {
  isLoading: boolean
  pageSize: number
  winners: Winner[]
}

const initialState: WinnersState = {
  isLoading: true,
  pageSize: 7,
  winners: [],
}

const slice = createSlice({
  extraReducers: builder => {
    builder.addCase(fetchWinners.fulfilled, (state, action: PayloadAction<Winner[]>) => {
      state.winners = action.payload
    })
  },
  initialState,
  name: 'winners',
  reducers: {},
})

export const winnersReducer = slice.reducer

export const {} = slice.actions
