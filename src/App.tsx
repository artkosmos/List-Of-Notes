import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";
import toDoList from "./ToDoList";
import {AddItemForm} from "./AddItemForm";

export type FilterType = 'all' | 'active' | 'completed'
export type ToDoListType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksAssocType = {
  [key: string]: TaskType[]
}

function App() {
  // we store data higher to follow "raise the state" concept
  /*const [tasksData, setTasksData] = useState<TaskType[]>([ // always return array including 2 elements(arr,fnc)
    // v1 sets unique id number
    {id: v1(), title: "HTML&CSS", isChecked: true},
    {id: v1(), title: "JS/TS/ES6", isChecked: true},
    {id: v1(), title: "React", isChecked: false},
    {id: v1(), title: "Angular", isChecked: false}
  ])*/
  // const [filter, setFilter] = useState<FilterType>("all")

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, setTodoLists] = useState<ToDoListType[]>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])
  console.log(todolists)

  let [tasks, setTasks] = useState<TasksAssocType>({
    [todolistID1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]: [
      {id: v1(), title: "Cheese", isDone: true},
      {id: v1(), title: "Milk", isDone: true},
      {id: v1(), title: "Bread", isDone: false},
      {id: v1(), title: "Eggs", isDone: false},
      {id: v1(), title: "Tomatoes", isDone: false},
    ]
  });

  const removeTask = (todolistID: string, taskId: string): void => {
    setTasks(
      {...tasks, [todolistID]: tasks[todolistID].filter((item => item.id !== taskId))}
    )
    /*const updatedTasksData = tasksData.filter((item) => item.id !== taskId)
    setTasksData(updatedTasksData)*/
  }

  const addTask = (todolistID: string, text: string) => {
    const newTask = {id: v1(), title: text, isDone: false}
    setTasks(
      {...tasks, [todolistID]: [newTask, ...tasks[todolistID]]}
    )
    /*const newTasks = [newTask, ...tasksData]
    setTasksData(newTasks)*/
  }

  const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
    setTasks(
      {...tasks, [todolistID]: tasks[todolistID].map(item => item.id === taskID ? {...item, isDone} : item)}
    )
    /*setTasksData(tasksData.map(item => item.id === taskID ? {...item, isChecked: checkedValue} : item))*/
  }

  const changeFilter = (todolistID: string, filter: FilterType) => {
    setTodoLists(todolists.map(item => item.id === todolistID ? {...item, filter} : item))
    // setFilter(filter)
  }

  const removeToDoList = (todolistID: string) => {
    setTodoLists(todolists.filter(item => item.id !== todolistID))
    delete tasks[todolistID]
  }

  const addToDoList = (title: string) => {
    const todolistID = v1()
    const newTodolist: ToDoListType = {id: todolistID, title, filter: 'all'}
    setTodoLists([...todolists, newTodolist])
    setTasks({...tasks, [todolistID]: []})
  }

  // Main concept:
  // logic function --> some actions + set function --> logic function throw through the props
  return (
    <div className="App">
      <AddItemForm callBack={addToDoList}/>

      {todolists.map(item => {

        const getFilteredTask = (tasks: TaskType[], filter: FilterType) => {
          switch (filter) {
            case "active":
              return tasks.filter((item) => !item.isDone)
            case "completed":
              return tasks.filter((item) => item.isDone)
            default:
              return tasks
          }
        }
        const filteredTasksData = getFilteredTask(tasks[item.id], item.filter)

        return (
          <ToDoList
            key={item.id}
            todolistID={item.id}
            tasksData={filteredTasksData}
            title={item.title}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            removeToDoList={removeToDoList}
          />
        )
      })}
    </div>
  )
}

export default App;
