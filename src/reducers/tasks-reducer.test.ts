import { v1 } from 'uuid'
import { tasksAction, tasksReducer, TasksStateType } from './tasks-reducer'
import { TaskStatuses, TaskType, TodolistType } from 'api/todolist-api'
import { todolistsAction } from 'reducers/todolists-reducer'

let todolistID1: string
let todolistID2: string
let taskID_1: string
let taskID_2: string
let taskID_3: string
let taskID_4: string
let taskID_5: string
let taskID_6: string

let startState: TasksStateType

beforeEach(() => {
  todolistID1 = v1()
  todolistID2 = v1()
  taskID_1 = v1()
  taskID_2 = v1()
  taskID_3 = v1()
  taskID_4 = v1()
  taskID_5 = v1()
  taskID_6 = v1()

  startState = {
    [todolistID1]: [
      {
        addedDate: '2023-08-10',
        deadline: 'null',
        description: 'null',
        entityStatus: 'idle',
        id: taskID_1,
        order: -1,
        priority: 1,
        startDate: 'null',
        status: 0,
        title: 'HTML&CSS',
        todoListId: todolistID1,
        completed: false,
      },
      {
        addedDate: '2023-08-10',
        deadline: 'null',
        description: 'null',
        entityStatus: 'idle',
        id: taskID_2,
        order: -2,
        priority: 1,
        startDate: 'null',
        status: 0,
        title: 'JS',
        todoListId: todolistID1,
        completed: false,
      },
      {
        addedDate: '2023-08-10',
        deadline: 'null',
        description: 'null',
        entityStatus: 'idle',
        id: taskID_3,
        order: -3,
        priority: 1,
        startDate: 'null',
        status: 0,
        title: 'ReactJS',
        todoListId: todolistID1,
        completed: false,
      },
    ],
    [todolistID2]: [
      {
        addedDate: '2023-08-10',
        deadline: 'null',
        description: 'null',
        entityStatus: 'idle',
        id: taskID_4,
        order: -1,
        priority: 1,
        startDate: 'null',
        status: 0,
        title: 'Cheese',
        todoListId: todolistID2,
        completed: false,
      },
      {
        addedDate: '2023-08-10',
        deadline: 'null',
        description: 'null',
        entityStatus: 'idle',
        id: taskID_5,
        order: -2,
        priority: 1,
        startDate: 'null',
        status: 0,
        title: 'Milk',
        todoListId: todolistID2,
        completed: false,
      },
      {
        addedDate: '2023-08-10',
        deadline: 'null',
        description: 'null',
        entityStatus: 'idle',
        id: taskID_6,
        order: -3,
        priority: 1,
        startDate: 'null',
        status: 0,
        title: 'Bread',
        todoListId: todolistID2,
        completed: false,
      },
    ],
  }
})

test('correct task should be added', () => {
  const newTask: TaskType = {
    addedDate: '2023-08-10',
    deadline: 'null',
    description: 'null',
    id: '3',
    order: -3,
    priority: 1,
    startDate: 'null',
    status: 0,
    title: 'React',
    todoListId: taskID_6,
    completed: false,
  }

  const resultState = tasksReducer(startState, tasksAction.addTask({ todolistId: todolistID1, task: newTask }))

  expect(resultState[todolistID1].length).toBe(4)
  expect(resultState[todolistID2].length).toBe(3)
  expect(resultState[todolistID1][0].title).toBe('React')
})

test('correct task should be removed', () => {
  const resultState = tasksReducer(startState, tasksAction.removeTask({ todolistId: todolistID2, taskId: taskID_4 }))

  expect(resultState[todolistID1].length).toBe(3)
  expect(resultState[todolistID2].length).toBe(2)
  expect(resultState[todolistID2][0].title).toBe('Milk')
})

test('correct task should be updated', () => {
  const updatedTitle: string = 'Blue Cheese'

  const resultState = tasksReducer(
    startState,
    tasksAction.updateTask({ todolistId: todolistID2, taskId: taskID_4, model: { title: updatedTitle } }),
  )

  expect(resultState[todolistID2][0].title).toBe('Blue Cheese')
  expect(resultState[todolistID2][1].title).toBe('Milk')
})

test('empty tasks should be added with new todolist', () => {
  const newTodolistID = v1()

  const newTodo: TodolistType = {
    addedDate: '2023-08-10',
    id: newTodolistID,
    order: 0,
    title: 'What to learn',
  }

  const resultState = tasksReducer(startState, todolistsAction.addTodolist({ todolist: newTodo }))

  expect(Object.keys(resultState).length).toBe(3)
  expect(resultState[newTodolistID]).toEqual([])
})

test('correct tasks should be deleted with deleted todolist', () => {
  const resultState = tasksReducer(startState, todolistsAction.removeToDoList({ todolistId: todolistID1 }))

  expect(resultState[todolistID1]).toBe(undefined)
  expect(resultState[todolistID2].length).toBe(3)
})

test('correct task status should be changed', () => {
  const status = TaskStatuses.InProgress

  const resultState = tasksReducer(
    startState,
    tasksAction.updateTask({ todolistId: todolistID1, taskId: taskID_2, model: { status } }),
  )

  expect(resultState[todolistID1][1].status).toBe(1)
  expect(resultState[todolistID2][1].status).toBe(0)
})

test('tasks data should be removed after log out', () => {
  const resultState = tasksReducer(startState, todolistsAction.cleanStateData())

  expect(resultState).toEqual({})
})
