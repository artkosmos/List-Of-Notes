import './App.css';
import {ToDoListRedux} from "./ToDoListRedux";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Paper from '@mui/material/Paper';
import {addTodolistTC, AppTodolistType, setTodolistsTC} from "./reducers/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {AppDispatchType, StateType} from "./store/store";

function AppRedux() {

  const todolists = useSelector<StateType, AppTodolistType[]>(state => state.todolists)
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
