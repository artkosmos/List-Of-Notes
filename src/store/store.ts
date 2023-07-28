import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListReducer} from "../reducers/todolists-reducer";
import {TaskReducer} from "../reducers/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";

export type StateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todolists: TodoListReducer,
  tasks: TaskReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type AppDispatchType = ThunkDispatch<StateType, unknown, AnyAction>