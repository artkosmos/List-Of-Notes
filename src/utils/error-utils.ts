import { Dispatch } from "redux"
import { ResponseType } from "../api/todolist-api"
import { setErrorAC, setPreloaderStatusAC } from "../reducers/app-reducer"

// generic function
export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: Dispatch,
) => {
  if (data.messages.length) {
    dispatch(setErrorAC(data.messages[0]))
  } else {
    dispatch(setErrorAC("Unknown error :("))
  }
  dispatch(setPreloaderStatusAC("failed"))
}

export const handleServerNetworkError = (
  errorMessage: string,
  dispatch: Dispatch,
) => {
  dispatch(setErrorAC(errorMessage))
  dispatch(setPreloaderStatusAC("failed"))
}

// type ErrorUtilsDispatchType = Dispatch<SetAppErrorActionType | SetAppStatusActionType>
