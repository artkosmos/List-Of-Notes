import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'
import { StateType } from 'app/store'
import { TaskType, TodolistType } from 'common/types/api_types'

export type AppDispatchType = ThunkDispatch<StateType, unknown, AnyAction>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, AnyAction>

export type AppTaskType = TaskType & {
  entityStatus: RequestStatusType
}

export type TasksStateType = Record<string, AppTaskType[]>

export type AuthStateType = {
  isAuth: boolean
  authUserLogin: null | string
}

export type FilterType = 'all' | 'active' | 'completed'

export type AppTodolistType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type ErrorType = string | null
