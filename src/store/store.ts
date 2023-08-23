import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from 'reducers/app-reducer'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { authReducer } from 'reducers/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer } from 'reducers/todolists-reducer'
import { tasksReducer } from 'reducers/tasks-reducer'

export type StateType = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})

// @ts-ignore
window.store = store

export type AppDispatchType = ThunkDispatch<StateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
