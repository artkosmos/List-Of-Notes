import React, {useState} from 'react';
import {FilterType} from "./App";
import style from './ToDoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

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
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const ToDoList: React.FC<ToDoListPropsType> = ({
                                                 tasksData,
                                                 title,
                                                 removeTask,
                                                 changeFilter,
                                                 addTask,
                                                 changeStatus,
                                                 todolistID,
                                                 removeToDoList,
                                                 updateTask,
                                                 updateToDoList
                                               }) => {
  // const  {tasks, title} = props --> the write is the same, but it'll be longer than above in brackets

  // const [text, setText] = useState('')
  // const [error, setError] = useState<string | null>('')
  const [buttonName, setButtonName] = useState<FilterType>('all')

  /*const anotherTask = () => {
    if (text.trim()) {
      addTask(todolistID, text.trim())
      setText('')
    } else {
      setError('Title is required')
    }
  }*/

  /*const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      anotherTask()
    }
  }*/

  /*const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setText(event.currentTarget.value)
  }*/

  const onClickHandlerAll = () => {
    changeFilter(todolistID, "all")
    setButtonName('all')
  }

  const onClickHandlerActive = () => {
    changeFilter(todolistID, "active")
    setButtonName('active')
  }

  const onClickHandlerCompleted = () => {
    changeFilter(todolistID, "completed")
    setButtonName('completed')
  }

  const onChangeStatusHandler = (taskID: string, eventValue: boolean) => {
    changeStatus(todolistID, taskID, eventValue)
  }

  const removeToDoListHandler = () => {
    removeToDoList(todolistID)
  }

  const onClickRemoveHandler = (taskID: string) => {
    removeTask(todolistID, taskID)
  }

  const addTaskHandler = (text: string) => {
    addTask(todolistID, text)
  }

  const updateTaskTitle = (taskID: string, updatedTitle: string) => {
    updateTask(todolistID, taskID, updatedTitle)
  }

  const updateToDoListTitle = (updatedTitle: string) => {
    updateToDoList(todolistID, updatedTitle)
  }

  const tasksJSX: JSX.Element[] = tasksData.map((item) => {

    return (
      // key need to add always or may be error
      <li key={item.id} className={item.isDone ? style.isDone : ''}>
        <input type="checkbox" checked={item.isDone} onChange={(event) =>
          onChangeStatusHandler(item.id, event.currentTarget.checked)}/>
        {/*<span>{item.title}</span>*/}
        <EditableSpan oldTitle={item.title} callBack={(updatedTitle) => updateTaskTitle(item.id, updatedTitle)}/>
        {/*<button onClick={() => onClickRemoveHandler(item.id)}>x</button>*/}
        <IconButton aria-label="delete" size={'small'} onClick={() => onClickRemoveHandler(item.id)}>
          <DeleteIcon fontSize={'small'} />
        </IconButton>
      </li>
    )
  })

  // render
  return (
    <div>
      <div className={'todolist'}>
        <IconButton aria-label="delete" onClick={removeToDoListHandler}>
          <DeleteIcon />
          Delete list
        </IconButton>
        {/*<button onClick={removeToDoListHandler}>Delete list</button>*/}
        {/*<h3>{title}</h3>*/}
        <h3><EditableSpan oldTitle={title} callBack={updateToDoListTitle}/></h3>
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
        <ul>
          {tasksJSX}
        </ul>
        <div>
          <Button
            variant={buttonName === 'all' ? "outlined" : "contained"}
            color="secondary"
            onClick={onClickHandlerAll}
          >All
          </Button>
          <Button
            variant={buttonName === 'active' ? "outlined" : "contained"}
            color="success"
            onClick={onClickHandlerActive}
          >Active
          </Button>
          <Button
            variant={buttonName === 'completed' ? "outlined" : "contained"}
            color="error"
            onClick={onClickHandlerCompleted}
          >Completed
          </Button>
          {/*<button className={buttonName === 'all' ? style.activeFilter : ''} onClick={onClickHandlerAll}>All</button>
          <button className={buttonName === 'active' ? style.activeFilter : ''} onClick={onClickHandlerActive}>Active
          </button>
          <button className={buttonName === 'completed' ? style.activeFilter : ''}
                  onClick={onClickHandlerCompleted}>Completed
          </button>*/}
        </div>
      </div>
    </div>
  );
};

export default ToDoList;