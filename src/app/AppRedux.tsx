import 'app/App.css'
import LinearProgress from '@mui/material/LinearProgress'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Error, ErrorSnackbar } from 'common/components'
import CircularProgress from '@mui/material/CircularProgress'
import { appStatusSelector, isInitializedSelector } from 'app/app-selectors'
import { ButtonAppBar } from 'common/components'
import { ListOfTodolists, Login } from 'features'
import { useAppSelector } from 'common/utils'
import { AppDispatchType } from 'common/types/app-types'
import { authThunk } from 'features/Login/model/auth-reducer'

function AppRedux() {
  const preloaderStatus = useAppSelector(appStatusSelector)
  const isInitialized = useAppSelector(isInitializedSelector)
  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(authThunk.checkIsAuth({}))
  }, [])

  if (!isInitialized) {
    return (
      <div className={'preloader'}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ButtonAppBar />
      {preloaderStatus === 'loading' && <LinearProgress color="secondary" />}
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
