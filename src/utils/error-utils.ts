import { Dispatch } from "redux"
import { ResponseType } from "api/todolist-api"
import { appAction } from "reducers/app-reducer"

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appAction.setError({ error: data.messages[0] }))
  } else {
    dispatch(appAction.setError({ error: "Unknown error :(" }))
  }
  dispatch(appAction.setPreloaderStatus({ status: "failed" }))
}

export const handleServerNetworkError = (errorMessage: string, dispatch: Dispatch) => {
  dispatch(appAction.setError({ error: errorMessage }))
  dispatch(appAction.setPreloaderStatus({ status: "failed" }))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
