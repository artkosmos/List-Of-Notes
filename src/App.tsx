import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
  // we store data higher to follow "raise the state" concept
  const title: string = "What to learn?"
  const [tasksData, setTasksData] = useState<TaskType[]>([ // always return array including 2 elements(arr,fnc)
    // v1 sets unique id number
    {id: v1(), title: "HTML&CSS", isChecked: true},
    {id: v1(), title: "JS/TS/ES6", isChecked: true},
    {id: v1(), title: "React", isChecked: false},
    {id: v1(), title: "Angular", isChecked: false}
  ])
  const [filter, setFilter] = useState<FilterType>("all")

  const changeFilter = (filter: FilterType) => {
    setFilter(filter)
  }

  const removeTask = (taskId: string): void => {
    const updatedTasksData = tasksData.filter((item) => item.id !== taskId)
    setTasksData(updatedTasksData)
    // return updated tasks array without removed(x) value in main state
  }

  const addTask = (text: string) => {
    const newTask = {id: v1(), title: text, isChecked: false}
    const newTasks = [newTask, ...tasksData]
    setTasksData(newTasks)
  }

  const changeStatus = (taskID: string, checkedValue: boolean) => {
    // we always must do copies
    setTasksData(tasksData.map(item => item.id === taskID ? {...item, isChecked: checkedValue} : item))
  }

  const getFilteredTask = (tasksData: TaskType[], filter: FilterType): TaskType[] => {
    switch (filter) {
      case "active":
        return tasksData.filter((item) => !item.isChecked)
      case "completed":
        return tasksData.filter((item) => item.isChecked)
      default:
        return tasksData
    }
  }
  const filteredTasksData = getFilteredTask(tasksData, filter)

  // Main concept:
  // logic function --> some actions + set function --> logic function throw through the props
  return (
    <div className="App">
      <ToDoList
        tasksData={filteredTasksData}
        title={title}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeStatus={changeStatus}
      />
    </div>
  )
}

export default App;
