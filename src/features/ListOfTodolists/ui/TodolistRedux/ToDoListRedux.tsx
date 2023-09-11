import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import { useDispatch } from 'react-redux'
import { tasksThunk } from 'features/ListOfTodolists/model/tasks-reducer'
import { useCallback } from 'react'
import { AddItemForm } from 'common/components'
import { AppDispatchType, AppTodolistType } from 'common/types/app-types'
import { TaskFilterButtons } from 'features/ListOfTodolists/ui/TodolistRedux/TaskFilterButtons/TaskFilterButtons'
import { TasksList } from 'features/ListOfTodolists/ui/TodolistRedux/Tasks/TasksList'
import { TodoTitle } from 'features/ListOfTodolists/ui/TodolistRedux/TodoTitle/TodoTitle'

type ToDoListProps = {
  todolist: AppTodolistType
}

export const ToDoListRedux = ({ todolist }: ToDoListProps) => {
  const { id, title, filter, entityStatus } = todolist

  const dispatch = useDispatch<AppDispatchType>()

  const addTaskHandler = useCallback((title: string) => {
    dispatch(tasksThunk.addTask({ todolistId: id, title }))
  }, [])

  return (
    <div>
      <div className={style.todolist}>
        <TodoTitle id={id} title={title} entityStatus={entityStatus} />
        <AddItemForm callBack={addTaskHandler} disabled={entityStatus === 'loading'} />
        <TasksList id={id} filter={filter} />
        <div className={style.buttonWrapper}>
          <TaskFilterButtons id={id} filter={filter} />
        </div>
      </div>
    </div>
  )
}
