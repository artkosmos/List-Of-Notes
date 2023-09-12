import { RequestStatusType, TasksStateType } from 'common/types/app-types'

export const handleTaskStatus = (
  state: TasksStateType,
  todolistId: string,
  taskId: string,
  status: RequestStatusType,
) => {
  const todo = state[todolistId]
  const taskIndex = todo.findIndex((task) => task.id === taskId)
  if (taskIndex !== -1) todo[taskIndex].entityStatus = status
  return state
}
