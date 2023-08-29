import type { Meta, StoryObj } from '@storybook/react'
import { AddItemForm, AddItemFormPropsType } from 'common/components/AddItemForm/AddItemForm'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { action } from '@storybook/addon-actions'

const meta: Meta = {
  title: 'TODOLIST/AddItemForm',
  component: AddItemForm,
  tags: ['autodocs'],
  argTypes: {
    callBack: {
      description: 'callback function on click ADD',
      action: 'send string in callback',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const AddItemFormStory: Story = {
  args: {},
}

const Component = (props: AddItemFormPropsType) => {
  const [text1, setText1] = useState('')
  const [error1, setError1] = useState<boolean>(true)

  const anotherTask = () => {
    if (text1.trim()) {
      props.callBack(text1.trim())
      setText1('')
    } else {
      setError1(true)
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError1(false)
    setText1(event.currentTarget.value)
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
          error={error1}
          size={'small'}
          id="outlined-basic"
          label={error1 ? 'Title is required' : 'Write something...'}
          variant="outlined"
          value={text1}
          onChange={onChangeHandler}
          onKeyDown={onPressHandler}
        />
        <Button onClick={anotherTask} style={buttonStyles} variant="contained">
          Add
        </Button>
      </div>
    </div>
  )
}

export const AddItemFormErrorStory: Story = {
  render: (args) => {
    return <Component callBack={action('send string in callback')} />
  },
}
