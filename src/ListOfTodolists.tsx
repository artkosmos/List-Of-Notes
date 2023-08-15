import React, {useCallback, useEffect} from 'react';
import {AppDispatchType, useAppSelector} from "./store/store";
import {addTodolistTC, AppTodolistType, setTodolistsTC} from "./reducers/todolists-reducer";
import {ToDoListRedux} from "./ToDoListRedux";
import Paper from '@mui/material/Paper';
import {AddItemForm} from "./AddItemForm";
import {useDispatch} from "react-redux";
import {Navigate} from "react-router-dom";

export const ListOfTodolists = () => {
  const dispatch = useDispatch<AppDispatchType>()
  const todolists = useAppSelector<AppTodolistType[]>(state => state.todolists)
  const isLogIn = useAppSelector<boolean>(state => state.auth.isLogin)

  useEffect(() => {
    if (isLogIn) {
      dispatch(setTodolistsTC())
    }
  }, [])

  const addToDoList = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])

  if (!isLogIn) {
    return <Navigate to={'/login'}/>
  }

  return (
    <>
      <AddItemForm callBack={addToDoList}/>
      <div className={'listsWrapper'}>
        {todolists.map(item => {
          return (
            <Paper key={item.id} elevation={12}
                   style={{padding: '15px', backgroundColor: '#ececdc', height: 'max-content'}}>
              <ToDoListRedux
                todolist={item}
              />
            </Paper>
          )
        })}
      </div>
    </>
  )
}
