import style from "./ToDoList.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {changeTaskStatusAC, deleteTaskTC, removeTaskAC, updateTaskTitleAC} from "./reducers/tasks-reducer";
import {ChangeEvent, memo} from "react";
import {TaskType} from "./api/todolist-api";
import {AppDispatchType} from "./store/store";

type TaskReduxType = {
  task: TaskType
}

export const TaskRedux = memo(({task}: TaskReduxType) => {

  const dispatch = useDispatch<AppDispatchType>()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(task.todoListId, task.id, event.currentTarget.checked))
  }

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC(task.todoListId, task.id))
  }

  return (
    <div>
      <li className={task.status === 2 ? style.isDone : ''}>
        <Checkbox
          onChange={changeTaskStatusHandler}
          checked={task.status === 2}
          size={'small'}
        />
        <EditableSpan
          oldTitle={task.title}
          callBack={(updatedTitle) => dispatch(updateTaskTitleAC(task.todoListId, task.id, updatedTitle))}
        />
        <IconButton
          aria-label="delete"
          size={'small'}
          onClick={removeTaskHandler}>
          <DeleteIcon fontSize={'small'}/>
        </IconButton>
      </li>
    </div>
  )
})
