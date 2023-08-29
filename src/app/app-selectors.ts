import { StateType } from 'app/store'
import { AppTaskType, AppTodolistType, ErrorType, RequestStatusType } from 'common/types/app-types'

export const tasksSelector =
  (id: string) =>
  (state: StateType): AppTaskType[] =>
    state.tasks[id]

export const isInitializedSelector = (state: StateType): boolean => state.app.isInitialized

export const appStatusSelector = (state: StateType): RequestStatusType => state.app.status

export const isLoginSelector = (state: StateType): boolean => state.auth.isLogin

export const authLoginSelector = (state: StateType): string | null => state.auth.authUserLogin

export const todolistsSelector = (state: StateType): AppTodolistType[] => state.todolists

export const appErrorSelector = (state: StateType): ErrorType => state.app.error
