import style from "./ToDoList.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {useDispatch} from "react-redux";
import {TaskType} from "./ToDoListRedux";
import {Dispatch} from "redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./reducers/tasks-reducer";
import {memo} from "react";

type TaskReduxType = {
  todolistID: string
  task: TaskType
}

export const TaskRedux = memo(({todolistID, task}: TaskReduxType) => {

  const dispatch: Dispatch = useDispatch()

  return (
    <div>
      <li className={task.isDone ? style.isDone : ''}>
        <Checkbox
          onChange={(event) => dispatch(changeTaskStatusAC(todolistID, task.id, event.currentTarget.checked))}
          checked={task.isDone}
          size={'small'}
        />
        <EditableSpan
          oldTitle={task.title}
          callBack={(updatedTitle) => dispatch(updateTaskTitleAC(todolistID, task.id, updatedTitle))}
        />
        <IconButton
          aria-label="delete"
          size={'small'}
          onClick={() => dispatch(removeTaskAC(todolistID, task.id))}>
          <DeleteIcon fontSize={'small'}/>
        </IconButton>
      </li>
    </div>
  )
})
