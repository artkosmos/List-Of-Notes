import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import { ButtonMemo } from 'common/components'
import { useCallback } from 'react'
import { todolistsAction } from 'features/ListOfTodolists/model/todolists-reducer'
import { AppDispatchType, FilterType } from 'common/types/app-types'
import { useDispatch } from 'react-redux'

type TaskFilterButtonsProps = {
  id: string
  filter: FilterType
}

export const TaskFilterButtons = ({ id, filter }: TaskFilterButtonsProps) => {
  const dispatch = useDispatch<AppDispatchType>()

  const setFilterHandler = useCallback((filter: FilterType) => {
    dispatch(todolistsAction.changeToDoListFilter({ todolistId: id, filter }))
  }, [])

  return (
    <>
      <div className={style.buttonWrapper}>
        <ButtonMemo
          variant={filter === 'all' ? 'outlined' : 'contained'}
          color={'warning'}
          onClick={() => setFilterHandler('all')}
        >
          All
        </ButtonMemo>
        <ButtonMemo
          variant={filter === 'active' ? 'outlined' : 'contained'}
          color={'success'}
          onClick={() => setFilterHandler('active')}
        >
          Active
        </ButtonMemo>
        <ButtonMemo
          variant={filter === 'completed' ? 'outlined' : 'contained'}
          color={'error'}
          onClick={() => setFilterHandler('completed')}
        >
          Completed
        </ButtonMemo>
      </div>
    </>
  )
}
