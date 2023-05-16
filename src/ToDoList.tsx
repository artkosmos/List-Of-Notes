import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterType} from "./App";
import style from './ToDoList.module.css'

type ToDoListPropsType = {
  title: string
  tasksData: TaskType[]
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterType) => void
  addTask: (text: string) => void
  changeStatus: (taskID: string, checkedValue: boolean) => void
}

export type TaskType = {
  id: string
  title: string
  isChecked: boolean
}

const ToDoList: React.FC<ToDoListPropsType> = ({
                                                 tasksData,
                                                 title,
                                                 removeTask,
                                                 changeFilter,
                                                 addTask,
                                                 changeStatus
                                               }) => {
  // const  {tasks, title} = props --> the write is the same, but it'll be longer than above in brackets

  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>('')

  const anotherTask = () => {
    if (text.trim()) {
      addTask(text.trim())
      setText('')
    } else {
      setError('Title is required')
    }
  }

  const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      anotherTask()
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError('')
    const currentValue = event.currentTarget.value
    setText(currentValue)
  }

  const onClickHandlerAll = () => {
    changeFilter("all")
  }

  const onClickHandlerActive = () => {
    changeFilter("active")
  }

  const onClickHandlerCompleted = () => {
    changeFilter("completed")
  }

  const tasksJSX: JSX.Element[] = tasksData.map((item) => {

    const onClickRemoveHandler = () => {
      removeTask(item.id)
    }

    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>) => {
      changeStatus(item.id, event.currentTarget.checked)
    }

    return (
      // key need to add always or may be error
      <li key={item.id}>
        <input type="checkbox" checked={item.isChecked} onChange={onChangeStatusHandler}/>
        <span>{item.title}</span>
        <button onClick={onClickRemoveHandler}>x</button>
      </li>
    )
  })

  // render
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <div>
          <input className={error ? style.error : ''}
            value={text}
            onChange={onChangeHandler}
            onKeyDown={onPressHandler}
          />
          <button onClick={anotherTask}>+</button>
        </div>
        {error && <div className={style.errorMessage}>{error}</div>}
        <ul>
          {tasksJSX}
        </ul>
        <div>
          <button onClick={onClickHandlerAll}>All</button>
          <button onClick={onClickHandlerActive}>Active</button>
          <button onClick={onClickHandlerCompleted}>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;