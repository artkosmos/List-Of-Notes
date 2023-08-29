import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useDispatch } from 'react-redux'
import { AppDispatchType, useAppSelector } from 'app/store'
import { logOutTC } from 'features/Login/auth-reducer'
import { authLoginSelector, isLoginSelector } from 'app/app-selectors'

export function ButtonAppBar() {
  const dispatch = useDispatch<AppDispatchType>()

  const authUserLogin = useAppSelector(authLoginSelector)

  const isLogIn = useAppSelector(isLoginSelector)

  const logOutHandler = () => {
    dispatch(logOutTC())
  }

  const loginToShow = authUserLogin ? authUserLogin : ''

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '30px' }}>
            {loginToShow}
          </Typography>
          <Button onClick={logOutHandler} color="inherit">
            {isLogIn ? 'Log Out' : ''}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
