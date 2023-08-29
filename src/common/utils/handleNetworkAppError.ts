import { appAction } from 'app/app-reducer'
import axios from 'axios'
import { AppDispatchType } from 'app/store'
import { BaseResponseType } from 'common/types/api_types'

export const handleServerNetworkError = (error: unknown, dispatch: AppDispatchType) => {
  if (axios.isAxiosError<BaseResponseType>(error)) {
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
