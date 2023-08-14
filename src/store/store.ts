import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {TodoListReducer} from "../reducers/todolists-reducer";
import {TaskReducer} from "../reducers/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {appReducer} from "../reducers/app-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "../reducers/auth-reducer";

export type StateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todolists: TodoListReducer,
  tasks: TaskReducer,
  app: appReducer,
  auth: authReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

// @ts-ignore
window.store = store

export type AppDispatchType = ThunkDispatch<StateType, unknown, AnyAction>
export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector