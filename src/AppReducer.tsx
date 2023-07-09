import {Reducer, useCallback, useReducer} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import ButtonAppBar from "./ButtonAppBar";
import Paper from '@mui/material/Paper';
import {
  addToDoListAC,
  changeToDoListFilterAC, ActionsTodolistsType,
  removeToDoListAC,
  TodoListReducer,
  updateToDoListTitleAC
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, TaskReducer, updateTaskTitleAC} from "./reducers/tasks-reducer";

export type FilterType = 'all' | 'active' | 'completed'
export type ToDoListType = {
  id: string
  title: string
  filter: FilterType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}

function AppReducer() {
  // we store data higher to follow "raise the state" concept

  let todolistID1 = v1();
  let todolistID2 = v1();

  let [todolists, dispatchTodolists] = useReducer<Reducer<ToDoListType[], ActionsTodolistsType>>(TodoListReducer, [
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

  const updateTask = useCallback((todolistID: string, taskID: string, updatedTitle: string) => {
    dispatchTasks(updateTaskTitleAC(todolistID, taskID, updatedTitle))
  }, [])

  const removeTask = useCallback((todolistID: string, taskId: string): void => {
    dispatchTasks(removeTaskAC(todolistID, taskId))
  }, [])

  const addTask = useCallback((todolistID: string, text: string) => {
    dispatchTasks(addTaskAC(todolistID, text))
  }, [])

  const changeStatus = useCallback((todolistID: string, taskID: string, isDone: boolean) => {
    dispatchTasks(changeTaskStatusAC(todolistID, taskID, isDone))
  }, [])

  const changeFilter = useCallback((todolistID: string, filter: FilterType) => {
    dispatchTodolists(changeToDoListFilterAC(todolistID, filter))
  }, [])

  const removeToDoList = useCallback((todolistID: string) => {
    dispatchTodolists(removeToDoListAC(todolistID))
    dispatchTasks(removeToDoListAC(todolistID))
  }, [])

  const addToDoList = useCallback((title: string) => {
    const action = addToDoListAC(title, v1())
    dispatchTodolists(action)
    dispatchTasks(action)
  }, [])

  const updateToDoList = useCallback((todolistID: string, updatedTitle: string) => {
    dispatchTodolists(updateToDoListTitleAC(todolistID, updatedTitle))
  }, [])

  return (
    <div className="App">
      <ButtonAppBar/>
      <div className={'contentWrapper'}>
        <AddItemForm callBack={addToDoList}/>

        <div className={'listsWrapper'}>
          {todolists.map(item => {

            return (
              <Paper key={item.id} elevation={12} style={{padding: '15px', backgroundColor: '#ececdc'}}>
                <ToDoList
                  key={item.id}
                  todolistID={item.id}
                  tasksData={tasks[item.id]}
                  title={item.title}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeStatus={changeStatus}
                  removeToDoList={removeToDoList}
                  updateTask={updateTask}
                  updateToDoList={updateToDoList}
                  filter={item.filter}
                />
              </Paper>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AppReducer;
