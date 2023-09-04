import { createAsyncThunk } from '@reduxjs/toolkit'
import { StateType } from 'app/store'
import { AppDispatchType } from 'common/types/app-types'
import { BaseResponseType } from 'common/types/api_types'

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: StateType
  dispatch: AppDispatchType
  rejectValue: null | BaseResponseType
}>()
