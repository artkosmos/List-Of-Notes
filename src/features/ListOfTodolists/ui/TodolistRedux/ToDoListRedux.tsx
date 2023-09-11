import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { tasksThunk } from 'features/ListOfTodolists/model/tasks-reducer'
import { todolistsThunk } from 'features/ListOfTodolists/model/todolists-reducer'
import { useCallback } from 'react'
import { AddItemForm, EditableSpan } from 'common/components'
import { AppDispatchType, AppTodolistType } from 'common/types/app-types'
import { TaskFilterButtons } from 'features/ListOfTodolists/ui/TodolistRedux/TaskFilterButtons/TaskFilterButtons'
import { TasksList } from 'features/ListOfTodolists/ui/TodolistRedux/Tasks/TasksList'

type ToDoListProps = {
  todolist: AppTodolistType
}

export const ToDoListRedux = ({ todolist }: ToDoListProps) => {
  const { id, title, filter, entityStatus } = todolist

  const dispatch = useDispatch<AppDispatchType>()

  const removeToDoListHandler = useCallback(() => {
    dispatch(todolistsThunk.deleteTodolist(id))
  }, [])

  const addTaskHandler = useCallback((title: string) => {
    dispatch(tasksThunk.addTask({ todolistId: id, title }))
  }, [])

  const updateTodolistTitle = useCallback((title: string) => {
    dispatch(todolistsThunk.updateTodoTitle({ todolistId: id, title }))
  }, [])

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
        <TasksList id={id} filter={filter} />
        <div className={style.buttonWrapper}>
          <TaskFilterButtons id={id} filter={filter} />
        </div>
      </div>
    </div>
  )
}
