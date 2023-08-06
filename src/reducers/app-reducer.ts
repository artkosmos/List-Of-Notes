export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
  status: 'loading' as RequestStatusType
}

type ActionsType = changePreloaderStatusACType

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.payload.status}
    default:
      return state
  }
}

type changePreloaderStatusACType = ReturnType<typeof setPreloaderStatusAC>
export const setPreloaderStatusAC = (status: RequestStatusType) => {
  return {
    type: 'APP/SET-STATUS',
    payload: {
      status
    } as const
  }
}