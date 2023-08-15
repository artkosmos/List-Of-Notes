import {Dispatch} from "redux";
import {authAPI, ResponseType, ResultCodes} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {FormType} from "../features/Login";
import {setIsInitializedAC, setPreloaderStatusAC} from "./app-reducer";

type AuthStateType = {
  isLogin: boolean
}

type ActionType = SetIsLoginACType

const initialState = {
  isLogin: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
  switch (action.type) {
    case "SET-IS-LOGIN":
      return {...state, isLogin: action.value}
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

export const checkIsLogInTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.checkIsLogIn()
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