import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ErrorType, RequestStatusType } from 'common/types/app-types'

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false,
  },
  reducers: {
    setPreloaderStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setError: (state, action: PayloadAction<{ error: ErrorType }>) => {
      state.error = action.payload.error
    },
    setIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const appAction = slice.actions

export type AppReducerState = ReturnType<typeof slice.getInitialState>