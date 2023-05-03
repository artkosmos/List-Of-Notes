import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

export type FilterType = 'all' | 'active' | 'completed'

function App() {
  // we store data higher to follow "raise the state" concept
  const title: string = "What to learn?"
  const [tasksData, setTasksData] = useState<TaskType[]>([ // always return array including 2 elements(arr,fnc)
    {id: 1, title: "HTML&CSS", isChecked: true},
    {id: 2, title: "JS/TS/ES6", isChecked: true},
    {id: 3, title: "React", isChecked: false},
    {id: 4, title: "Angular", isChecked: false}
  ])
  const [filter, setFilter] = useState<FilterType>("all")

  const changeFilter = (filter: FilterType) => {
    setFilter(filter)
  }

  const removeTask = (taskId: number): void => {
    const updatedTasksData = tasksData.filter((item) => item.id !== taskId)
    setTasksData(updatedTasksData)
    // return updated tasks array without removed(x) value in main state
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

  return (
    <div className="App">
      <ToDoList
        tasksData={filteredTasksData}
        title={title}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  )
}

export default App;
