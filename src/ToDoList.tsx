import React from 'react';

type ToDoListPropsType = {
  title: string
  tasksData: TaskType[]
  removeTask: (taskId: number) => void
}

export type TaskType = {
  id: number
  title: string
  isChecked: boolean
}

const ToDoList: React.FC<ToDoListPropsType> = ({tasksData, title, removeTask}) => {
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
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;