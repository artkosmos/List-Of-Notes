import './App.css';
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import LinearProgress from '@mui/material/LinearProgress';
import {addTodolistTC, setTodolistsTC} from "./reducers/todolists-reducer";
import {useDispatch} from "react-redux";
import {useCallback, useEffect} from "react";
import {AppDispatchType, useAppSelector} from "./store/store";
import {RequestStatusType} from "./reducers/app-reducer";
import {ErrorSnackbar} from "./ErrorSnackBar";
import {Login} from "./features/Login";
import {Navigate, Route, Routes} from "react-router-dom";
import {ListOfTodolists} from "./ListOfTodolists";
import {Error} from "./features/Error";

function AppRedux() {

  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(checkIsLogInTC())
  }, [])


  return (
    <div className="App">
      <ButtonAppBar/>
      {status === 'loading' && <LinearProgress color="secondary"/>}
      <div className={'contentWrapper'}>
        <ErrorSnackbar/>
        <Routes>
          <Route path={'/'} element={<ListOfTodolists/>}/>
          <Route path={'login'} element={<Login/>}/>
          <Route path={'404error'} element={<Error/>}/>
          <Route path={'*'} element={<Navigate to={'404error'}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default AppRedux;
