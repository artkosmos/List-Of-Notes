import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { Navigate } from 'react-router-dom'
import { useLogin } from 'features/Login/lib/useLogin'
import style from 'features/Login/ui/Login.module.css'

export const Login = () => {
  const { formik, isLogIn } = useLogin()

  if (isLogIn) {
    return <Navigate to={'/'} />
  }

  const paperStyles = {
    padding: '50px 30px',
    backgroundColor: '#d9e4f5',
    height: 'max-content',
    borderRadius: '15px',
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <Paper elevation={18} sx={paperStyles}>
          <FormControl>
            <p className={style.title}>Log In</p>
            <form onSubmit={formik.handleSubmit}>
              <FormGroup>
                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                {formik.touched.email && formik.errors.email ? (
                  <div className={style.error}>{formik.errors.email}</div>
                ) : null}
                <TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
                {formik.touched.email && formik.errors.password ? (
                  <div className={style.error}>{formik.errors.password}</div>
                ) : null}
                <div className={style.password}>
                  Password must contain capital and usual letters, symbols and be more than 8 characters
                </div>
                <FormControlLabel
                  label={'Remember me'}
                  control={<Checkbox />}
                  checked={formik.values.rememberMe}
                  {...formik.getFieldProps('rememberMe')}
                />
                <Button type={'submit'} variant={'contained'} color={'primary'}>
                  Login
                </Button>
              </FormGroup>
            </form>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  )
}
