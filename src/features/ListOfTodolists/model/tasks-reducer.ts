import { appAction } from 'app/app-reducer'
import { todolistsAction, todolistsThunk } from 'features/ListOfTodolists/model/todolists-reducer'
import { createSlice, isFulfilled, isPending } from '@reduxjs/toolkit'
import { createAppAsyncThunk, handleServerAppError, handleTaskStatus } from 'common/utils'
import { PropertiesToUpdateType, ResultCodes, TaskType, UpdateTaskModelType } from 'common/types/api_types'
import { tasksAPI } from 'features/ListOfTodolists/api/tasks_api'
import { TasksStateType } from 'common/types/app-types'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsThunk.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunk.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsThunk.setTodolists.fulfilled, (state, { payload }) => {
        payload.todolists.forEach((todo) => {
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
      .addCase(tasksThunk.updateTask.fulfilled, (state, { payload }) => {
        const currentTodo = state[payload.todolistId]
        const taskIndex = currentTodo.findIndex((task) => task.id === payload.taskId)
        if (taskIndex !== -1) currentTodo[taskIndex] = { ...currentTodo[taskIndex], ...payload.model }
      })
      .addMatcher(isPending(tasksThunk.deleteTask, tasksThunk.updateTask), (state, action) => {
        const { todolistId, taskId } = action.meta.arg
        handleTaskStatus(state, todolistId, taskId, 'loading')
      })
      .addMatcher(isFulfilled(tasksThunk.deleteTask, tasksThunk.updateTask), (state, action) => {
        const { todolistId, taskId } = action.meta.arg
        handleTaskStatus(state, todolistId, taskId, 'succeeded')
      })
      .addMatcher(isFulfilled(tasksThunk.deleteTask, tasksThunk.updateTask), (state, action) => {
        const { todolistId, taskId } = action.meta.arg
        handleTaskStatus(state, todolistId, taskId, 'failed')
      })
  },
})

const setTasks = createAppAsyncThunk<{ tasks: TaskType[]; todolistId: string }, string>(
  'tasks/setTasks',
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    const response = await tasksAPI.getTasks(todolistId)
    if (response.data.error) {
      const errorMessage = response.data.error
      dispatch(appAction.setError({ error: errorMessage }))
      // without return from each condition there is an error like thunk is probably return undefined
      return rejectWithValue(null)
    } else {
      return { todolistId, tasks: response.data.items }
    }
  },
)

const addTask = createAppAsyncThunk<{ todolistId: string; task: TaskType }, { todolistId: string; title: string }>(
  'tasks/addTask',
  async (args, thunkAPI) => {
    const { todolistId, title } = args
    const { rejectWithValue } = thunkAPI

    const response = await tasksAPI.addTask(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      return rejectWithValue(response.data)
    } else {
      return { todolistId, task: response.data.data.item }
    }
  },
)

const deleteTask = createAppAsyncThunk<{ todolistId: string; taskId: string }, { todolistId: string; taskId: string }>(
  'tasks/deleteTask',
  async (args, thunkAPI) => {
    const { todolistId, taskId } = args
    const { dispatch, rejectWithValue } = thunkAPI

    const response = await tasksAPI.deleteTask(todolistId, taskId)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
      return rejectWithValue(null)
    } else {
      return { todolistId, taskId }
    }
  },
)

const updateTask = createAppAsyncThunk<
  { todolistId: string; taskId: string; model: PropertiesToUpdateType },
  { todolistId: string; taskId: string; model: PropertiesToUpdateType }
>('tasks/updateTask', async (args, thunkAPI) => {
  const { todolistId, taskId, model } = args
  const { rejectWithValue, getState } = thunkAPI

  const task = getState().tasks[todolistId].find((item: TaskType) => item.id === taskId)

  if (!task) {
    return rejectWithValue(null)
  }

  const modelForAPI: UpdateTaskModelType = {
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    status: task.status,
    ...model,
  }

  const response = await tasksAPI.updateTask(todolistId, taskId, modelForAPI)
  if (response.data.resultCode !== ResultCodes.OK) {
    return rejectWithValue(response.data)
  } else {
    return { todolistId, taskId, model }
  }
})

export const tasksReducer = slice.reducer

export const tasksThunk = { setTasks, addTask, deleteTask, updateTask }
