import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import style from 'features/ListOfTodolists/ui/TodolistRedux/ToDoList.module.css'
import styled from "@emotion/styled";

export type AddItemFormProps = {
  callBack: (text: string) => void
  disabled?: boolean
  fieldColor?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  textColor?: string
}

export const AddItemForm = memo((props: AddItemFormProps) => {
  const [text, setText] = useState('')
  const [error, setError] = useState<boolean>(false)

  const anotherTask = () => {
    if (text.trim()) {
      props.callBack(text.trim())
      setText('')
    } else {
      setError(true)
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(false)
    setText(event.currentTarget.value)
  }

  const onPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      anotherTask()
    }
  }

  return (
    <div className={style.addForm}>
      <TextField
        error={error}
        size={'small'}
        id="outlined-basic"
        label={error ? 'Title is required' : 'Write something...'}
        variant="outlined"
        value={text}
        onChange={onChangeHandler}
        onKeyDown={onPressHandler}
        disabled={props.disabled}
        color={props.fieldColor || 'primary'}
        sx={{
          '& .MuiInputBase-input': {
            color: `${props.textColor}`,
          },
        }}
      />
      <StyledButton onClick={anotherTask} variant="contained" disabled={props.disabled}>
        Add
      </StyledButton>
    </div>
  )
})


const StyledButton = styled(Button)`
  max-width: 40px;
  max-height: 40px;
  min-width: 40px;
  min-height: 40px;
`