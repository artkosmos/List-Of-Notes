import {Provider} from "react-redux";
import {StateType} from "./store";
import React from "react";
import {combineReducers, legacy_createStore} from "redux";
import {TodoListReducer} from "../reducers/todolists-reducer";
import {TaskReducer} from "../reducers/tasks-reducer";

const rootReducer = combineReducers({
  todolists: TodoListReducer,
  tasks: TaskReducer
})

const initState = {
  todolists: [
    {id: '1', title: 'What to learn', filter: 'all'},
    {id: '2', title: 'What to buy', filter: 'all'}
  ],
  tasks: {
    ['1']: [
      {id: '1', title: "HTML&CSS", isDone: true},
      {id: '2', title: "JS", isDone: true},
      {id: '3', title: "ReactJS", isDone: false},
    ],
    ['2']: [
      {id: '1', title: "Cheese", isDone: true},
      {id: '2', title: "Milk", isDone: false},
      {id: '3', title: "Bread", isDone: false},
    ]
  }
}

export const storyBookStore = legacy_createStore(rootReducer, initState as StateType)

export const ReduxStoreProviderDecorator = (fn:() => React.ReactNode) => {
  return <Provider store={storyBookStore}>{fn()}</Provider>
}