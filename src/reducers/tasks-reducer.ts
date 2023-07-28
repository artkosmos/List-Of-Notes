import {AddTodolistACType, getTodolistACType, removeToDoListAC, RemoveToDoListACType} from "./todolists-reducer";
import {TaskType, todolistAPI} from "../api/todolist-api";
import {Dispatch} from "redux";

type ActionTasksTypes =
  AddTaskACType
  | RemoveTaskACType
  | UpdateTaskTitleACType
  | AddTodolistACType
  | RemoveToDoListACType
  | ChangeTaskStatusACType
  | getTodolistACType
  | GetTasksACType

export type TasksStateType = {
  [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const TaskReducer = (state = initialState, action: ActionTasksTypes): TasksStateType => {
  switch (action.type) {
    case 'ADD-TASK':
      return {...state, [action.payload.todolistID]: [action.payload.task, ...state[action.payload.todolistID]]}
    case "REMOVE-TASK":
      return {
        ...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .filter((item => item.id !== action.payload.taskID))
      }

    // case "UPDATE-TASK":
    //   return {
    //     ...state, [action.payload.todolistID]: state[action.payload.todolistID]
    //       .map(element => element.id === action.payload.taskID
    //         ? {...element, title: action.payload.updatedTitle}
    //         : element)
    //   }

    case "ADD-TODOLIST":
      return {...state, [action.payload.todolist.id]: []}
    case "REMOVE-TODOLIST":
      let {[action.payload.todolistId]: [], ...rest} = state
      return rest

    // case "CHANGE-TASK-STATUS":
    //   return {
    //     ...state, [action.payload.todolistID]: state[action.payload.todolistID]
    //       .map(item => item.id === action.payload.taskID
    //         ? {...item, isDone: action.payload.isDone}
    //         : item)
    //   }
    case "GET-TODOLISTS":
      const copyState = {...state}
      action.payload.todolists.forEach(item => {
        copyState[item.id] = []
      })
      return copyState
    case "GET-TASKS":
      return {...state, [action.payload.todolistId]: [...action.payload.tasks]}
    default:
      return state
  }
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, task: TaskType) => {
  return {
    type: 'ADD-TASK',
    payload: {task, todolistID}
  } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
  return {
    type: 'REMOVE-TASK',
    payload: {todolistID, taskID}
  } as const
}

type UpdateTaskTitleACType = ReturnType<typeof updateTaskTitleAC>
export const updateTaskTitleAC = (todolistID: string, taskID: string, updatedTitle: string) => {
  return {
    type: 'UPDATE-TASK',
    payload: {todolistID, taskID, updatedTitle}
  } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: {todolistID, taskID, isDone}
  } as const
}

type GetTasksACType = ReturnType<typeof getTasksAC>
export const getTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return {
    type: 'GET-TASKS',
    payload: {todolistId, tasks}
  } as const
}

export const setTasksTC = (todolistId:string) => (dispatch: Dispatch) => {
  todolistAPI.getTasks(todolistId)
    .then(response => {
      dispatch(getTasksAC(todolistId, response.data.items))
    })
}

export const addTaskTC = (todolistId:string, title: string) => (dispatch: Dispatch) => {
  todolistAPI.addTask(todolistId, title)
    .then(response => {
      dispatch(addTaskAC(todolistId, response.data.data.item))
    })
}

export const deleteTaskTC = (todolistId:string, taskId: string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTask(todolistId, taskId)
    .then(() => {
      dispatch(removeTaskAC(todolistId, taskId))
    })
}