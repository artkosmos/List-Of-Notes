import {
  PropertiesToUpdateType,
  ResponseType,
  ResultCodes,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from 'api/todolist-api'
import { Dispatch } from 'redux'
import { StateType } from 'store/store'
import { appAction, RequestStatusType } from './app-reducer'
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils'
import axios from 'axios'
import { todolistsAction } from 'reducers/todolists-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type AppTaskType = TaskType & {
  entityStatus: RequestStatusType
}

export type TasksStateType = {
  [key: string]: AppTaskType[]
}

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    addTask: (state, action: PayloadAction<{ todolistId: string; task: TaskType }>) => {
      const currentTodo = state[action.payload.todolistId]
      currentTodo.unshift({ ...action.payload.task, entityStatus: 'idle' })
    },
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const currentTodo = state[action.payload.todolistId]
      const taskIndex = currentTodo.findIndex((task) => task.id === action.payload.taskId)
      if (taskIndex !== -1) currentTodo.splice(taskIndex, 1)
    },
    updateTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; model: PropertiesToUpdateType }>,
    ) => {
      const currentTodo = state[action.payload.todolistId]
      const taskIndex = currentTodo.findIndex((task) => task.id === action.payload.taskId)
      if (taskIndex !== -1) currentTodo[taskIndex] = { ...currentTodo[taskIndex], ...action.payload.model }
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; entityStatus: RequestStatusType }>,
    ) => {
      const currentTodo = state[action.payload.todolistId]
      const taskIndex = currentTodo.findIndex((task) => task.id === action.payload.taskId)
      if (taskIndex !== -1) currentTodo[taskIndex].entityStatus = action.payload.entityStatus
    },
    getTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks.map((task) => {
        return { ...task, entityStatus: 'idle' }
      })
    },
    cleanStateData: () => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsAction.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsAction.removeToDoList, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsAction.getTodolists, (state, action) => {
        action.payload.todolists.forEach((todo) => {
          state[todo.id] = []
        })
      })
      .addCase(todolistsAction.cleanStateData, () => {
        return {}
      })
  },
})

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions

export const setTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  try {
    const response = await todolistAPI.getTasks(todolistId)
    if (response.data.error) {
      const errorMessage = response.data.error
      dispatch(appAction.setError({ error: errorMessage }))
      dispatch(appAction.setPreloaderStatus({ status: 'failed' }))
    } else {
      dispatch(tasksAction.getTasks({ todolistId, tasks: response.data.items }))
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error.message, dispatch)
    } else {
      const jsError = 'Code compilation error'
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'idle' }))
  }
}

export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'loading' }))
  try {
    const response = await todolistAPI.addTask(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError<{ item: TaskType }>(response.data, dispatch)
    } else {
      dispatch(tasksAction.addTask({ todolistId, task: response.data.data.item }))
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
  } finally {
    dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'idle' }))
  }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'loading' }))
  try {
    const response = await todolistAPI.deleteTask(todolistId, taskId)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(tasksAction.removeTask({ todolistId, taskId }))
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
  } finally {
    dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'idle' }))
  }
}

export const updateTaskTC =
  (todolistId: string, taskId: string, model: PropertiesToUpdateType) =>
  async (dispatch: Dispatch, getState: () => StateType) => {
    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'loading' }))
    const task = getState().tasks[todolistId].find((item: TaskType) => item.id === taskId)
    if (task) {
      const modelForAPI: UpdateTaskModelType = {
        title: task.title,
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        status: task.status,
        ...model,
      }

      try {
        const response = await todolistAPI.updateTask(todolistId, taskId, modelForAPI)
        if (response.data.resultCode !== ResultCodes.OK) {
          handleServerAppError<{ item: TaskType }>(response.data, dispatch)
        } else {
          dispatch(tasksAction.updateTask({ todolistId, taskId, model }))
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
      } finally {
        dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'idle' }))
      }
    }
  }

// типизация Error в промисах then\catch
//   .catch((error: AxiosError<ResponseType>) => {
//     const errorMessage = error.response ? error.response.data.messages[0] : error.message
//     handleServerNetworkError(errorMessage, dispatch)
//   })
