import { Dispatch } from 'redux'
import { handleServerNetworkError } from 'common/utils/handleNetworkAppError'
import axios from 'axios'
import { FormType } from 'features/Login/Login'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appAction } from 'app/app-reducer'
import { todolistsAction } from 'features/ListOfTodolists/todolists-reducer'
import { authAPI } from 'features/Login/auth-api'
import { BaseResponseType, ResultCodes } from 'common/types/api_types'
import { handleServerAppError } from 'common/utils'
import { AppThunk, AuthStateType } from 'common/types/app-types'

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

export type AuthReducerState = ReturnType<typeof slice.getInitialState>

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
    if (axios.isAxiosError<BaseResponseType>(error)) {
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
      if (axios.isAxiosError<BaseResponseType>(error)) {
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
    if (axios.isAxiosError<BaseResponseType>(error)) {
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
