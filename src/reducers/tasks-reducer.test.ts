import {v1} from "uuid";
import {TasksStateType} from "../AppReducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, TaskReducer, updateTaskTitleAC} from "./tasks-reducer";
import {addToDoListAC, removeToDoListAC} from "./todolists-reducer";

let todolistID1: string
let todolistID2: string
let taskID_1: string
let taskID_2: string
let taskID_3: string
let taskID_4: string

let startState: TasksStateType

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()
  taskID_1 = v1()
  taskID_2 = v1()
  taskID_3 = v1()
  taskID_4 = v1()

  startState = {
    [todolistID1]: [
      {id: taskID_1, title: "HTML&CSS", isDone: true},
      {id: taskID_2, title: "JS", isDone: true}
    ],
    [todolistID2]: [
      {id: taskID_3, title: "Cheese", isDone: true},
      {id: taskID_4, title: "Milk", isDone: true}
    ]
  }
})

test('correct task should be added', () => {

  const text: string = 'React'

  const resultState = TaskReducer(startState, addTaskAC(todolistID1, text))

  expect(resultState[todolistID1].length).toBe(3)
  expect(resultState[todolistID2].length).toBe(2)
  expect(resultState[todolistID1][0].title).toBe('React')
})

test('correct task should be removed', () => {

  const resultState = TaskReducer(startState, removeTaskAC(todolistID2, taskID_3))

  expect(resultState[todolistID1].length).toBe(2)
  expect(resultState[todolistID2].length).toBe(1)
  expect(resultState[todolistID2][0].title).toBe('Milk')
})

test('correct task should be updated', () => {

  const updatedTitle: string = 'Blue Cheese'

  const resultState = TaskReducer(startState, updateTaskTitleAC(todolistID2, taskID_3, updatedTitle))

  expect(resultState[todolistID2][0].title).toBe('Blue Cheese')
  expect(resultState[todolistID2][1].title).toBe('Milk')
})

test('empty tasks should be added with new todolist', () => {

  const newTodolistID: string = v1()
  const title: string = 'something'

  const resultState = TaskReducer(startState, addToDoListAC(title, newTodolistID))
  // title don't use in this test

  expect(Object.keys(resultState).length).toBe(3)
  expect(resultState[newTodolistID]).toEqual([])
})

test('correct tasks should be deleted with deleted todolist', () => {

  const resultState = TaskReducer(startState, removeToDoListAC(todolistID1))

  expect(resultState[todolistID1]).toBe(undefined)
  expect(resultState[todolistID2].length).toBe(2)
  expect(Object.keys(resultState).length).toBe(1)
})

test('correct task status should be changed', () => {

  const isDone = false

  const resultState = TaskReducer(startState, changeTaskStatusAC(todolistID1, taskID_2, isDone))

  expect(resultState[todolistID1][1].isDone).toBe(false)
  expect(resultState[todolistID2][1].isDone).toBe(true)
})