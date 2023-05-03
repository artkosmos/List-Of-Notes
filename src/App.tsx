import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

function App() {
  // we store data higher to follow "raise the state" concept
  const title: string = "What to learn?"
  const [tasksData, setTasksData] = useState<TaskType[]>([ // always return array including 2 elements(arr,fnc)
    {id: 1, title: "HTML&CSS", isChecked: true},
    {id: 2, title: "JS/TS/ES6", isChecked: true},
    {id: 3, title: "React", isChecked: false},
    {id: 4, title: "Angular", isChecked: false}
  ])
  /*let tasksData: TaskType[] = [
    {id: 1, title: "HTML&CSS", isChecked: true},
    {id: 2, title: "JS/TS/ES6", isChecked: true},
    {id: 3, title: "React", isChecked: false},
    {id: 4, title: "Angular", isChecked: false}
  ]*/
  const removeTask = (taskId: number):void => {
    const updatedTasksData = tasksData.filter((item) => item.id !== taskId)
    setTasksData(updatedTasksData)
  }

  return (
    <div className="App">
      <ToDoList tasksData={tasksData} title={title} removeTask={removeTask}/>
    </div>
  )
}

export default App;
