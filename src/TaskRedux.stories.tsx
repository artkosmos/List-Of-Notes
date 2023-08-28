import type { Meta, StoryObj } from '@storybook/react'
import { TaskRedux } from 'TaskRedux'
import { ReduxStoreProviderDecorator } from 'store/ReduxStoreProviderDecorator'
import { useDispatch, useSelector } from 'react-redux'
import { StateType } from 'store/store'
import style from './ToDoList.module.css'
import Checkbox from '@mui/material/Checkbox'
import { EditableSpan } from 'EditableSpan'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { Dispatch } from 'redux'
import { action } from '@storybook/addon-actions'
import { TaskStatuses, TaskType } from 'api/todolist-api'
import { ChangeEvent } from 'react'
import { tasksAction, tasksThunk } from 'reducers/tasks-reducer'

const meta: Meta = {
  title: 'TODOLIST/TaskRedux',
  component: TaskRedux,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof meta>

const TaskComponent = () => {
  const task = useSelector<StateType, TaskType>((state) => state.tasks['1'][0])
  const dispatch: Dispatch = useDispatch()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    // @ts-ignore
    dispatch(tasksThunk.updateTask({ todolistId: '1', taskId: task.id, model: { status } }))
  }

  return (
    <div>
      <li className={task.status === 2 ? style.isDone : ''}>
        <Checkbox onChange={changeTaskStatusHandler} checked={task.status === 2} size={'small'} />
        <EditableSpan
          oldTitle={task.title}
          callBack={(updatedTitle) => {
            // @ts-ignore
            dispatch(tasksThunk.updateTask({ todolistId: '1', taskId: task.id, model: { title: updatedTitle } }))
          }}
        />
        <IconButton aria-label="delete" size={'small'} onClick={action('task is deleted')}>
          <DeleteIcon fontSize={'small'} />
        </IconButton>
      </li>
    </div>
  )
}

export const TaskReduxStory: Story = {
  render: () => <TaskComponent />,
}
