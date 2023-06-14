import {TasksAssocType} from "../App";
import {v1} from "uuid";

type ActionTypes = AddTaskACType | RemoveTaskACType

export const TaskReducer = (state: TasksAssocType, action: ActionTypes): TasksAssocType => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.payload.text, isDone: false}
      return {...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]]}
    case "REMOVE-TASK":
      return {...state, [action.payload.todolistID]: state[action.payload.todolistID]
          .filter((item => item.id !== action.payload.taskID))}
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