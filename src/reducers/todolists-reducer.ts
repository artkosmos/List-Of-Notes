import {FilterType, ToDoListType} from "../App";

export type ActionsTodolistsType = RemoveToDoListACType | AddToDoListACType | ChangeToDoListFilterAC | UpdateToDoListTitleAC

export const TodoListReducer = (state: ToDoListType[], action: ActionsTodolistsType): ToDoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(item => item.id !== action.payload.todolistId)
    case "ADD-TODOLIST":
      return [...state, {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}]
    case "CHANGE-TODOLIST-FILTER":
      return state.map(item => item.id === action.payload.todolistId
        ? {...item, filter: action.payload.filter}
        : item)
    case "UPDATE-TODOLIST-TITLE":
      return state.map(element => element.id === action.payload.todolistId
        ? {...element, title: action.payload.title}
        : element)
    default:
      return state
  }
}

export type RemoveToDoListACType = ReturnType<typeof removeToDoListAC>
export const removeToDoListAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {todolistId}
  } as const
}

export type AddToDoListACType = ReturnType<typeof addToDoListAC>
export const addToDoListAC = (title: string, todolistId: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {title, todolistId}
  } as const
}

type ChangeToDoListFilterAC = ReturnType<typeof changeToDoListFilterAC>
export const changeToDoListFilterAC = (todolistId: string, filter: FilterType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {todolistId, filter}
  } as const
}

type UpdateToDoListTitleAC = ReturnType<typeof updateToDoListTitleAC>
export const updateToDoListTitleAC = (todolistId: string, title: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    payload: {todolistId, title}
  } as const
}