import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import style from 'features/Login/Login.module.css'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from 'common/utils'
import { AppDispatchType } from 'common/types/app-types'
import { authThunk } from 'features/Login/auth-reducer'

type ValidateFieldType = {
  email?: string
  password?: string
}

export const Login = () => {
  const isLogIn = useAppSelector<boolean>((state) => state.auth.isAuth)
  const dispatch = useDispatch<AppDispatchType>()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values) => {
      formik.resetForm()
      dispatch(authThunk.logIn(values))
    },
    validate: (values) => {
      const errors: ValidateFieldType = {}
      const checkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      const checkPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*[\s.,;:!])[a-zA-Z0-9@#$%^&*]{8,}$/i

      if (!values.email) {
        errors.email = 'Required'
      } else if (!checkEmail.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (!checkPassword.test(values.password)) {
        errors.password = 'Invalid password'
      }

      return errors
    },
  })

  if (isLogIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid container justifyContent={'center'}>
      <Grid item justifyContent={'center'}>
        <FormControl>
          <FormLabel>
            <p>
              To log in get registered
              <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                {' '}
                here
              </a>
            </p>
            <p>or use common test account credentials:</p>
            <p>Email: free@samuraijs.com</p>
            <p>Password: free</p>
          </FormLabel>
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
      </Grid>
    </Grid>
  )
}
