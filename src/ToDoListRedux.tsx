import {FilterType} from "./AppRedux";
import style from './ToDoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./store/store";
import {TodolistType} from "./AppRedux";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskTitleAC} from "./reducers/tasks-reducer";
import {changeToDoListFilterAC, removeToDoListAC, updateToDoListTitleAC} from "./reducers/todolists-reducer";

type ToDoListPropsType = {
  todolist: TodolistType
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

const ToDoListRedux = ({todolist}: ToDoListPropsType) => {

  const {id, title, filter} = todolist


  const tasks = useSelector<StateType, TaskType[]>(state => state.tasks[id])

  const dispatch = useDispatch()

  const getFilteredTask = (tasks: TaskType[], filter: FilterType) => {
    switch (filter) {
      case "active":
        return tasks.filter((item) => !item.isDone)
      case "completed":
        return tasks.filter((item) => item.isDone)
      default:
        return tasks
    }
  }
  const filteredTasksData = getFilteredTask(tasks, filter)

  const onClickHandlerAll = () => {
    dispatch(changeToDoListFilterAC(id, "all"))
  }

  const onClickHandlerActive = () => {
    dispatch(changeToDoListFilterAC(id, "active"))
  }

  const onClickHandlerCompleted = () => {
    dispatch(changeToDoListFilterAC(id, "completed"))
  }

  const onChangeStatusHandler = (taskID: string, eventValue: boolean) => {
    dispatch(changeTaskStatusAC(id, taskID, eventValue))
  }

  const removeToDoListHandler = () => {
    dispatch(removeToDoListAC(id))
  }

  const onClickRemoveHandler = (taskID: string) => {
    dispatch(removeTaskAC(id, taskID))
  }

  const addTaskHandler = (text: string) => {
    dispatch(addTaskAC(id, text))
  }

  const updateTaskTitle = (taskID: string, updatedTitle: string) => {
    dispatch(updateTaskTitleAC(id, taskID, updatedTitle))
  }

  const updateToDoListTitle = (updatedTitle: string) => {
    dispatch(updateToDoListTitleAC(id, updatedTitle))
  }

  const tasksJSX: JSX.Element[] = filteredTasksData.map((item) => {

    return (
      // key need to add always or might be error
      <li key={item.id} className={item.isDone ? style.isDone : ''}>
        <Checkbox
          onChange={(event) => onChangeStatusHandler(item.id, event.currentTarget.checked)}
          checked={item.isDone}
          size={'small'}
        />
        <EditableSpan oldTitle={item.title} callBack={(updatedTitle) => updateTaskTitle(item.id, updatedTitle)}/>
        <IconButton aria-label="delete" size={'small'} onClick={() => onClickRemoveHandler(item.id)}>
          <DeleteIcon fontSize={'small'} />
        </IconButton>
      </li>
    )
  })

  // render
  return (
    <div>
      <div className={style.todolist}>
        <IconButton aria-label="delete" onClick={removeToDoListHandler} className={style.delete}>
          <DeleteIcon />
          <span className={style.deleteText}>Delete list</span>
        </IconButton>
        <h2><EditableSpan oldTitle={title} callBack={updateToDoListTitle}/></h2>
        <AddItemForm callBack={addTaskHandler}/>
        <ul className={style.list}>
          {tasksJSX}
        </ul>
        <div className={style.buttonWrapper}>
          <Button
            variant={filter === 'all' ? "outlined" : "contained"}
            color="secondary"
            onClick={onClickHandlerAll}
            style={{height: '30px'}}
          >All
          </Button>
          <Button
            variant={filter === 'active' ? "outlined" : "contained"}
            color="success"
            onClick={onClickHandlerActive}
            style={{height: '30px'}}
          >Active
          </Button>
          <Button
            variant={filter === 'completed' ? "outlined" : "contained"}
            color="error"
            onClick={onClickHandlerCompleted}
            style={{height: '30px'}}
          >Completed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToDoListRedux;