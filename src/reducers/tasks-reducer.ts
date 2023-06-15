import {TasksAssocType} from "../App";
import {v1} from "uuid";
import {AddToDoListACType, RemoveToDoListACType} from "./todolists-reducer";

type ActionTypes =
  AddTaskACType
  | RemoveTaskACType
  | UpdateTaskACType
  | AddToDoListACType
  | RemoveToDoListACType
  | ChangeTaskStatusACType

export const TaskReducer = (state: TasksAssocType, action: ActionTypes): TasksAssocType => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.payload.text, isDone: false}
      return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}

    case "REMOVE-TASK":
      return {
        ...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .filter((item => item.id !== action.payload.taskID))
      }

    case "UPDATE-TASK":
      return {
        ...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .map(element => element.id === action.payload.taskID
            ? {...element, title: action.payload.updatedTitle}
            : element)
      }

    case "ADD-TODOLIST":
      return {...state, [action.payload.todolistId]: []}

    case "REMOVE-TODOLIST":
      const newState = {...state}
      delete newState[action.payload.todolistId]
      return newState

    case "CHANGE-TASK-STATUS":
      return {
        ...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .map(item => item.id === action.payload.taskID
            ? {...item, isDone: action.payload.isDone}
            : item)
      }

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

type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistID: string, taskID: string, updatedTitle: string) => {
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