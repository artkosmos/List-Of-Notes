import {v1} from "uuid";
import {TasksAssocType} from "../App";
import {addTaskAC, removeTaskAC, TaskReducer} from "./tasks-reducer";

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

  const text = 'React'

  const endState = TaskReducer(startState, addTaskAC(todolistID1, text))

  expect(endState[todolistID1].length).toBe(3)
  expect(endState[todolistID2].length).toBe(2)
  expect(endState[todolistID1][0].title).toBe('React')
})

test('correct task should be removed', () => {

  const endState = TaskReducer(startState, removeTaskAC(todolistID2, taskID_3))

  expect(endState[todolistID1].length).toBe(2)
  expect(endState[todolistID2].length).toBe(1)
  expect(endState[todolistID2][0].title).toBe('Milk')
})