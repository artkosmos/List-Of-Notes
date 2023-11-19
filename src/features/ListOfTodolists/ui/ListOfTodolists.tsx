import React, {useCallback, useEffect} from 'react'
import {todolistsThunk} from 'features/ListOfTodolists/model/todolists-reducer'
import Paper from '@mui/material/Paper'
import {useDispatch} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {isLoginSelector, todolistsSelector} from 'app/app-selectors'
import {AddItemForm} from 'common/components'
import {ToDoListRedux} from 'features/index'
import {AppDispatchType} from 'common/types/app-types'
import {useAppSelector} from 'common/utils'
import styled from "@emotion/styled";

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
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <AddItemForm callBack={addToDoList} fieldColor={'warning'} textColor={'#c3c1c7'}/>
      <div className={'listsWrapper'}>
        {todolists.map((item) => {
          return (
            <StyledPaper key={item.id} elevation={12}>
              <ToDoListRedux todolist={item}/>
            </StyledPaper>
          )
        })}
      </div>
    </>
  )
}

const StyledPaper = styled(Paper)`
  padding: 15px;
  background-color: rgba(217, 228, 245, 0.9);
  border-radius: 15px;
  height: max-content;
  min-width: 300px;
`
