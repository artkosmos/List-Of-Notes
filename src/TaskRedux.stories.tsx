import type {Meta, StoryObj} from '@storybook/react';
import {TaskRedux} from "./TaskRedux";
import {ReduxStoreProviderDecorator} from "./store/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";
import {TaskType} from "./ToDoListRedux";
import style from "./ToDoList.module.css";
import Checkbox from "@mui/material/Checkbox";
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./reducers/tasks-reducer";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Dispatch} from "redux";
import {action} from '@storybook/addon-actions'


const meta: Meta = {
  title: 'TODOLIST/TaskRedux',
  component: TaskRedux,
  tags: ['autodocs'],
  decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof meta>;

const TaskComponent = () => {
  const task = useSelector<StateType, TaskType>(state => state.tasks['1'][0])
  const dispatch: Dispatch = useDispatch()
  return (
    <div>
      <li className={task.isDone ? style.isDone : ''}>
        <Checkbox
          onChange={(event) => dispatch(changeTaskStatusAC('1', task.id, event.currentTarget.checked))}
          checked={task.isDone}
          size={'small'}
        />
        <EditableSpan
          oldTitle={task.title}
          callBack={(updatedTitle) => dispatch(updateTaskTitleAC('1', task.id, updatedTitle))}
        />
        <IconButton
          aria-label="delete"
          size={'small'}
          onClick={action('task is deleted')}>
          <DeleteIcon fontSize={'small'}/>
        </IconButton>
      </li>
    </div>
  )
}


export const TaskReduxStory: Story = {
  render: () => <TaskComponent/>
}
