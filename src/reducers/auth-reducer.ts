import { Dispatch } from 'redux'
import { authAPI, ResponseType, ResultCodes } from 'api/todolist-api'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios from 'axios'
import { FormType } from 'features/Login'
import { AppThunk } from 'store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appAction } from 'reducers/app-reducer'
import { todolistsAction } from 'reducers/todolists-reducer'
import { tasksAction } from 'reducers/tasks-reducer'

type AuthStateType = {
  isLogin: boolean
  authUserLogin: null | string
}

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
    authUserLogin: null,
  } as AuthStateType,
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLogin: boolean }>) => {
      state.isLogin = action.payload.isLogin
    },
    setAuthUser: (state, action: PayloadAction<{ userLogin: string | null }>) => {
      state.authUserLogin = action.payload.userLogin
    },
  },
})

export const authAction = slice.actions
export const authReducer = slice.reducer

export const checkIsLogInTC = () => async (dispatch: Dispatch) => {
  try {
    const response = await authAPI.checkIsLogIn()
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(authAction.setIsLoggedIn({ isLogin: true }))
      dispatch(authAction.setAuthUser({ userLogin: response.data.data.login }))
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
    dispatch(appAction.setIsInitialized({ isInitialized: true }))
  }
}

export const logInTC =
  (data: FormType): AppThunk =>
  async (dispatch) => {
    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    try {
      const response = await authAPI.logIn(data)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError(response.data, dispatch)
      } else {
        dispatch(checkIsLogInTC()).then()
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
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
    }
  }

export const logOutTC = (): AppThunk => async (dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  try {
    const response = await authAPI.logOut()
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(authAction.setIsLoggedIn({ isLogin: false }))
      dispatch(authAction.setAuthUser({ userLogin: null }))
      dispatch(todolistsAction.cleanStateData())
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
    dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
  }
}
