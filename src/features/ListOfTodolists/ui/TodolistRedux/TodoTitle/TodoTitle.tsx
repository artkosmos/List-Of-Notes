import React, { useCallback } from 'react'
import IconButton from '@mui/material/IconButton'
import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import CloseIcon from '@mui/icons-material/Close'
import { EditableSpan } from 'common/components'
import { todolistsThunk } from 'features/ListOfTodolists/model/todolists-reducer'
import { useDispatch } from 'react-redux'
import { AppDispatchType, RequestStatusType } from 'common/types/app-types'

type TodoTitleProps = {
  id: string
  title: string
  entityStatus: RequestStatusType
}

export const TodoTitle = ({ id, title, entityStatus }: TodoTitleProps) => {
  const dispatch = useDispatch<AppDispatchType>()

  const removeToDoListHandler = () => {
    dispatch(todolistsThunk.deleteTodolist({ todolistId: id }))
  }

  const updateTodolistTitle = useCallback((title: string) => {
    dispatch(todolistsThunk.updateTodoTitle({ todolistId: id, title }))
  }, [])

  return (
    <>
      <IconButton
        aria-label="delete"
        onClick={removeToDoListHandler}
        className={style.delete}
        disabled={entityStatus === 'loading'}
      >
        <CloseIcon className={style.closeButton} />
        <span className={style.deleteText}>Delete</span>
      </IconButton>
      <h2>
        <EditableSpan oldTitle={title} callBack={updateTodolistTitle} disabled={entityStatus === 'loading'} />
      </h2>
    </>
  )
}
