import { authReducer, AuthReducerState, authThunk } from 'features/Login/model/auth-reducer'

let authState: AuthReducerState

test('should update state when authorization is successful', () => {
  authState = {
    isAuth: false,
    authUserLogin: null,
  }

  const userLogin = 'jack-27'

  const resultState = authReducer(authState, authThunk.checkIsAuth.fulfilled({ userLogin }, 'requiredId', {}))

  expect(resultState.isAuth).toBeTruthy()
  expect(resultState.authUserLogin).toBe(userLogin)
})

test('should update state correctly when log out', () => {
  authState = {
    isAuth: true,
    authUserLogin: 'jonny-654',
  }

  const noUserLogin = null

  const resultState = authReducer(authState, authThunk.logOut.fulfilled({ userLogin: noUserLogin }, 'requiredId', {}))

  expect(resultState.authUserLogin).toBeNull()
  expect(resultState.isAuth).toBeFalsy()
})
