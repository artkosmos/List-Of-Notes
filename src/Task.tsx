/*
import style from "./ToDoList.module.css";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React, {memo} from "react";
import {TaskType} from "./ToDoList";

type TaskPropsType = {
  task: TaskType
  changeStatus: (taskID: string, checkedValue: boolean) => void
  updateTask: (taskId: string, title: string) => void
  removeTask: (taskId: string) => void
}

export const Task = memo(({
                            changeStatus,
                            removeTask,
                            updateTask,
                            task
                          }: TaskPropsType) => {

  const {id, title, isDone} = task

  return (
    <div>
      <li className={isDone ? style.isDone : ''}>
        <Checkbox
          onChange={(event) => changeStatus(id, event.currentTarget.checked)}
          checked={isDone}
          size={'small'}
        />
        <EditableSpan oldTitle={title} callBack={(updatedTitle) => updateTask(id, updatedTitle)}/>
        <IconButton aria-label="delete" size={'small'} onClick={() => removeTask(id)}>
          <DeleteIcon fontSize={'small'}/>
        </IconButton>
      </li>
    </div>
  )
})
*/
