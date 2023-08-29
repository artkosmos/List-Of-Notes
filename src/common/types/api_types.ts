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
export type BaseResponseType<T = {}> = {
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
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4,
}

export enum ResultCodes {
  OK = 0,
  ERROR = 1,
  ERROR_CAPTCHA = 10,
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
