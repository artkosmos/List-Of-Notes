import {
  addTodolistAC,
  AppTodolistType,
  changeToDoListFilterAC, FilterType,
  removeToDoListAC,
  TodoListReducer, updateTodolistTitleAC,
} from './todolists-reducer';
import {v1} from 'uuid';
import {TodolistType} from "../api/todolist-api";

let todolistId1: string
let todolistId2: string
let startStateFromResponse: TodolistType[]
let appState: AppTodolistType[]

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startStateFromResponse = [
    {addedDate: "2023-08-10T16:37:37.267", id: todolistId1, order: 0, title: "What to learn"},
    {addedDate: "2023-08-09T16:37:37.267", id: todolistId2, order: 1, title: "What to buy"},
  ]

  appState = [
    {
      addedDate: "2023-08-10T16:37:37.267",
      entityStatus: "idle",
      filter: "all",
      id: todolistId1,
      order: 0,
      title: "What to learn"
    },
    {
      addedDate: "2023-08-09T16:37:37.267",
      entityStatus: "idle",
      filter: "all",
      id: todolistId2,
      order: 1,
      title: "What to buy"
    },
  ]
})

test('correct todolist should be removed', () => {

  const resultState = TodoListReducer(appState, removeToDoListAC(todolistId1))

  expect(resultState.length).toBe(1);
  expect(resultState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {

  const newTodolistId = v1()

  const newTodo = {
    addedDate: "2023-08-10T16:37:37.267",
    id: newTodolistId,
    order: 0,
    title: "What to drink"
  }

  const resultState = TodoListReducer(appState, addTodolistAC(newTodo))

  expect(resultState.length).toBe(3);
  expect(resultState[0].title).toBe("What to drink");
  expect(resultState[1].title).toBe("What to learn");
})

test('correct todolist filter should be changed', () => {

  const filter: FilterType = "completed"

  const resultState = TodoListReducer(appState, changeToDoListFilterAC(todolistId2, filter))

  expect(resultState[0].filter).toBe("all");
  expect(resultState[1].filter).toBe("completed");
})

test('correct todolist title should be updated', () => {

  const newTitle = "What to drink"

  const resultState = TodoListReducer(appState, updateTodolistTitleAC(todolistId1, newTitle))

  expect(resultState[0].title).toBe("What to drink");
  expect(resultState[1].title).toBe("What to buy");
  expect(resultState.length).toBe(2);
})
