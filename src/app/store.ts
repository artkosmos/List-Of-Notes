import { appReducer } from 'app/app-reducer'
import { authReducer } from 'features/Login/model/auth-reducer'
import { configureStore } from '@reduxjs/toolkit'
import { todolistsReducer } from 'features/ListOfTodolists/model/todolists-reducer'
import { tasksReducer } from 'features/ListOfTodolists/model/tasks-reducer'

export type StateType = ReturnType<typeof store.getState>

export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})

// @ts-ignore
window.store = store
