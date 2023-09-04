import { appAction } from 'app/app-reducer'
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { BaseResponseType } from 'common/types/api_types'
import { StateType } from 'app/store'
import { handleServerNetworkError } from 'common/utils/handleNetworkAppError'
import { AppDispatchType } from 'common/types/app-types'

export const handlerTryCatchThunk = async <T>(
  thunkAPI: BaseThunkAPI<StateType, unknown, AppDispatchType, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    return rejectWithValue(null)
  } finally {
    dispatch(appAction.setPreloaderStatus({ status: 'idle' }))
  }
}
