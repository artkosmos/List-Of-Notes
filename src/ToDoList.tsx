import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterType} from "./App";
import style from './ToDoList.module.css'
import {AddItemForm} from "./AddItemForm";

type ToDoListPropsType = {
  title: string
  tasksData: TaskType[]
  removeTask: (todolistID: string, taskId: string) => void
  changeFilter: (todolistID: string, filter: FilterType) => void
  addTask: ( todolistID: string, text: string) => void
  changeStatus: (todolistID: string, taskID: string, checkedValue: boolean) => void
  todolistID: string
  removeToDoList: (todolistID: string) => void
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
                                                 removeToDoList
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


  const tasksJSX: JSX.Element[] = tasksData.map((item) => {

    return (
      // key need to add always or may be error
      <li key={item.id} className={item.isDone ? style.isDone : ''}>
        <input type="checkbox" checked={item.isDone} onChange={(event) =>
          onChangeStatusHandler(item.id, event.currentTarget.checked)}/>
        <span>{item.title}</span>
        <button onClick={() => onClickRemoveHandler(item.id)}>x</button>
      </li>
    )
  })

  // render
  return (
    <div>
      <div className={'todolist'}>
        <h3>{title}</h3>
        <button onClick={removeToDoListHandler}>Delete list</button>
        {/*<div>
          <input className={error ? style.error : ''}
                 value={text}
                 onChange={onChangeHandler}
                 onKeyDown={onPressHandler}
          />
          <button onClick={anotherTask}>Add</button>
        </div>
        {error && <div className={style.errorMessage}>{error}</div>}*/}
        <AddItemForm callBack={addTask} todolistID={todolistID}/>
        <ul>
          {tasksJSX}
        </ul>
        <div>
          <button className={buttonName === 'all' ? style.activeFilter : ''} onClick={onClickHandlerAll}>All</button>
          <button className={buttonName === 'active' ? style.activeFilter : ''} onClick={onClickHandlerActive}>Active
          </button>
          <button className={buttonName === 'completed' ? style.activeFilter : ''}
                  onClick={onClickHandlerCompleted}>Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;