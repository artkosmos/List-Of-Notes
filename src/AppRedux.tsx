import "./App.css"
import ButtonAppBar from "./ButtonAppBar"
import LinearProgress from "@mui/material/LinearProgress"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { AppDispatchType, useAppSelector } from "./store/store"
import { RequestStatusType } from "./reducers/app-reducer"
import { ErrorSnackbar } from "./ErrorSnackBar"
import { Login } from "./features/Login"
import { Navigate, Route, Routes } from "react-router-dom"
import { ListOfTodolists } from "./ListOfTodolists"
import { Error } from "./features/Error"
import { checkIsLogInTC } from "./reducers/auth-reducer"
import CircularProgress from "@mui/material/CircularProgress"

function AppRedux() {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>(
    (state) => state.app.isInitialized,
  )
  const dispatch = useDispatch<AppDispatchType>()

  useEffect(() => {
    dispatch(checkIsLogInTC())
  }, [])

  if (!isInitialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="App">
      <ButtonAppBar />
      {status === "loading" && <LinearProgress color="secondary" />}
      <div className={"contentWrapper"}>
        <ErrorSnackbar />
        <Routes>
          <Route path={"/"} element={<ListOfTodolists />} />
          <Route path={"login"} element={<Login />} />
          <Route path={"404error"} element={<Error />} />
          <Route path={"*"} element={<Navigate to={"404error"} />} />
        </Routes>
      </div>
    </div>
  )
}

export default AppRedux
