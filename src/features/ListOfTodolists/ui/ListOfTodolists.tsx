import React, { useCallback, useEffect } from 'react'
import { todolistsThunk } from 'features/ListOfTodolists/model/todolists-reducer'
import Paper from '@mui/material/Paper'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { isLoginSelector, todolistsSelector } from 'app/app-selectors'
import { AddItemForm } from 'common/components'
import { ToDoListRedux } from 'features/index'
import { AppDispatchType } from 'common/types/app-types'
import { useAppSelector } from 'common/utils'

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
    backgroundColor: '#d9e4f5',
    height: '100%',
    borderRadius: '15px',
    maxWidth: '290px',
    wordWrap: 'break-word',
  }

  return (
    <>
      <AddItemForm callBack={addToDoList} fieldColor={'warning'} textColor={'#c3c1c7'} />
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
