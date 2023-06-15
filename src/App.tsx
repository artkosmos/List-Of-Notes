import React, {useReducer, useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Paper from '@mui/material/Paper';
import {
  addToDoListAC,
  changeToDoListFilterAC,
  removeToDoListAC,
  TodoListReducer,
  updateToDoListTitleAC
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, TaskReducer, updateTaskAC} from "./reducers/tasks-reducer";

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

  // let [todolists, setTodoLists] = useState<ToDoListType[]>([
  //   {id: todolistID1, title: 'What to learn', filter: 'all'},
  //   {id: todolistID2, title: 'What to buy', filter: 'all'},
  // ])

  // let [tasks, setTasks] = useState<TasksAssocType>({
  //   [todolistID1]: [
  //     {id: v1(), title: "HTML&CSS", isDone: true},
  //     {id: v1(), title: "JS", isDone: true},
  //     {id: v1(), title: "ReactJS", isDone: false},
  //     {id: v1(), title: "Rest API", isDone: false},
  //     {id: v1(), title: "GraphQL", isDone: false},
  //   ],
  //   [todolistID2]: [
  //     {id: v1(), title: "Cheese", isDone: true},
  //     {id: v1(), title: "Milk", isDone: true},
  //     {id: v1(), title: "Bread", isDone: false},
  //     {id: v1(), title: "Eggs", isDone: false},
  //     {id: v1(), title: "Tomatoes", isDone: false},
  //   ]
  // });

  let [todolists, dispatchTodolists] = useReducer(TodoListReducer, [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, dispatchTasks] = useReducer(TaskReducer, {
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

  const updateTask = (todolistID: string, taskID: string, updatedTitle: string) => {
    // setTasks({
    //   ...tasks,
    //   [todolistID]: tasks[todolistID].map(element => element.id === taskID ? {
    //     ...element,
    //     title: updatedTitle
    //   } : element)
    // })
    dispatchTasks(updateTaskAC(todolistID, taskID, updatedTitle))
  }

  const updateToDoList = (todolistID: string, updatedTitle: string) => {
    // setTodoLists(todolists.map(element => element.id === todolistID ? {...element, title: updatedTitle} : element))
    dispatchTodolists(updateToDoListTitleAC(todolistID, updatedTitle))
  }

  const removeTask = (todolistID: string, taskId: string): void => {
    // setTasks(
    //   {...tasks, [todolistID]: tasks[todolistID].filter((item => item.id !== taskId))}
    // )
    dispatchTasks(removeTaskAC(todolistID, taskId))
  }

  const addTask = (todolistID: string, text: string) => {
    // const newTask = {id: v1(), title: text, isDone: false}
    // setTasks(
    //   {...tasks, [todolistID]: [newTask, ...tasks[todolistID]]}
    // )
    dispatchTasks(addTaskAC(todolistID, text))
  }

  const changeStatus = (todolistID: string, taskID: string, isDone: boolean) => {
    // setTasks(
    //   {...tasks, [todolistID]: tasks[todolistID].map(item => item.id === taskID ? {...item, isDone} : item)}
    // )
    dispatchTasks(changeTaskStatusAC(todolistID, taskID, isDone))
  }

  const changeFilter = (todolistID: string, filter: FilterType) => {
    // setTodoLists(todolists.map(item => item.id === todolistID ? {...item, filter} : item))
    // setFilter(filter)
    dispatchTodolists(changeToDoListFilterAC(todolistID, filter))
  }

  const removeToDoList = (todolistID: string) => {
    // setTodoLists(todolists.filter(item => item.id !== todolistID))
    dispatchTodolists(removeToDoListAC(todolistID))
    // delete tasks[todolistID]
    dispatchTasks(removeToDoListAC(todolistID))
  }

  const addToDoList = (title: string) => {
    const action = addToDoListAC(title, v1())
    // const newTodolist: ToDoListType = {id: todolistID, title, filter: 'all'}
    // setTodoLists([...todolists, newTodolist])
    dispatchTodolists(action)
    // setTasks({...tasks, [todolistID]: []})
    dispatchTasks(action)
  }

  // Main concept:
  // logic function --> some actions + set function --> logic function throw through the props
  return (
    <div className="App">
      <ButtonAppBar/>
      <div className={'contentWrapper'}>
        <AddItemForm callBack={addToDoList}/>

        <div className={'listsWrapper'}>
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
              <Paper elevation={12} style={{padding: '20px', backgroundColor: '#ececdc'}}>
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
                  updateTask={updateTask}
                  updateToDoList={updateToDoList}
                />
              </Paper>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default App;
