import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { ErrorType, RequestStatusType } from 'common/types/app-types'
import { AnyAction } from 'redux'

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
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, _) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state, _) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        if (action.payload) {
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : 'Unknown error'
        }
        state.status = 'failed'
      })
  },
})

export const appReducer = slice.reducer
export const appAction = slice.actions

export type AppReducerState = ReturnType<typeof slice.getInitialState>
