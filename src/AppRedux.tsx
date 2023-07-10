import './App.css';
import ToDoListRedux, {TaskType} from "./ToDoListRedux";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Paper from '@mui/material/Paper';
import {addToDoListAC} from "./reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {Dispatch} from "redux";
import {StateType} from "./store/store";
import {useCallback} from "react";

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppRedux() {

  const dispatch: Dispatch = useDispatch()

  // const tasks = useSelector<StateType, TasksStateType>(state => state.tasks)

  const todolists = useSelector<StateType, TodolistType[]>(state => state.todolists)

  // const updateTask = (todolistID: string, taskID: string, updatedTitle: string) => {
  //   dispatch(updateTaskTitleAC(todolistID, taskID, updatedTitle))
  // }
  //
  // const removeTask = (todolistID: string, taskId: string): void => {
  //   dispatch(removeTaskAC(todolistID, taskId))
  // }
  //
  // const addTask = (todolistID: string, text: string) => {
  //   dispatch(addTaskAC(todolistID, text))
  // }
  //
  // const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
  //   dispatch(changeTaskStatusAC(todolistID, taskID, isDone))
  // }
  //
  // const changeFilter = (todolistID: string, filter: FilterType) => {
  //   dispatch(changeToDoListFilterAC(todolistID, filter))
  // }
  //
  // const removeToDoList = (todolistID: string) => {
  //   dispatch(removeToDoListAC(todolistID))
  // }
  // const updateToDoList = (todolistID: string, updatedTitle: string) => {
  //   dispatch(updateToDoListTitleAC(todolistID, updatedTitle))
  // }

  const addToDoList = useCallback((title: string) => {
    dispatch(addToDoListAC(title, v1()))

  }, [])

  return (
    <div className="App">
      <ButtonAppBar/>
      <div className={'contentWrapper'}>
        <AddItemForm callBack={addToDoList}/>

        <div className={'listsWrapper'}>
          {todolists.map(item => {
            return (
              <Paper key={item.id} elevation={12} style={{padding: '15px', backgroundColor: '#ececdc'}}>
                <ToDoListRedux
                  todolist={item}
                />
              </Paper>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AppRedux;
