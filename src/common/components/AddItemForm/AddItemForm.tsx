import React, { ChangeEvent, KeyboardEvent, memo, useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export type AddItemFormProps = {
  callBack: (text: string) => void
  disabled?: boolean
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

  const buttonStyles = {
    maxWidth: '40px',
    maxHeight: '40px',
    minWidth: '40px',
    minHeight: '40px',
    marginLeft: '10px',
  }

  return (
    <div>
      <div>
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
        />
        <Button onClick={anotherTask} style={buttonStyles} variant="contained" disabled={props.disabled}>
          Add
        </Button>
      </div>
    </div>
  )
})
