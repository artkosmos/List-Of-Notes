import {
  addToDoListAC,
  changeToDoListFilterAC,
  removeToDoListAC,
  TodoListReducer,
  updateToDoListTitleAC
} from './todolists-reducer';
import {v1} from 'uuid';
import {FilterType, ToDoListType} from '../App';


test('correct todolist should be removed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ToDoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const endState = TodoListReducer(startState, removeToDoListAC(todolistId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
})

test('correct todolist should be added', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ToDoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]

  const endState = TodoListReducer(startState, addToDoListAC(todolistId2))

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe("What to learn");
})

test('correct todolist filter should be changed', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ToDoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const filter: FilterType = "completed"

  const endState = TodoListReducer(startState, changeToDoListFilterAC(todolistId2, filter))

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe("completed");
  expect(endState.length).toBe(2);
})

test('correct todolist title should be updated', () => {
  let todolistId1 = v1();
  let todolistId2 = v1();

  const startState: ToDoListType[] = [
    {id: todolistId1, title: "What to learn", filter: "all"},
    {id: todolistId2, title: "What to buy", filter: "all"}
  ]
  const newTitle = "What to drink"

  const endState = TodoListReducer(startState, updateToDoListTitleAC(todolistId1, newTitle))

  expect(endState[0].title).toBe("What to drink");
  expect(endState[1].title).toBe("What to buy");
  expect(endState.length).toBe(2);
})