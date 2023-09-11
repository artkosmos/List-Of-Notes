import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { tasksThunk } from 'features/ListOfTodolists/model/tasks-reducer'
import { createAppAsyncThunk, handleServerAppError } from 'common/utils'
import { ResultCodes, TodolistType } from 'common/types/api_types'
import { todoAPI } from 'features/ListOfTodolists/api/todo_api'
import { AppTodolistType, FilterType, RequestStatusType } from 'common/types/app-types'
import { handlerTryCatchThunk } from 'common/utils/handlerTryCatchThunk'

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
    const { dispatch } = thunkAPI

    return handlerTryCatchThunk(thunkAPI, async () => {
      const response = await todoAPI.getTodo()
      response.data.forEach((todo) => {
        dispatch(tasksThunk.setTasks(todo.id))
      })
      return { todolists: response.data }
    })
  },
)

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  'todolists/addTodolist',
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return handlerTryCatchThunk(thunkAPI, async () => {
      const response = await todoAPI.addTodo(title)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError<{ item: TodolistType }>(response.data, dispatch)
        return rejectWithValue(null)
      } else {
        return { todolist: response.data.data.item }
      }
    })
  },
)

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  'todolists/deleteTodolist',
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    return handlerTryCatchThunk(thunkAPI, async () => {
      dispatch(todolistsAction.changeTodolistStatus({ todolistId: todolistId, entityStatus: 'loading' }))
      const response = await todoAPI.deleteTodo(todolistId)
      if (response.data.resultCode !== ResultCodes.OK) {
        handleServerAppError(response.data, dispatch)
        return rejectWithValue(null)
      } else {
        return { todolistId }
      }
    })
  },
)

const updateTodoTitle = createAppAsyncThunk<
  { todolistId: string; title: string },
  { todolistId: string; title: string }
>('todolists/updateTodolistTitle', async (arg, thunkAPI) => {
  const { todolistId, title } = arg
  const { dispatch, rejectWithValue } = thunkAPI

  return handlerTryCatchThunk(thunkAPI, async () => {
    const response = await todoAPI.updateTodo(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null)
    } else {
      return { todolistId: todolistId, title: title }
    }
  })
})

export const todolistsReducer = slice.reducer
export const todolistsAction = slice.actions
export const todolistsThunk = { setTodolists, addTodolist, deleteTodolist, updateTodoTitle }
