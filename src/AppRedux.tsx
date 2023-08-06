import './App.css';
import {ToDoListRedux} from "./ToDoListRedux";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';
import {addTodolistTC, AppTodolistType, setTodolistsTC} from "./reducers/todolists-reducer";
import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {AppDispatchType, useAppSelector} from "./store/store";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./ErrorSnackBar";

function AppRedux() {

  const todolists = useAppSelector<AppTodolistType[]>(state => state.todolists)
  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(setTodolistsTC())
  }, [])

  const addToDoList = useCallback((title: string) => {
    dispatch(addTodolistTC(title))
  }, [])

  return (
    <div className="App">
      <ButtonAppBar/>
      {status === 'loading' && <LinearProgress color="secondary"/>}
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
        <ErrorSnackbar/>
      </div>
    </div>
  )
}

export default AppRedux;
