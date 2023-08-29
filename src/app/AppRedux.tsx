import 'app/App.css'
import LinearProgress from '@mui/material/LinearProgress'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error, ErrorSnackbar } from 'common/components'
import { checkIsLogInTC } from 'features/Login/auth-reducer'
import CircularProgress from '@mui/material/CircularProgress'
import { appStatusSelector, isInitializedSelector } from 'app/app-selectors'
import { ButtonAppBar } from 'common/components'
import { ListOfTodolists, Login } from 'features'
import { useAppSelector } from 'common/utils'
import { AppDispatchType } from 'common/types/app-types'

function AppRedux() {
  const status = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(isInitializedSelector)
  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(checkIsLogInTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: 'fixed',
          top: '30%',
          textAlign: 'center',
          width: '100%',
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ButtonAppBar />
      {status === 'loading' && <LinearProgress color="secondary" />}
      <div className={'contentWrapper'}>
        <ErrorSnackbar />
        <Routes>
          <Route path={'/'} element={<ListOfTodolists />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'404error'} element={<Error />} />
          <Route path={'*'} element={<Navigate to={'404error'} />} />
        </Routes>
      </div>
    </div>
  )
}

export default AppRedux
