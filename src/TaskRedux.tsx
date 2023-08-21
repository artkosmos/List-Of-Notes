import style from "./ToDoList.module.css"
import Checkbox from "@mui/material/Checkbox"
import { EditableSpan } from "./EditableSpan"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import { useDispatch } from "react-redux"
import {
  AppTaskType,
  deleteTaskTC,
  updateTaskTC,
} from "./reducers/tasks-reducer"
import { ChangeEvent, memo } from "react"
import { TaskStatuses } from "./api/todolist-api"
import { AppDispatchType } from "./store/store"

type TaskReduxType = {
  task: AppTaskType
}

export const TaskRedux = memo(({ task }: TaskReduxType) => {
  const dispatch = useDispatch<AppDispatchType>()

  const changeTaskStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const status = event.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New
    dispatch(updateTaskTC(task.todoListId, task.id, { status }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(updateTaskTC(task.todoListId, task.id, { title }))
  }

  const removeTaskHandler = () => {
    dispatch(deleteTaskTC(task.todoListId, task.id))
  }

  return (
    <div>
      <li className={task.status === 2 ? style.isDone : ""}>
        <Checkbox
          disabled={task.entityStatus === "loading"}
          onChange={changeTaskStatusHandler}
          checked={task.status === 2}
          size={"small"}
        />
        <EditableSpan
          oldTitle={task.title}
          callBack={changeTaskTitleHandler}
          disabled={task.entityStatus === "loading"}
        />
        <IconButton
          disabled={task.entityStatus === "loading"}
          aria-label="delete"
          size={"small"}
          onClick={removeTaskHandler}
        >
          <DeleteIcon fontSize={"small"} />
        </IconButton>
      </li>
    </div>
  )
})
