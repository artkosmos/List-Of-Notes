import { appAction } from 'app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tasksThunk } from 'features/ListOfTodolists/tasks-reducer'
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils'
import { ResultCodes, TodolistType } from 'common/types/api_types'
import { todoAPI } from 'features/ListOfTodolists/todo_api'
import { AppTodolistType, FilterType, RequestStatusType } from 'common/types/app-types'

const slice = createSlice({
  name: 'todolists',
  initialState: [] as AppTodolistType[],
  reducers: {
    changeToDoListFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      state[index].filter = action.payload.filter
    },
    changeTodolistStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
      const index = state.findIndex((todo) => todo.id === action.payload.todolistId)
      state[index].entityStatus = action.payload.entityStatus
    },
    cleanStateData: () => {
      return []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunk.setTodolists.fulfilled, (state, { payload }) => {
        return payload.todolists.forEach((item) => {
          state.push({
            ...item,
            filter: 'all' as FilterType,
            entityStatus: 'idle' as RequestStatusType,
          })
        })
      })
      .addCase(todolistsThunk.addTodolist.fulfilled, (state, { payload }) => {
        const newTodolist = {
          ...payload.todolist,
          filter: 'all' as FilterType,
          entityStatus: 'idle' as RequestStatusType,
        }
        state.unshift(newTodolist)
      })
      .addCase(todolistsThunk.deleteTodolist.fulfilled, (state, { payload }) => {
        const index = state.findIndex((todo) => todo.id === payload.todolistId)
        if (index !== -1) state.splice(index, 1)
      })
      .addCase(todolistsThunk.updateTodoTitle.fulfilled, (state, { payload }) => {
        const index = state.findIndex((todo) => todo.id === payload.todolistId)
        state[index].title = payload.title
      })
  },
})

const setTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, {}>(
  'todolists/setTodolists',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      const response = await todoAPI.getTodo()
      response.data.forEach((todo) => {
        dispatch(tasksThunk.setTasks(todo.id))
      })
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
      return { todolists: response.data }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  'todolists/addTodolist',
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    try {
      const response = await todoAPI.addTodo(title)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError<{ item: TodolistType }>(response.data, dispatch)
        return rejectWithValue(null)
      } else {
        dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
        return { todolist: response.data.data.item }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  'todolists/deleteTodolist',
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
    dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'loading' }))
    try {
      const response = await todoAPI.deleteTodo(todolistId)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError(response.data, dispatch)
        return rejectWithValue(null)
      } else {
        dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
        return { todolistId }
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

const updateTodoTitle = createAppAsyncThunk<
  { todolistId: string; title: string },
  { todolistId: string; title: string }
>('todolists/updateTodolistTitle', async (arg, thunkAPI) => {
  const { todolistId, title } = arg
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appAction.setPreloaderStatus({ status: 'loading' }))
  try {
    const response = await todoAPI.updateTodo(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null)
    } else {
      dispatch(appAction.setPreloaderStatus({ status: 'succeeded' }))
      return { todolistId: todolistId, title: title }
    }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

export const todolistsReducer = slice.reducer
export const todolistsAction = slice.actions
export const todolistsThunk = { setTodolists, addTodolist, deleteTodolist, updateTodoTitle }
