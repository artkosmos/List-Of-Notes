import { authAction, authReducer, AuthReducerState } from 'features/Login/auth-reducer'

let authState: AuthReducerState

beforeEach(() => {
  authState = {
    isLogin: false,
    authUserLogin: null,
  }
})

test('should update the status correctly', () => {
  const isLogin = true

  const resultState = authReducer(authState, authAction.setIsLoggedIn({ isLogin }))

  expect(resultState.isLogin).toBeTruthy()
  expect(resultState.authUserLogin).toBeNull()
})

test('should update the status of initialization', () => {
  const userLogin = 'jack-27'
  const noUserLogin = null

  const resultState1 = authReducer(authState, authAction.setAuthUser({ userLogin }))
  const resultState2 = authReducer(authState, authAction.setAuthUser({ userLogin: noUserLogin }))

  expect(resultState1.authUserLogin).toBe(userLogin)
  expect(resultState2.authUserLogin).toBeNull()
})
