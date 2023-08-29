import { todolistsAction, todolistsReducer, todolistsThunk } from 'features/ListOfTodolists/todolists-reducer'
import { v1 } from 'uuid'
import { TodolistType } from 'common/types/api_types'
import { AppTodolistType, FilterType } from 'common/types/app-types'

let todolistId1: string
let todolistId2: string
let startStateFromResponse: TodolistType[]
let appState: AppTodolistType[]

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startStateFromResponse = [
    {
      addedDate: '2023-08-10T16:37:37.267',
      id: todolistId1,
      order: 0,
      title: 'What to learn',
    },
    {
      addedDate: '2023-08-09T16:37:37.267',
      id: todolistId2,
      order: 1,
      title: 'What to buy',
    },
  ]

  appState = [
    {
      addedDate: '2023-08-10T16:37:37.267',
      entityStatus: 'idle',
      filter: 'all',
      id: todolistId1,
      order: 0,
      title: 'What to learn',
    },
    {
      addedDate: '2023-08-09T16:37:37.267',
      entityStatus: 'idle',
      filter: 'all',
      id: todolistId2,
      order: 1,
      title: 'What to buy',
    },
  ]
})

test('correct todolist should be removed', () => {
  const resultState = todolistsReducer(
    appState,
    todolistsThunk.deleteTodolist.fulfilled({ todolistId: todolistId1 }, 'requestId', todolistId1),
  )

  expect(resultState.length).toBe(1)
  expect(resultState[0].id).toBe(todolistId2)
})

test('correct todolist should be added', () => {
  const newTodolistId = v1()

  const newTodo = {
    addedDate: '2023-08-10T16:37:37.267',
    id: newTodolistId,
    order: 0,
    title: 'What to drink',
  }

  const resultState = todolistsReducer(
    appState,
    todolistsThunk.addTodolist.fulfilled({ todolist: newTodo }, 'requestId', newTodo.title),
  )

  expect(resultState.length).toBe(3)
  expect(resultState[0].title).toBe('What to drink')
  expect(resultState[1].title).toBe('What to learn')
})

test('correct todolist filter should be changed', () => {
  const filter: FilterType = 'completed'

  const resultState = todolistsReducer(
    appState,
    todolistsAction.changeToDoListFilter({ todolistId: todolistId2, filter }),
  )

  expect(resultState[0].filter).toBe('all')
  expect(resultState[1].filter).toBe('completed')
})

test('correct todolist title should be updated', () => {
  const title = 'What to drink'

  const resultState = todolistsReducer(
    appState,
    todolistsThunk.updateTodoTitle.fulfilled({ todolistId: todolistId1, title }, 'requestId', {
      todolistId: todolistId1,
      title,
    }),
  )

  expect(resultState[0].title).toBe('What to drink')
  expect(resultState[1].title).toBe('What to buy')
  expect(resultState.length).toBe(2)
})
