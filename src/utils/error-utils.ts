import { Dispatch } from 'redux'
import { appAction } from 'reducers/app-reducer'
import axios from 'axios'
import { ResponseType } from 'api/todolist-api'
import { AppDispatchType } from 'store/store'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appAction.setError({ error: data.messages[0] }))
  } else {
    dispatch(appAction.setError({ error: 'Unknown error :(' }))
  }
  dispatch(appAction.setPreloaderStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
  if (axios.isAxiosError<ResponseType>(error)) {
    const errorMessage = error.response ? error.response.data.messages[0] : error.message
    dispatch(appAction.setError({ error: errorMessage }))
  } else if (error instanceof Error) {
    const errorMessage = `Native error: ${error.message}`
    dispatch(appAction.setError({ error: errorMessage }))
  } else {
    const errorMessage = JSON.stringify(error)
    dispatch(appAction.setError({ error: errorMessage }))
  }
  dispatch(appAction.setPreloaderStatus({ status: 'failed' }))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
