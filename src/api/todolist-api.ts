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
    return axios.post<ResponseType<{item: TodolistType}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists`, {title}, settings)
  },
  deleteTodo(todolistId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodo(todolistId: string, title: string) {
    return axios.put<ResponseType>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title}, settings)
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
