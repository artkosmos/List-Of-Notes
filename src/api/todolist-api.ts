import axios, {AxiosResponse} from "axios";
import {FormType} from "../features/Login";

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true
})

export const todolistAPI = {
  getTodo() {
    return instance.get<TodolistType[]>(`/todo-lists`) // instance экземпляр класса axios с начальными настройками
  },                                       // для укорочения (пишем только endpoints и payload) и возможно взаимодействие с несколькими API
  addTodo(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>, AxiosResponse<ResponseType<{item: TodolistType}>>, {title: string}>(`/todo-lists`, {title})
  },
  deleteTodo(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodo(todolistId: string, title: string) {
    return instance.put<ResponseType, AxiosResponse<ResponseType>, {title: string}>(`/todo-lists/${todolistId}`, {title})
  },
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
  },
  addTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{item: TaskType}>>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  }
}

export const authAPI = {
  checkIsLogIn() {
    return instance.get<ResponseType<IsMeAuthResponseType>>('/auth/me')
  },
  logIn(data: FormType) {
    return instance.post<ResponseType<{userId: number}>>('/auth/login', data)
  },
  logOut() {
    return instance.delete<ResponseType>('/auth/login')
  }
}

export type IsMeAuthResponseType = {
  id: number
  email: string
  login: string
}

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

// dynamic typing with generic (if value isn't passed, it is taken default)
export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
}

export type TaskType = {
  description: string
  title: string
  completed: boolean
  status: number
  priority: number
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

export type GetTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}

// enum как обьект с фиксированными и неперезаписываемыми константами под капотом
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export enum ResultCodes {
  OK = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 1
}

// main model to send with request
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}

// give necessary properties to rewrite in main model
export type PropertiesToUpdateType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

