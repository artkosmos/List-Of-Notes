import React, { ChangeEvent, memo, useState } from 'react'

type SpanPropsType = {
  oldTitle: string
  callBack: (updatedTitle: string) => void
  disabled?: boolean
}

export const EditableSpan = memo((props: SpanPropsType) => {
  const [edit, setEdit] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState(props.oldTitle)

  const editHandler = () => {
    if (!props.disabled) {
      setEdit(!edit)
      if (edit) {
        addTaskHandler()
      }
    }
  }

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdatedTitle(event.currentTarget.value)
  }

  const addTaskHandler = () => {
    props.callBack(updatedTitle)
  }

  return edit ? (
    <input onChange={onChangeHandler} onBlur={editHandler} value={updatedTitle} autoFocus />
  ) : (
    <span onDoubleClick={editHandler}>{updatedTitle}</span>
  )
})
