import {Dispatch} from "redux";
import {ResponseType, ResultCodes, todolistAPI, TodolistType} from "../api/todolist-api";
import {RequestStatusType, setPreloaderStatusAC} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import axios from "axios";
import {setTasksTC} from "./tasks-reducer";
import {AppDispatchType} from "../store/store";

export type ActionsTodolistsType =
  RemoveToDoListACType
  | AddTodolistACType
  | ChangeToDoListFilterAC
  | UpdateToDoListTitleAC
  | GetTodolistACType
  | SetTodolistStatusACType
  | CleanDataACType

export type FilterType = 'all' | 'active' | 'completed'

export type AppTodolistType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

const initialState: AppTodolistType[] = []

export const TodoListReducer = (state = initialState, action: ActionsTodolistsType): AppTodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(item => item.id !== action.payload.todolistId)
    case "ADD-TODOLIST":
      return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
    case "CHANGE-TODOLIST-FILTER":
      return state.map(item => item.id === action.payload.todolistId
        ? {...item, filter: action.payload.filter}
        : item)
    case "UPDATE-TODOLIST-TITLE":
      return state.map(element => element.id === action.payload.todolistId
        ? {...element, title: action.payload.title}
        : element)
    case "GET-TODOLISTS":
      return action.payload.todolists.map(item => ({...item, filter: 'all', entityStatus: 'idle'}))
    case "SET-TODOLIST-STATUS":
      return state.map(item => item.id === action.payload.todolistId ? {
        ...item,
        entityStatus: action.payload.status
      } : item)
    case "CLEAN-DATA":
      return []
    default:
      return state
  }
}

export type RemoveToDoListACType = ReturnType<typeof removeToDoListAC>
export const removeToDoListAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
  } as const
}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {todolist}
  } as const
}

type ChangeToDoListFilterAC = ReturnType<typeof changeToDoListFilterAC>
export const changeToDoListFilterAC = (todolistId: string, filter: FilterType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, filter}
  } as const
}

type UpdateToDoListTitleAC = ReturnType<typeof updateTodolistTitleAC>
export const updateTodolistTitleAC = (todolistId: string, title: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    payload: {todolistId, title}
  } as const
}

export type GetTodolistACType = ReturnType<typeof getTodolistAC>
export const getTodolistAC = (todolists: TodolistType[]) => {
  return {
    type: "GET-TODOLISTS",
    payload: {todolists}
  } as const
}

export type SetTodolistStatusACType = ReturnType<typeof setTodolistStatusAC>
export const setTodolistStatusAC = (todolistId: string, status: RequestStatusType) => {
  return {
    type: "SET-TODOLIST-STATUS",
    payload: {status, todolistId}
  } as const
}

export type CleanDataACType = ReturnType<typeof cleanDataAC>
export const cleanDataAC = () => {
  return {
    type: "CLEAN-DATA"
  } as const
}

export const setTodolistsTC = () => async (dispatch: AppDispatchType) => {
  try {
    const responseTodo = await todolistAPI.getTodo()
    dispatch(getTodolistAC(responseTodo.data))
    responseTodo.data.forEach(todo => {
      dispatch(setTasksTC(todo.id))
    })
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error.message, dispatch)
    } else {
      const jsError = 'Code compilation error'
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setPreloaderStatusAC('succeeded'))
  }
}

export const addTodolistTC = (title: string) => async (dispatch: Dispatch) => {
  dispatch(setPreloaderStatusAC('loading'))
  try {
    const response = await todolistAPI.addTodo(title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError<{ item: TodolistType }>(response.data, dispatch)
    } else {
      dispatch(addTodolistAC(response.data.data.item))
      dispatch(setPreloaderStatusAC('succeeded'))
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
  dispatch(setPreloaderStatusAC('loading'))
  dispatch(setTodolistStatusAC(todolistId, 'loading'))
  try {
    const response = await todolistAPI.deleteTodo(todolistId)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(removeToDoListAC(todolistId))
      dispatch(setPreloaderStatusAC('succeeded'))
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
    dispatch(setTodolistStatusAC(todolistId, 'idle'))
  }
}

export const updateTodolistTitleTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(setPreloaderStatusAC('loading'))
  try {
    const response = await todolistAPI.updateTodo(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(updateTodolistTitleAC(todolistId, title))
      dispatch(setPreloaderStatusAC('succeeded'))
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