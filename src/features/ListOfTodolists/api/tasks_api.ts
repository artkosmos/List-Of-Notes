import { AxiosResponse } from 'axios'
import { instance } from 'api/api'
import { BaseResponseType, GetTasksResponseType, TaskType, UpdateTaskModelType } from 'common/types/api_types'

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks?count=50`)
  },
  addTask(todolistId: string, title: string) {
    return instance.post<BaseResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponseType<{ item: TaskType }>, AxiosResponse<BaseResponseType<{ item: TaskType }>>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    )
  },
}
