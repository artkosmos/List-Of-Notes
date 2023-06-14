import {FilterType, ToDoListType} from "../App";
import {v1} from "uuid";

type KingType = removeToDoListACType | addToDoListACType | changeToDoListFilterAC | updateToDoListTitleAC

export const TodoListReducer = (state: ToDoListType[], action: KingType): ToDoListType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(item => item.id !== action.payload.id)
    case "ADD-TODOLIST":
      return [...state, {id: v1(), title: action.payload.title, filter: 'all'}]
    case "CHANGE-TODOLIST-FILTER":
      return state.map(item => item.id === action.payload.id
        ? {...item, filter: action.payload.filter}
        : item)
    case "UPDATE-TODOLIST-TITLE":
      return state.map(element => element.id === action.payload.id
        ? {...element, title: action.payload.title}
        : element)
    default:
      return state
  }
}

type removeToDoListACType = ReturnType<typeof removeToDoListAC>
export const removeToDoListAC = (id: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: {id}
  } as const
}

type addToDoListACType = ReturnType<typeof addToDoListAC>
export const addToDoListAC = (title: string) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {title}
  } as const
}

type changeToDoListFilterAC = ReturnType<typeof changeToDoListFilterAC>
export const changeToDoListFilterAC = (id: string, filter: FilterType) => {
  return {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {id, filter}
  } as const
}

type updateToDoListTitleAC = ReturnType<typeof updateToDoListTitleAC>
export const updateToDoListTitleAC = (id: string, title: string) => {
  return {
    type: "UPDATE-TODOLIST-TITLE",
    payload: {id, title}
  } as const
}