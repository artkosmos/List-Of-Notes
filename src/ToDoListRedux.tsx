import style from './ToDoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux";
import {AppDispatchType, StateType} from "./store/store";
import {addTaskTC, setTasksTC} from "./reducers/tasks-reducer";
import {
  AppTodolistType,
  changeToDoListFilterAC, deleteTodolistTC, FilterType, updateTodolistTitleTC
} from "./reducers/todolists-reducer";
import {TaskRedux} from "./TaskRedux";
import React, {memo, useCallback, useEffect} from "react";
import {TaskType} from "./api/todolist-api";
import Button from "@mui/material/Button";

type ToDoListPropsType = {
  todolist: AppTodolistType
}

export const ToDoListRedux = ({todolist}: ToDoListPropsType) => {

  const {id, title, filter, entityStatus} = todolist

  const tasks = useSelector<StateType, TaskType[]>(state => state.tasks[id])

  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(setTasksTC(id))
  },[])

  const getFilteredTask = (tasks: TaskType[], filter: FilterType) => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => item.status === 1)
      case "completed":
        return tasks.filter((item) => item.status === 2)
      default:
        return tasks
    }
  }
  const filteredTasksData = getFilteredTask(tasks, filter)

  const onClickHandlerAll = useCallback(() => {
    dispatch(changeToDoListFilterAC(id, "all"))
  }, [])

  const onClickHandlerActive = useCallback(() => {
    dispatch(changeToDoListFilterAC(id, "active"))
  }, [])

  const onClickHandlerCompleted = useCallback(() => {
    dispatch(changeToDoListFilterAC(id, "completed"))
  }, [])

  const removeToDoListHandler = useCallback(() => {
    dispatch(deleteTodolistTC(id))
  }, [])

  const addTaskHandler = useCallback((title: string) => {
    dispatch(addTaskTC(id, title))
  }, [])

  const updateTodolistTitle = useCallback((updatedTitle: string) => {
    dispatch(updateTodolistTitleTC(id, updatedTitle))
  }, [])

  const mappedTasks = filteredTasksData.map((item) => {
    return (
      <TaskRedux key={item.id} task={item}/>
    )
  })

  // render
  return (
    <div>
      <div className={style.todolist}>
        <IconButton
          aria-label="delete"
          onClick={removeToDoListHandler}
          className={style.delete}
          disabled={entityStatus === 'loading'}>
          <DeleteIcon />
          <span className={style.deleteText}>Delete list</span>
        </IconButton>
        <h2><EditableSpan oldTitle={title} callBack={updateTodolistTitle}/></h2>
        <AddItemForm callBack={addTaskHandler} disabled={entityStatus === 'loading'}/>
        <ul className={style.list}>
          {mappedTasks}
        </ul>
        <div className={style.buttonWrapper}>
          <ButtonMemo
            title={'All'}
            variant={filter === 'all' ? "outlined" : "contained"}
            color={"secondary"}
            onClick={onClickHandlerAll}
            style={{height: '30px'}}
          />
          <ButtonMemo
            title={'Active'}
            variant={filter === 'active' ? "outlined" : "contained"}
            color={"success"}
            onClick={onClickHandlerActive}
            style={{height: '30px'}}
          />
          <ButtonMemo
            title={'Completed'}
            variant={filter === 'completed' ? "outlined" : "contained"}
            color={"error"}
            onClick={onClickHandlerCompleted}
            style={{height: '30px'}}
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
  return <Button
    variant={props.variant}
    color={props.color}
    onClick={props.onClick}
    style={props.style}
  >{props.title}
  </Button>
})
