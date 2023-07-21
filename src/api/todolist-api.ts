import axios from "axios";

const settings = {
  withCredentials: true
}

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.1`,
  withCredentials: true
})

export const todolistAPI = {
  getTodo() {
    return instance.get<TodolistType[]>(`/todo-lists`) // instance экземпляр класса axios с начальными настройками
  },                                       // для укорочения (пишем только endpoints и payload) и возможно взаимодействие с несколькими API
  addTodo(title: string) {
    return instance.post<ResponseType<{item: TodolistType}>>(`/todo-lists`, {title})
  },
  deleteTodo(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodo(todolistId: string, title: string) {
    return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title})
  },
  getTasks(todolistId: string, count: number, page: number) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks?${count}&${page}`)
  },
  addTask (todolistId: string, title: string) {
    return instance.post<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask (todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask (todolistId: string, taskId: string, title: string) {
    return axios.put<ResponseType<{item: TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title})
  }
}

export type TodolistType = {
  id: string
  addedDate: string
  order: number
  title: string
}

type ResponseType<T = {}> = {  // dynamic typing with generic (if value isn't passed it is taken default)
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

// type AddTodoResponseType = {
//   resultCode: number
//   messages: string[]
//   data: {
//     item: TodolistType
//   }
// }
//
// type DeleteTodoResponseType = {
//   resultCode: number
//   messages: string[]
//   data: {}
// }
