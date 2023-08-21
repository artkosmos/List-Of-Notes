import { Provider } from "react-redux"
import { StateType } from "./store"
import React from "react"
import { combineReducers, legacy_createStore } from "redux"
import { TodoListReducer } from "../reducers/todolists-reducer"
import { TaskReducer } from "../reducers/tasks-reducer"

const rootReducer = combineReducers({
  todolists: TodoListReducer,
  tasks: TaskReducer,
})

const initState: StateType = {
  todolists: [
    {
      addedDate: "2023-08-10T16:37:37.267",
      entityStatus: "idle",
      filter: "all",
      id: "1",
      order: -3,
      title: "What to learn",
    },
    {
      addedDate: "2023-08-09T16:37:37.267",
      entityStatus: "idle",
      filter: "all",
      id: "2",
      order: -2,
      title: "What to buy",
    },
  ],
  tasks: {
    ["1"]: [
      {
        addedDate: "2023-08-10T16:37:43.33",
        deadline: "null",
        description: "null",
        entityStatus: "idle",
        id: "1",
        order: -1,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "HTML&CSS",
        todoListId: "1",
        completed: false,
      },
      {
        addedDate: "2023-08-10T16:37:43.33",
        deadline: "null",
        description: "null",
        entityStatus: "idle",
        id: "2",
        order: -2,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "JS",
        todoListId: "1",
        completed: false,
      },
      {
        addedDate: "2023-08-10T16:37:43.33",
        deadline: "null",
        description: "null",
        entityStatus: "idle",
        id: "3",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "ReactJS",
        todoListId: "1",
        completed: false,
      },
    ],
    ["2"]: [
      {
        addedDate: "2023-08-10T16:37:43.33",
        deadline: "null",
        description: "null",
        entityStatus: "idle",
        id: "1",
        order: -1,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "Cheese",
        todoListId: "2",
        completed: false,
      },
      {
        addedDate: "2023-08-10T16:37:43.33",
        deadline: "null",
        description: "null",
        entityStatus: "idle",
        id: "2",
        order: -2,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "Milk",
        todoListId: "2",
        completed: false,
      },
      {
        addedDate: "2023-08-10T16:37:43.33",
        deadline: "null",
        description: "null",
        entityStatus: "idle",
        id: "3",
        order: -3,
        priority: 1,
        startDate: "null",
        status: 0,
        title: "Bread",
        todoListId: "2",
        completed: false,
      },
    ],
  },
  app: {
    error: null,
    status: "loading",
    isInitialized: false,
  },
  auth: {
    isLogin: false,
    authUserLogin: null,
  },
}

export const storyBookStore = legacy_createStore(
  rootReducer,
  initState as StateType,
)

export const ReduxStoreProviderDecorator = (fn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{fn()}</Provider>
}
