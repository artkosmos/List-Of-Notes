import React from 'react';
import {FilterType} from "./App";

type ToDoListPropsType = {
  title: string
  tasksData: TaskType[]
  removeTask: (taskId: number) => void
  changeFilter: (filter: FilterType) => void
}

export type TaskType = {
  id: number
  title: string
  isChecked: boolean
}

const ToDoList: React.FC<ToDoListPropsType> = ({tasksData, title, removeTask, changeFilter}) => {
  // const  {tasks, title} = props --> the write is longer than above in brackets
  const tasksJSX: JSX.Element[] = tasksData.map((item) => {
    return (
      // key is the difference between old and new added element for React
      <li key={item.id}>
        <input type="checkbox" checked={item.isChecked}/>
        <span>{item.title}</span>
        <button onClick={() => removeTask(item.id)}>x</button>
      </li>
    )
  })
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          {tasksJSX}
        </ul>
        <div>
          <button onClick={() => changeFilter("all")}>All</button>
          <button onClick={() => changeFilter("active")}>Active</button>
          <button onClick={() => changeFilter("completed")}>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;