import React, {memo, useCallback, useState} from 'react';
import {FilterType} from "./AppReducer";
import style from './ToDoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

type ToDoListPropsType = {
  title: string
  tasksData: TaskType[]
  removeTask: (todolistID: string, taskId: string) => void
  changeFilter: (todolistID: string, filter: FilterType) => void
  addTask: (todolistID: string, text: string) => void
  changeStatus: (todolistID: string, taskID: string, checkedValue: boolean) => void
  todolistID: string
  removeToDoList: (todolistID: string) => void
  updateTask: (todolistID: string, taskId: string, title: string) => void
  updateToDoList: (todolistID: string, title: string) => void
  filter: FilterType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const ToDoList = memo(({
                         tasksData,
                         title,
                         removeTask,
                         changeFilter,
                         addTask,
                         changeStatus,
                         todolistID,
                         removeToDoList,
                         updateTask,
                         updateToDoList,
                         filter
                       }: ToDoListPropsType) => {

  const [buttonName, setButtonName] = useState<FilterType>('all')

  const getFilteredTask = (tasks: TaskType[], filter: FilterType) => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => !item.isDone)
      case "completed":
        return tasks.filter((item) => item.isDone)
      default:
        return tasks
    }
  }

  const filteredTasksData = getFilteredTask(tasksData, filter)

  console.log('Rendering Todolist')

  const onClickHandlerAll = useCallback(() => {
    changeFilter(todolistID, "all")
    setButtonName('all')
  }, [])

  const onClickHandlerActive = useCallback(() => {
    changeFilter(todolistID, "active")
    setButtonName('active')
  }, [])

  const onClickHandlerCompleted = useCallback(() => {
    changeFilter(todolistID, "completed")
    setButtonName('completed')
  }, [])

  const onChangeStatusHandler = (taskID: string, eventValue: boolean) => {
    changeStatus(todolistID, taskID, eventValue)
  }

  const removeToDoListHandler = () => {
    removeToDoList(todolistID)
  }

  const onClickRemoveHandler = (taskID: string) => {
    removeTask(todolistID, taskID)
  }

  const addTaskHandler = useCallback((text: string) => {
    addTask(todolistID, text)
  }, [addTask])

  const updateTaskTitle = (taskID: string, updatedTitle: string) => {
    updateTask(todolistID, taskID, updatedTitle)
  }

  const updateToDoListTitle = (updatedTitle: string) => {
    updateToDoList(todolistID, updatedTitle)
  }

  const tasksJSX: JSX.Element[] = filteredTasksData.map((item) => {

    return (
      // key need to add always or may be error
      <li key={item.id} className={item.isDone ? style.isDone : ''}>
        {/*<input type="checkbox" checked={item.isDone} onChange={(event) =>
          onChangeStatusHandler(item.id, event.currentTarget.checked)}/>*/}
        <Checkbox
          onChange={(event) => onChangeStatusHandler(item.id, event.currentTarget.checked)}
          checked={item.isDone}
          size={'small'}
        />
        {/*<span>{item.title}</span>*/}
        <EditableSpan oldTitle={item.title} callBack={(updatedTitle) => updateTaskTitle(item.id, updatedTitle)}/>
        {/*<button onClick={() => onClickRemoveHandler(item.id)}>x</button>*/}
        <IconButton aria-label="delete" size={'small'} onClick={() => onClickRemoveHandler(item.id)}>
          <DeleteIcon fontSize={'small'}/>
        </IconButton>
      </li>
    )
  })

  // render
  return (
    <div>
      <div className={style.todolist}>
        <IconButton aria-label="delete" onClick={removeToDoListHandler} className={style.delete}>
          <DeleteIcon/>
          <span className={style.deleteText}>Delete list</span>
        </IconButton>
        {/*<button onClick={removeToDoListHandler}>Delete list</button>*/}
        {/*<h3>{title}</h3>*/}
        <h2><EditableSpan oldTitle={title} callBack={updateToDoListTitle}/></h2>
        {/*<div>
          <input className={error ? style.error : ''}
                 value={text}
                 onChange={onChangeHandler}
                 onKeyDown={onPressHandler}
          />
          <button onClick={anotherTask}>Add</button>
        </div>
        {error && <div className={style.errorMessage}>{error}</div>}*/}
        <AddItemForm callBack={addTaskHandler}/>
        <ul className={style.list}>
          {tasksJSX}
        </ul>
        <div className={style.buttonWrapper}>
          <ButtonMemo
            title={'All'}
            variant={buttonName === 'all' ? "outlined" : "contained"}
            color={"secondary"}
            onClick={onClickHandlerAll}
            style={{height: '30px'}}
          />
          <ButtonMemo
            title={'Active'}
            variant={buttonName === 'active' ? "outlined" : "contained"}
            color={"success"}
            onClick={onClickHandlerActive}
            style={{height: '30px'}}
          />
          <ButtonMemo
            title={'Completed'}
            variant={buttonName === 'completed' ? "outlined" : "contained"}
            color={"error"}
            onClick={onClickHandlerCompleted}
            style={{height: '30px'}}
          />
          {/*<button className={buttonName === 'all' ? style.activeFilter : ''} onClick={onClickHandlerAll}>All</button>
          <button className={buttonName === 'active' ? style.activeFilter : ''} onClick={onClickHandlerActive}>Active
          </button>
          <button className={buttonName === 'completed' ? style.activeFilter : ''}
                  onClick={onClickHandlerCompleted}>Completed
          </button>*/}
        </div>
      </div>
    </div>
  )
})

type ButtonMemoPropsType = {
  title: string
  variant: 'text' | 'outlined' | 'contained'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  style?: {}
  onClick: () => void
}

const ButtonMemo = memo((props: ButtonMemoPropsType) => {
  return <Button
    variant={props.variant}
    color={props.color}
    onClick={props.onClick}
    style={props.style}
  >{props.title}
  </Button>
})

export default ToDoList;