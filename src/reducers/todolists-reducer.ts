import {Dispatch} from "redux";
import {todolistAPI, TodolistType} from "../api/todolist-api";

export type ActionsTodolistsType =
  RemoveToDoListACType
  | AddTodolistACType
  | ChangeToDoListFilterAC
  | UpdateToDoListTitleAC
  | getTodolistACType

export type FilterType = 'all' | 'active' | 'completed'

export type AppTodolistType = TodolistType & {
  filter: FilterType
}

const initialState: AppTodolistType[] = []

export const TodoListReducer = (state = initialState, action: ActionsTodolistsType): AppTodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(item => item.id !== action.payload.todolistId)
    case "ADD-TODOLIST":
      return [{...action.payload.todolist, filter: 'all'},...state]
    case "CHANGE-TODOLIST-FILTER":
      return state.map(item => item.id === action.payload.todolistId
        ? {...item, filter: action.payload.filter}
        : item)
    case "UPDATE-TODOLIST-TITLE":
      return state.map(element => element.id === action.payload.todolistId
        ? {...element, title: action.payload.title}
        : element)
    case "GET-TODOLISTS":
      return action.payload.todolists.map(item => ({...item, filter: 'all'}))
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

export type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (todolist: TodolistType) => {
  return {
    type: 'ADD-TODOLIST',
    payload: {todolist}
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

export type getTodolistACType = ReturnType<typeof getTodolistAC>
export const getTodolistAC = (todolists: TodolistType[]) => {
  return {
    type: "GET-TODOLISTS",
    payload: {todolists}
  } as const
}

export const setTodolistsTC = () => (dispatch: Dispatch) => {
  todolistAPI.getTodo()
    .then(response => {
      dispatch(getTodolistAC(response.data))
    })
}

export const addTodolistTC = (title:string) => (dispatch: Dispatch) => {
  todolistAPI.addTodo(title)
    .then(response => {
      dispatch(addTodolistAC(response.data.data.item))
    })
}

export const deleteTodolistTC = (todolistId:string) => (dispatch: Dispatch) => {
  todolistAPI.deleteTodo(todolistId)
    .then(response => {
      dispatch(removeToDoListAC(todolistId))
    })
}