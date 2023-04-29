import React from 'react';

type ToDoListPropsType = {
  title: string
  tasks: TaskType[]
}

export type TaskType = {
  id: number
  title: string
  isChecked: boolean
}

const ToDoList = (props: ToDoListPropsType) => {
  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <div>
          <input/>
          <button>+</button>
        </div>
        <ul>
          <li><input type="checkbox" checked={props.tasks[0].isChecked}/> <span>{props.tasks[0].title}</span></li>
          <li><input type="checkbox" checked={props.tasks[1].isChecked}/> <span>{props.tasks[1].title}</span></li>
          <li><input type="checkbox" checked={props.tasks[2].isChecked}/> <span>{props.tasks[2].title}</span></li>
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