import {combineReducers, legacy_createStore} from "redux";
import {TodoListReducer} from "../reducers/todolists-reducer";
import {TaskReducer} from "../reducers/tasks-reducer";

export type StateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todolists: TodoListReducer,
  tasks: TaskReducer
})

export const store = legacy_createStore(rootReducer)