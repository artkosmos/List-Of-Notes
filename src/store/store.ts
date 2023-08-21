import { AnyAction, combineReducers } from "redux"
import { TaskReducer } from "reducers/tasks-reducer"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { appReducer } from "reducers/app-reducer"
import { TypedUseSelectorHook, useSelector } from "react-redux"
import { authReducer } from "reducers/auth-reducer"
import { configureStore } from "@reduxjs/toolkit"
import { todolistsReducer } from "reducers/todolists-reducer"

export type StateType = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: TaskReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({ reducer: rootReducer })

// @ts-ignore
window.store = store

export type AppDispatchType = ThunkDispatch<StateType, unknown, AnyAction>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector
