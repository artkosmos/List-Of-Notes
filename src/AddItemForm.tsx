import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import style from "./ToDoList.module.css";

type AddItemFormPropsType = {
  callBack: (todolistID: string, text: string) => void
  todolistID: string
}

export const AddItemForm = (props: AddItemFormPropsType) => {

  const [text, setText] = useState('')
  const [error, setError] = useState<string | null>('')

  const anotherTask = () => {
    if (text.trim()) {
      props.callBack(props.todolistID, text.trim())
      setText('')
    } else {
      setError('Title is required')
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setText(event.currentTarget.value)
  }

  const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      anotherTask()
    }
  }

  return (
    <div>
      <div>
        <input className={error ? style.error : ''}
               value={text}
               onChange={onChangeHandler}
               onKeyDown={onPressHandler}
        />
        <button onClick={anotherTask}>Add</button>
      </div>
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};

