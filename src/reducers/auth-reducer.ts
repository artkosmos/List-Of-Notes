import {Dispatch} from "redux";
import {authAPI, ResponseType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {FormType} from "../features/Login";
import {setIsInitializedAC, setPreloaderStatusAC} from "./app-reducer";
import {cleanDataAC} from "./todolists-reducer";

type AuthStateType = {
  isLogin: boolean
  authUserLogin: null | string
}

type ActionType = SetIsLoginACType | SetAuthUserACType

const initialState = {
  isLogin: false,
  authUserLogin: null
}

export const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
  switch (action.type) {
    case "SET-IS-LOGIN":
      return {...state, isLogin: action.value}
    case "SET-AUTH-USER":
      return {...state, authUserLogin: action.userLogin}
    default:
      return  state
  }
}

type SetIsLoginACType = ReturnType<typeof setIsLogInAC>
export const setIsLogInAC = (value: boolean) => {
  return {
    type: 'SET-IS-LOGIN',
    value
  } as const
}

type SetAuthUserACType = ReturnType<typeof setAuthUserAC>
export const setAuthUserAC = (userLogin: string) => {
  return {
    type: 'SET-AUTH-USER',
    userLogin
  } as const
}

export const checkIsLogInTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.checkIsLogIn()
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(setIsLogInAC(true))
      dispatch(setAuthUserAC(response.data.data.login))
    }
  } catch (error) {
    if (axios.isAxiosError<ResponseType>(error)) {
      const errorMessage = error.response ? error.response.data.messages[0] : error.message
      handleServerNetworkError(errorMessage, dispatch)
    } else {
      const jsError = 'Code compilation error'
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setIsInitializedAC(true))
  }
}

export const logInTC = (data: FormType) => async (dispatch: Dispatch) => {
  dispatch(setPreloaderStatusAC('loading'))
  try {
    const response = await authAPI.logIn(data)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(setIsLogInAC(true))
    }
  } catch (error) {
    if (axios.isAxiosError<ResponseType>(error)) {
      const errorMessage = error.response ? error.response.data.messages[0] : error.message
      handleServerNetworkError(errorMessage, dispatch)
    } else {
      const jsError = 'Code compilation error'
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setPreloaderStatusAC('succeeded'))
  }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
  dispatch(setPreloaderStatusAC('loading'))
  try {
    const response = await authAPI.logOut()
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(setIsLogInAC(false))
      dispatch(cleanDataAC())
    }
  } catch (error) {
    if (axios.isAxiosError<ResponseType>(error)) {
      const errorMessage = error.response ? error.response.data.messages[0] : error.message
      handleServerNetworkError(errorMessage, dispatch)
    } else {
      const jsError = 'Code compilation error'
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setPreloaderStatusAC('succeeded'))
  }
}