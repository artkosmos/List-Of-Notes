import {AddTodolistACType, getTodolistACType, RemoveToDoListACType} from "./todolists-reducer";
import {TaskType} from "../api/todolist-api";

type ActionTasksTypes =
  AddTaskACType
  | RemoveTaskACType
  | UpdateTaskTitleACType
  | AddTodolistACType
  | RemoveToDoListACType
  | ChangeTaskStatusACType
  | getTodolistACType

export type TasksStateType = {
  [key: string]: TaskType[]
}

const initialState: TasksStateType = {}

export const TaskReducer = (state = initialState, action: ActionTasksTypes): TasksStateType => {
  switch (action.type) {
    // case 'ADD-TASK':
    //   const newTask = {id: v1(), title: action.payload.text, isDone: false}
    //   return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}

    // case "REMOVE-TASK":
    //   return {
    //     ...state, [action.payload.todolistID]: state[action.payload.todolistID]
    //       .filter((item => item.id !== action.payload.taskID))
    //   }

    // case "UPDATE-TASK":
    //   return {
    //     ...state, [action.payload.todolistID]: state[action.payload.todolistID]
    //       .map(element => element.id === action.payload.taskID
    //         ? {...element, title: action.payload.updatedTitle}
    //         : element)
    //   }

    case "ADD-TODOLIST":
      return {...state, [action.payload.todolist.id]: []}

    // case "REMOVE-TODOLIST":
    //   const newState = {...state}
    //   delete newState[action.payload.todolistId]
    //   return newState
    //   // let {[action.payload.todolistId]: [], ...rest} = state
    //   // return rest

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
    default:
      return state
  }
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, text: string) => {
  return {
    type: 'ADD-TASK',
    payload: {text, todolistID}
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