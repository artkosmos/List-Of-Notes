import { Dispatch } from 'redux'
import { ResponseType, ResultCodes, todolistAPI, TodolistType } from 'api/todolist-api'
import { appAction, RequestStatusType } from './app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios from 'axios'
import { AppDispatchType } from 'store/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tasksThunk } from 'reducers/tasks-reducer'

export type FilterType = 'all' | 'active' | 'completed'

export type AppTodolistType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

const slice = createSlice({
  name: 'todolists',
  initialState: [] as AppTodolistType[],
  reducers: {
    removeToDoList: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) state.splice(index, 1)
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist = {
        ...action.payload.todolist,
        filter: 'all' as FilterType,
        entityStatus: 'idle' as RequestStatusType,
      }
      state.unshift(newTodolist)
    },
    changeToDoListFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    updateTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      state[index].title = action.payload.title
    },
    getTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.forEach((item) => {
        state.push({
          ...item,
          filter: 'all' as FilterType,
          entityStatus: 'idle' as RequestStatusType,
        })
      })
    },
    changeTodolistStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.entityStatus
    },
    cleanStateData: () => {
      return []
    },
  },
})

export const todolistsReducer = slice.reducer
export const todolistsAction = slice.actions

export const setTodolistsTC = () => async (dispatch: AppDispatchType) => {
  try {
    const responseTodo = await todolistAPI.getTodo()
    dispatch(todolistsAction.getTodolists({ todolists: responseTodo.data }))
    responseTodo.data.forEach((todo) => {
      dispatch(tasksThunk.setTasks(todo.id))
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error.message, dispatch)
    } else {
      const jsError = 'Code compilation error'
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
  }
}

export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  try {
    const response = await todolistAPI.addTodo(title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError<{ item: TodolistType }>(response.data, dispatch)
    } else {
      dispatch(todolistsAction.addTodolist({ todolist: response.data.data.item }))
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
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

export const deleteTodolistTC = (todolistId: string) => async (dispatch: Dispatch) => {
  debugger
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'loading' }))
  try {
    const response = await todolistAPI.deleteTodo(todolistId)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(todolistsAction.removeToDoList({ todolistId: todolistId }))
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
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

export const updateTodolistTitleTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  try {
    const response = await todolistAPI.updateTodo(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(todolistsAction.updateTodolistTitle({ todolistId: todolistId, title: title }))
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
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
