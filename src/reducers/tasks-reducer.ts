import {
  AddTodolistACType,
  CleanDataACType,
  GetTodolistACType,
  RemoveToDoListACType,
  setTodolistStatusAC,
} from "./todolists-reducer"
import {
  PropertiesToUpdateType,
  ResponseType,
  ResultCodes,
  TaskType,
  todolistAPI,
  UpdateTaskModelType,
} from "api/todolist-api"
import { Dispatch } from "redux"
import { StateType } from "store/store"
import { appAction, RequestStatusType } from "./app-reducer"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import axios from "axios"

type ActionTasksTypes =
  | AddTaskACType
  | RemoveTaskACType
  | AddTodolistACType
  | RemoveToDoListACType
  | ChangeTaskACType
  | GetTodolistACType
  | GetTasksACType
  | setTaskStatusACType
  | CleanDataACType

export type AppTaskType = TaskType & {
  entityStatus: RequestStatusType
}

export type TasksStateType = {
  [key: string]: AppTaskType[]
}

const initialState: TasksStateType = {}

export const TaskReducer = (state = initialState, action: ActionTasksTypes): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.todolistID]: [
          {
            ...action.payload.task,
            entityStatus: "idle",
          },
          ...state[action.payload.todolistID],
        ],
      }
    case "REMOVE-TASK":
      return {
        ...state,
        [action.payload.todolistID]: state[action.payload.todolistID].filter(
          (item) => item.id !== action.payload.taskID,
        ),
      }
    case "UPDATE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((element) =>
          element.id === action.payload.taskId ? { ...element, ...action.payload.model } : element,
        ),
      }
    case "ADD-TODOLIST":
      return { ...state, [action.payload.todolist.id]: [] }
    case "REMOVE-TODOLIST":
      let {
        [action.payload.todolistId]: [],
        ...rest
      } = state
      return rest
    case "GET-TODOLISTS":
      const copyState = { ...state }
      action.payload.todolists.forEach((item) => {
        copyState[item.id] = []
      })
      return copyState
    case "GET-TASKS":
      return {
        ...state,
        [action.payload.todolistId]: action.payload.tasks.map((item) => ({
          ...item,
          entityStatus: "idle",
        })),
      }
    case "SET-TASK-STATUS":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((item) =>
          item.id === action.payload.taskId ? { ...item, entityStatus: action.payload.status } : item,
        ),
      }
    case "CLEAN-DATA":
      return {}
    default:
      return state
  }
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, task: TaskType) => {
  return {
    type: "ADD-TASK",
    payload: { task, todolistID },
  } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: "REMOVE-TASK",
    payload: { todolistID, taskID },
  } as const
}

type ChangeTaskACType = ReturnType<typeof changeTaskAC>
export const changeTaskAC = (todolistId: string, taskId: string, model: PropertiesToUpdateType) => {
  return {
    type: "UPDATE-TASK",
    payload: { todolistId, taskId, model },
  } as const
}

type GetTasksACType = ReturnType<typeof getTasksAC>
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: "GET-TASKS",
    payload: { todolistId, tasks },
  } as const
}

type setTaskStatusACType = ReturnType<typeof setTaskStatusAC>
export const setTaskStatusAC = (todolistId: string, taskId: string, status: RequestStatusType) => {
  return {
    type: "SET-TASK-STATUS",
    payload: {
      status,
      todolistId,
      taskId,
    },
  } as const
}

export const setTasksTC = (todolistId: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: "loading" }))
  try {
    const response = await todolistAPI.getTasks(todolistId)
    if (response.data.error) {
      const errorMessage = response.data.error
      dispatch(appAction.setError({ error: errorMessage }))
      dispatch(appAction.setPreloaderStatus({ status: "failed" }))
    } else {
      dispatch(getTasksAC(todolistId, response.data.items))
      dispatch(appAction.setPreloaderStatus({ status: "succeeded" }))
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      handleServerNetworkError(error.message, dispatch)
    } else {
      const jsError = "Code compilation error"
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setTodolistStatusAC(todolistId, "idle"))
  }
}

export const addTaskTC = (todolistId: string, title: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: "loading" }))
  dispatch(setTodolistStatusAC(todolistId, "loading"))
  try {
    const response = await todolistAPI.addTask(todolistId, title)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError<{ item: TaskType }>(response.data, dispatch)
    } else {
      dispatch(addTaskAC(todolistId, response.data.data.item))
      dispatch(appAction.setPreloaderStatus({ status: "succeeded" }))
    }
  } catch (error) {
    if (axios.isAxiosError<ResponseType>(error)) {
      const errorMessage = error.response ? error.response.data.messages[0] : error.message
      handleServerNetworkError(errorMessage, dispatch)
    } else {
      const jsError = "Code compilation error"
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setTodolistStatusAC(todolistId, "idle"))
  }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => async (dispatch: Dispatch) => {
  dispatch(appAction.setPreloaderStatus({ status: "loading" }))
  dispatch(setTaskStatusAC(todolistId, taskId, "loading"))
  try {
    const response = await todolistAPI.deleteTask(todolistId, taskId)
    if (response.data.resultCode !== ResultCodes.OK) {
      handleServerAppError(response.data, dispatch)
    } else {
      dispatch(removeTaskAC(todolistId, taskId))
      dispatch(appAction.setPreloaderStatus({ status: "succeeded" }))
    }
  } catch (error) {
    if (axios.isAxiosError<ResponseType>(error)) {
      const errorMessage = error.response ? error.response.data.messages[0] : error.message
      handleServerNetworkError(errorMessage, dispatch)
    } else {
      const jsError = "Code compilation error"
      handleServerNetworkError(jsError, dispatch)
    }
  } finally {
    dispatch(setTaskStatusAC(todolistId, taskId, "idle"))
  }
}

export const updateTaskTC =
  (todolistId: string, taskId: string, model: PropertiesToUpdateType) =>
  async (dispatch: Dispatch, getState: () => StateType) => {
    dispatch(appAction.setPreloaderStatus({ status: "loading" }))
    dispatch(setTaskStatusAC(todolistId, taskId, "loading"))
    const task = getState().tasks[todolistId].find((item) => item.id === taskId)
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
          dispatch(changeTaskAC(todolistId, taskId, model))
          dispatch(appAction.setPreloaderStatus({ status: "succeeded" }))
        }
      } catch (error) {
        if (axios.isAxiosError<ResponseType>(error)) {
          const errorMessage = error.response ? error.response.data.messages[0] : error.message
          handleServerNetworkError(errorMessage, dispatch)
        } else {
          const jsError = "Code compilation error"
          handleServerNetworkError(jsError, dispatch)
        }
      } finally {
        dispatch(setTaskStatusAC(todolistId, taskId, "idle"))
      }
    }
  }

// типизация Error в промисах then\catch
//   .catch((error: AxiosError<ResponseType>) => {
//     const errorMessage = error.response ? error.response.data.messages[0] : error.message
//     handleServerNetworkError(errorMessage, dispatch)
//   })
