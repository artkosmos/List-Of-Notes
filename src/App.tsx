import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

function App() {
  const tasksData: TaskType[] = [
    {id: 1, title: "HTML&CSS", isChecked: true},
    {id: 2, title: "JS/TS/ES6", isChecked: true},
    {id: 3, title: "React", isChecked: false}
    ]

  return (
    <div className="App">
      <ToDoList tasks={tasksData} title={"What to learn?"} />
    </div>
  );
}

export default App;
