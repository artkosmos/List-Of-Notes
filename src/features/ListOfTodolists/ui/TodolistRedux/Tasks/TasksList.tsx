import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import { TaskRedux } from 'features/ListOfTodolists/ui/TodolistRedux/Tasks/TaskRedux/TaskRedux'
import { AppTaskType, FilterType } from 'common/types/app-types'
import { TaskStatuses } from 'common/types/api_types'
import { useAppSelector } from 'common/utils'
import { tasksSelector } from 'app/app-selectors'

type TasksListProps = {
  id: string
  filter: FilterType
}

export const TasksList = ({ id, filter }: TasksListProps) => {
  const tasks = useAppSelector(tasksSelector(id))

  const getFilteredTask = (tasks: AppTaskType[], filter: FilterType) => {
    switch (filter) {
      case 'active':
        return tasks.filter((item) => item.status === TaskStatuses.New)
      case 'completed':
        return tasks.filter((item) => item.status === TaskStatuses.Completed)
      default:
        return tasks
    }
  }

  const mappedTasks = getFilteredTask(tasks, filter).map((item) => {
    return <TaskRedux key={item.id} task={item} />
  })

  return <ul className={style.list}>{mappedTasks}</ul>
}
