import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { tasksThunk } from 'features/ListOfTodolists/model/tasks-reducer'
import { todolistsThunk } from 'features/ListOfTodolists/model/todolists-reducer'
import { useCallback } from 'react'
import { tasksSelector } from 'app/app-selectors'
import { TaskRedux } from 'features/index'
import { AddItemForm, EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/types/api_types'
import { useAppSelector } from 'common/utils'
import { AppDispatchType, AppTaskType, AppTodolistType, FilterType } from 'common/types/app-types'
import { TaskFilterButtons } from 'features/ListOfTodolists/ui/TodolistRedux/TaskFilterButtons/TaskFilterButtons'

type ToDoListProps = {
  todolist: AppTodolistType
}

export const ToDoListRedux = ({ todolist }: ToDoListProps) => {
  const { id, title, filter, entityStatus } = todolist

  const tasks = useAppSelector(tasksSelector(id))

  const dispatch = useDispatch<AppDispatchType>()

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
  const filteredTasksData = getFilteredTask(tasks, filter)

  const removeToDoListHandler = useCallback(() => {
    dispatch(todolistsThunk.deleteTodolist(id))
  }, [])

  const addTaskHandler = useCallback((title: string) => {
    dispatch(tasksThunk.addTask({ todolistId: id, title }))
  }, [])

  const updateTodolistTitle = useCallback((title: string) => {
    dispatch(todolistsThunk.updateTodoTitle({ todolistId: id, title }))
  }, [])

  const mappedTasks = filteredTasksData?.map((item) => {
    return <TaskRedux key={item.id} task={item} />
  })

  return (
    <div>
      <div className={style.todolist}>
        <IconButton
          aria-label="delete"
          onClick={removeToDoListHandler}
          className={style.delete}
          disabled={entityStatus === 'loading'}
        >
          <DeleteIcon />
          <span className={style.deleteText}>Delete list</span>
        </IconButton>
        <h2>
          <EditableSpan oldTitle={title} callBack={updateTodolistTitle} disabled={entityStatus === 'loading'} />
        </h2>
        <AddItemForm callBack={addTaskHandler} disabled={entityStatus === 'loading'} />
        <ul className={style.list}>{mappedTasks}</ul>
        <div className={style.buttonWrapper}>
          <TaskFilterButtons id={id} filter={filter} />
        </div>
      </div>
    </div>
  )
}
