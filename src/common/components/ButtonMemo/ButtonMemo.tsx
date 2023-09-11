import React, { memo } from 'react'
import Button from '@mui/material/Button'

type ButtonMemoProps = {
  variant: 'text' | 'outlined' | 'contained'
  color: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  onClick: () => void
  children: React.ReactNode
}

export const ButtonMemo = memo((props: ButtonMemoProps) => {
  return (
    <Button variant={props.variant} color={props.color} onClick={props.onClick} style={{ height: '30px' }}>
      {props.children}
    </Button>
  )
})
