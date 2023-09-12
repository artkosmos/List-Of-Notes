import { AppTodolistType, RequestStatusType } from 'common/types/app-types'

export const handleTodoStatus = (state: AppTodolistType[], todolistId: string, status: RequestStatusType) => {
  const index = state.findIndex((todo) => todo.id === todolistId)
  state[index].entityStatus = status
  return state
}
