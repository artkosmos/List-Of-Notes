import { createAsyncThunk } from '@reduxjs/toolkit'
import { AppDispatchType, StateType } from 'store/store'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: StateType
  dispatch: AppDispatchType
  rejectValue: null
}>()
