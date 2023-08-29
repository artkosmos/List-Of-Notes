import { ResponseType } from 'api/todolist-api'
import { Dispatch } from 'redux'
import { appAction } from 'app/app-reducer'

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appAction.setError({ error: data.messages[0] }))
  } else {
    dispatch(appAction.setError({ error: 'Unknown error :(' }))
  }
  dispatch(appAction.setPreloaderStatus({ status: 'failed' }))
}
