import { AxiosResponse } from 'axios'
import { instance } from 'api/api'
import { BaseResponseType, TodolistType } from 'common/types/api_types'

export const todoAPI = {
  getTodo() {
    return instance.get<TodolistType[]>(`/todo-lists`)
  },
  addTodo(title: string) {
    return instance.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`/todo-lists`, { title })
  },
  deleteTodo(todolistId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}`)
  },
  updateTodo(todolistId: string, title: string) {
    return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(
      `/todo-lists/${todolistId}`,
      {
        title,
      },
    )
  },
}
