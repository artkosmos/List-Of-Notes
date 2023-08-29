import style from 'features/ListOfTodolists/TodolistRedux/ToDoList.module.css'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { AppTaskType, tasksThunk } from 'features/ListOfTodolists/tasks-reducer'
import { ChangeEvent, memo } from 'react'
import { AppDispatchType } from 'app/store'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/types/api_types'

type TaskReduxType = {
  task: AppTaskType
}

export const TaskRedux = memo(({ task }: TaskReduxType) => {
  const dispatch = useDispatch<AppDispatchType>()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(tasksThunk.updateTask({ todolistId: task.todoListId, taskId: task.id, model: { status } }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(tasksThunk.updateTask({ todolistId: task.todoListId, taskId: task.id, model: { title } }))
  }

  const removeTaskHandler = () => {
    dispatch(tasksThunk.deleteTask({ todolistId: task.todoListId, taskId: task.id }))
  }

  return (
    <div>
      <li className={task.status === 2 ? style.isDone : ''}>
        <Checkbox
          disabled={task.entityStatus === 'loading'}
          onChange={changeTaskStatusHandler}
          checked={task.status === 2}
          size={'small'}
        />
        <EditableSpan
          oldTitle={task.title}
          callBack={changeTaskTitleHandler}
          disabled={task.entityStatus === 'loading'}
        />
        <IconButton
          disabled={task.entityStatus === 'loading'}
          aria-label="delete"
          size={'small'}
          onClick={removeTaskHandler}
        >
          <DeleteIcon fontSize={'small'} />
        </IconButton>
      </li>
    </div>
  )
})
