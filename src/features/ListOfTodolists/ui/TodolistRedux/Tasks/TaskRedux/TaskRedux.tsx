import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { tasksThunk } from 'features/ListOfTodolists/model/tasks-reducer'
import { ChangeEvent, memo } from 'react'
import { EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/types/api_types'
import { AppDispatchType, AppTaskType } from 'common/types/app-types'

type TaskReduxProps = {
  task: AppTaskType
}

export const TaskRedux = memo(({ task }: TaskReduxProps) => {
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
    <li className={`${style.task} ${task.status === 2 ? style.isDone : ''}`}>
      <div className={style.checkAndText}>
        <Checkbox
          disabled={task.entityStatus === 'loading'}
          onChange={changeTaskStatusHandler}
          checked={task.status === 2}
          size={'small'}
        />
        <div className={style.taskText}>
          <EditableSpan
            oldTitle={task.title}
            callBack={changeTaskTitleHandler}
            disabled={task.entityStatus === 'loading'}
          />
        </div>
      </div>
      <IconButton
        disabled={task.entityStatus === 'loading'}
        aria-label="delete"
        size={'small'}
        onClick={removeTaskHandler}
      >
        <DeleteIcon fontSize={'small'} />
      </IconButton>
    </li>
  )
})
