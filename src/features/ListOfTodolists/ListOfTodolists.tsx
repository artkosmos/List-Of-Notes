import React, { useCallback, useEffect } from 'react'
import { AppDispatchType, useAppSelector } from 'app/store'
import { todolistsThunk } from 'features/ListOfTodolists/todolists-reducer'
import Paper from '@mui/material/Paper'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isLoginSelector, todolistsSelector } from 'app/app-selectors'
import { AddItemForm } from 'common/components'
import { ToDoListRedux } from 'features'

export const ListOfTodolists = () => {
  const dispatch = useDispatch<AppDispatchType>()

  const todolists = useAppSelector(todolistsSelector)

  const isLogIn = useAppSelector(isLoginSelector)

  useEffect(() => {
    if (isLogIn) {
      dispatch(todolistsThunk.setTodolists({}))
    }
  }, [])

  const addToDoList = useCallback((title: string) => {
    dispatch(todolistsThunk.addTodolist(title))
  }, [])

  if (!isLogIn) {
    return <Navigate to={'/login'} />
  }

  const paperStyles = {
    padding: '15px',
    backgroundColor: '#ecf5fd',
    height: 'max-content',
    borderRadius: '15px',
  }

  return (
    <>
      <AddItemForm callBack={addToDoList} />
      <div className={'listsWrapper'}>
        {todolists.map((item) => {
          return (
            <Paper key={item.id} elevation={12} sx={paperStyles}>
              <ToDoListRedux todolist={item} />
            </Paper>
          )
        })}
      </div>
    </>
  )
}
