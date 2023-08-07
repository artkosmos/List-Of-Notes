/*
import {
  addToDoListAC,
  changeToDoListFilterAC,
  removeToDoListAC,
  TodoListReducer,
  updateToDoListTitleAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterType, ToDoListType} from '../AppReducer';

let todolistId1: string
let todolistId2: string
let startState: ToDoListType[]

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();

  startState = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
})

test('correct todolist should be removed', () => {

  const resultState = TodoListReducer(startState, removeToDoListAC(todolistId1))

  expect(resultState.length).toBe(1);
  expect(resultState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {

  const title = "What to read"

  const resultState = TodoListReducer(startState, addToDoListAC(title, v1()))

  expect(resultState.length).toBe(3);
  expect(resultState[0].title).toBe("What to learn");
  expect(resultState[2].title).toBe("What to read");
})

test('correct todolist filter should be changed', () => {

  const filter: FilterType = "completed"

  const resultState = TodoListReducer(startState, changeToDoListFilterAC(todolistId2, filter))

  expect(resultState[0].filter).toBe("all");
  expect(resultState[1].filter).toBe("completed");
  expect(resultState.length).toBe(2);
})

test('correct todolist title should be updated', () => {

  const newTitle = "What to drink"

  const resultState = TodoListReducer(startState, updateToDoListTitleAC(todolistId1, newTitle))

  expect(resultState[0].title).toBe("What to drink");
  expect(resultState[1].title).toBe("What to buy");
  expect(resultState.length).toBe(2);
})*/
