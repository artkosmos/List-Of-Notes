import style from 'features/ListOfTodolists/TodolistRedux/ToDoList.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { useDispatch } from 'react-redux'
import { tasksThunk } from 'features/ListOfTodolists/tasks-reducer'
import { todolistsAction, todolistsThunk } from 'features/ListOfTodolists/todolists-reducer'
import React, { memo, useCallback } from 'react'
import Button from '@mui/material/Button'
import { tasksSelector } from 'app/app-selectors'
import { TaskRedux } from 'features'
import { AddItemForm, EditableSpan } from 'common/components'
import { TaskStatuses } from 'common/types/api_types'
import { useAppSelector } from 'common/utils'
import { AppDispatchType, AppTaskType, AppTodolistType, FilterType } from 'common/types/app-types'

type ToDoListProps = {
  todolist: AppTodolistType
}

export const ToDoListRedux = ({ todolist }: ToDoListProps) => {
  const { id, title, filter, entityStatus } = todolist

  const tasks = useAppSelector(tasksSelector(id))

  const dispatch = useDispatch<AppDispatchType>()

  const getFilteredTask = (tasks: AppTaskType[], filter: FilterType) => {
    switch (filter) {
      case 'active':
        return tasks.filter((item) => item.status === TaskStatuses.New)
      case 'completed':
        return tasks.filter((item) => item.status === TaskStatuses.Completed)
      default:
        return tasks
    }
  }
  const filteredTasksData = getFilteredTask(tasks, filter)

  const onClickHandlerAll = useCallback(() => {
    dispatch(todolistsAction.changeToDoListFilter({ todolistId: id, filter: 'all' }))
  }, [])

  const onClickHandlerActive = useCallback(() => {
    dispatch(todolistsAction.changeToDoListFilter({ todolistId: id, filter: 'active' }))
  }, [])

  const onClickHandlerCompleted = useCallback(() => {
    dispatch(todolistsAction.changeToDoListFilter({ todolistId: id, filter: 'completed' }))
  }, [])

  const removeToDoListHandler = useCallback(() => {
    dispatch(todolistsThunk.deleteTodolist(id))
  }, [])

  const addTaskHandler = useCallback((title: string) => {
    dispatch(tasksThunk.addTask({ todolistId: id, title }))
  }, [])

  const updateTodolistTitle = useCallback((title: string) => {
    dispatch(todolistsThunk.updateTodoTitle({ todolistId: id, title }))
  }, [])

  const mappedTasks = filteredTasksData?.map((item) => {
    return <TaskRedux key={item.id} task={item} />
  })

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
        <ul className={style.list}>{mappedTasks}</ul>
        <div className={style.buttonWrapper}>
          <ButtonMemo
            title={'All'}
            variant={filter === 'all' ? 'outlined' : 'contained'}
            color={'secondary'}
            onClick={onClickHandlerAll}
            style={{ height: '30px' }}
          />
          <ButtonMemo
            title={'Active'}
            variant={filter === 'active' ? 'outlined' : 'contained'}
            color={'success'}
            onClick={onClickHandlerActive}
            style={{ height: '30px' }}
          />
          <ButtonMemo
            title={'Completed'}
            variant={filter === 'completed' ? 'outlined' : 'contained'}
            color={'error'}
            onClick={onClickHandlerCompleted}
            style={{ height: '30px' }}
          />
        </div>
      </div>
    </div>
  )
}

type ButtonMemoPropsType = {
  title: string
  variant: 'text' | 'outlined' | 'contained'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  style?: {}
  onClick: () => void
}

export const ButtonMemo = memo((props: ButtonMemoPropsType) => {
  return (
    <Button variant={props.variant} color={props.color} onClick={props.onClick} style={props.style}>
      {props.title}
    </Button>
  )
})
