import { appAction, appReducer, AppReducerState } from 'reducers/app-reducer'

let appState: AppReducerState

beforeEach(() => {
  appState = {
    status: 'loading',
    error: null,
    isInitialized: false,
  }
})

test('should update the status correctly', () => {
  const resultState = appReducer(appState, appAction.setPreloaderStatus({ status: 'succeeded' }))

  expect(resultState.status).toBe('succeeded')
  expect(resultState.error).toBeNull()
  expect(resultState.isInitialized).toBeFalsy()
})

test('should update the error correctly', () => {
  const error = 'An error occurred'

  const resultState = appReducer(appState, appAction.setError({ error }))

  expect(resultState.status).toBe('loading')
  expect(resultState.error).toBe(error)
  expect(resultState.isInitialized).toBeFalsy()
})

test('should update the status of initialization', () => {
  const isInitialized = true

  const resultState = appReducer(appState, appAction.setIsInitialized({ isInitialized }))

  expect(resultState.status).toBe('loading')
  expect(resultState.error).toBeNull()
  expect(resultState.isInitialized).toBeTruthy()
})
