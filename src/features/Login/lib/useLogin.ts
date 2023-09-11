import { useDispatch } from 'react-redux'
import { AppDispatchType } from 'common/types/app-types'
import { useFormik } from 'formik'
import { authThunk } from 'features/Login/model/auth-reducer'
import { ValidateFieldType } from 'common/types/api_types'
import { useAppSelector } from 'common/utils'
import { isLoginSelector } from 'app/app-selectors'

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatchType>()
  const isLogIn = useAppSelector(isLoginSelector)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: (values) => {
      dispatch(authThunk.logIn(values))
      formik.resetForm()
    },

    validate: (values) => {
      const errors: ValidateFieldType = {}
      const checkEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
      const checkPassword = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*[\s.,;:!])[a-zA-Z0-9@#$%^&*]{8,}$/i

      if (!values.email) {
        errors.email = 'Enter email'
      } else if (!checkEmail.test(values.email)) {
        errors.email = 'Invalid email address'
      }

      if (!values.password) {
        errors.password = 'Enter password'
      } else if (!checkPassword.test(values.password)) {
        errors.password = 'Invalid password'
      }
      return errors
    },
  })

  return { formik, isLogIn }
}
