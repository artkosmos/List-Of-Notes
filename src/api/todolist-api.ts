import axios, {AxiosResponse} from "axios";

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
    return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{item: TaskType}>>, {model: UpdateTaskModelType}>(`/todo-lists/${todolistId}/tasks/${taskId}`, {model})
  }
}

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

// dynamic typing with generic (if value isn't passed, it is taken default)
type ResponseType<T = {}> = {
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

type GetTasksResponseType = {
  items: TaskType[]
  totalCount: number
  error: string
}

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

