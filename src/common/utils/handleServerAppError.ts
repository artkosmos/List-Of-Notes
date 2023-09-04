import { Dispatch } from 'redux'
import { appAction } from 'app/app-reducer'
import { BaseResponseType } from 'common/types/api_types'

export const handleServerAppError = <T>(data: BaseResponseType<T>, dispatch: Dispatch, handleError = true) => {
  if (handleError) {
    if (data.messages.length) {
      dispatch(appAction.setError({ error: data.messages[0] }))
    } else {
      dispatch(appAction.setError({ error: 'Unknown error :(' }))
    }
  }
  dispatch(appAction.setPreloaderStatus({ status: 'failed' }))
}
