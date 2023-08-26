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
import { createAppAsyncThunk } from 'utils/create-async-thunk'

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
      .addCase(tasksThunk.setTasks.fulfilled, (state, { payload }) => {
        state[payload.todolistId] = payload.tasks.map((task) => {
          return { ...task, entityStatus: 'idle' }
        })
      })
      .addCase(tasksThunk.addTask.fulfilled, (state, { payload }) => {
        const currentTodo = state[payload.todolistId]
        currentTodo.unshift({ ...payload.task, entityStatus: 'idle' })
      })
      .addCase(tasksThunk.deleteTask.fulfilled, (state, { payload }) => {
        const currentTodo = state[payload.todolistId]
        const taskIndex = currentTodo.findIndex((task) => task.id === payload.taskId)
        if (taskIndex !== -1) currentTodo.splice(taskIndex, 1)
      })
  },
})

const setTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  'tasks/setTasks',
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    try {
      const response = await todolistAPI.getTasks(todolistId)
      if (response.data.error) {
        const errorMessage = response.data.error
        dispatch(appAction.setError({ error: errorMessage }))
        dispatch(appAction.setPreloaderStatus({ status: 'failed' }))
        // without return from each condition there is an error like thunk is probably return undefined
        return rejectWithValue(null)
      } else {
        dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
        return { todolistId, tasks: response.data.items }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'idle' }))
    }
  },
)

const addTask = createAppAsyncThunk<{ todolistId: string; task: TaskType }, { todolistId: string; title: string }>(
  'tasks/addTask',
  async (args, thunkAPI) => {
    const { todolistId, title } = args
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'loading' }))
    try {
      const response = await todolistAPI.addTask(todolistId, title)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError<{ item: TaskType }>(response.data, dispatch)
        return rejectWithValue(null)
      } else {
        dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
        return { todolistId, task: response.data.data.item }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'idle' }))
    }
  },
)

const deleteTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
  'tasks/deleteTask',
  async (args, thunkAPI) => {
    const { todolistId, taskId } = args
    const { dispatch, rejectWithValue } = thunkAPI

    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'loading' }))
    try {
      const response = await todolistAPI.deleteTask(todolistId, taskId)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError(response.data, dispatch)
        return rejectWithValue(null)
      } else {
        dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
        return { todolistId, taskId }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    } finally {
      dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'idle' }))
    }
  },
)

// const updateTask = createAppAsyncThunk<{ todolistId: string; taskId: string; model: PropertiesToUpdateType }, { todolistId: string; taskId: string; model: PropertiesToUpdateType }>(
//   'tasks/updateTask',
//   async (args, thunkAPI, getState) => {
//     const { todolistId, taskId } = args
//     const { dispatch, rejectWithValue } = thunkAPI
//
//     dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
//     dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'loading' }))
//     const task = getState().tasks[todolistId].find((item: TaskType) => item.id === taskId)
//     if (task) {
//       const modelForAPI: UpdateTaskModelType = {
//         title: task.title,
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         status: task.status,
//         ...model,
//       }
//
//       try {
//         const response = await todolistAPI.updateTask(todolistId, taskId, modelForAPI)
//         if (response.data.resultCode !== ResultCodes.OK) {
//           handleServerAppError<{ item: TaskType }>(response.data, dispatch)
//           return rejectWithValue(null)
//         } else {
//           dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
//           return { todolistId, taskId, model }
//         }
//       } catch (error) {
//         handleServerNetworkError(error, dispatch)
//         return rejectWithValue(null)
//       } finally {
//         dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'idle' }))
//       }
//     }
//   },
// )

// export const updateTaskTC =
//   (todolistId: string, taskId: string, model: PropertiesToUpdateType) =>
//   async (dispatch: Dispatch, getState: () => StateType) => {
//     dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
//     dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'loading' }))
//     const task = getState().tasks[todolistId].find((item: TaskType) => item.id === taskId)
//     if (task) {
//       const modelForAPI: UpdateTaskModelType = {
//         title: task.title,
//         deadline: task.deadline,
//         description: task.description,
//         priority: task.priority,
//         startDate: task.startDate,
//         status: task.status,
//         ...model,
//       }
//
//       try {
//         const response = await todolistAPI.updateTask(todolistId, taskId, modelForAPI)
//         if (response.data.resultCode !== ResultCodes.OK) {
//           handleServerAppError<{ item: TaskType }>(response.data, dispatch)
//         } else {
//           dispatch(tasksAction.updateTask({ todolistId, taskId, model }))
//           dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
//         }
//       } catch (error) {
//         if (axios.isAxiosError<ResponseType>(error)) {
//           const errorMessage = error.response ? error.response.data.messages[0] : error.message
//           handleServerNetworkError(errorMessage, dispatch)
//         } else {
//           const jsError = 'Code compilation error'
//           handleServerNetworkError(jsError, dispatch)
//         }
//       } finally {
//         dispatch(tasksAction.changeTaskStatus({ todolistId, taskId, entityStatus: 'idle' }))
//       }
//     }
//   }

export const tasksReducer = slice.reducer
export const tasksAction = slice.actions

export const tasksThunk = { setTasks, addTask, deleteTask }

// типизация Error в промисах then\catch
//   .catch((error: AxiosError<ResponseType>) => {
//     const errorMessage = error.response ? error.response.data.messages[0] : error.message
//     handleServerNetworkError(errorMessage, dispatch)
//   })
