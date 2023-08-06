export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string | null

const initialState = {
  status: 'loading' as RequestStatusType,
  error: null as ErrorType
}

type ActionsType = ChangePreloaderStatusACType | SetErrorACType

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.payload.status}
    case "APP/SET-ERROR":
      return {...state, error: action.payload.error}
    default:
      return state
  }
}

type ChangePreloaderStatusACType = ReturnType<typeof setPreloaderStatusAC>
export const setPreloaderStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    payload: {
      status
    }
  } as const
}

type SetErrorACType = ReturnType<typeof setErrorAC>
export const setErrorAC = (error: string | null) => {
  return {
    type: 'APP/SET-ERROR',
    payload: {
      error
    }
  } as const
}