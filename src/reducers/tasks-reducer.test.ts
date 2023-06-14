import {v1} from "uuid";
import {TasksAssocType} from "../App";
import {addTaskAC, removeTaskAC, TaskReducer, updateTaskAC} from "./tasks-reducer";
import {addToDoListAC} from "./todolists-reducer";

const todolistID1 = v1()
const todolistID2 = v1()
const taskID_1 = v1()
const taskID_2 = v1()
const taskID_3 = v1()
const taskID_4 = v1()

const startState: TasksAssocType = {
  [todolistID1]: [
    {id: taskID_1, title: "HTML&CSS", isDone: true},
    {id: taskID_2, title: "JS", isDone: true}
  ],
  [todolistID2]: [
    {id: taskID_3, title: "Cheese", isDone: true},
    {id: taskID_4, title: "Milk", isDone: true}
  ]
}

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

  const resultState = TaskReducer(startState, updateTaskAC(todolistID2, taskID_3, updatedTitle))

  expect(resultState[todolistID2][0].title).toBe('Blue Cheese')
  expect(resultState[todolistID2][1].title).toBe('Milk')
})

test('correct task should be added with new todolist', () => {

  const newTodolistID: string = v1()
  const title: string = 'something'

  const resultState = TaskReducer(startState, addToDoListAC(title, newTodolistID))

  expect(resultState[newTodolistID].length).toBe(0)
})