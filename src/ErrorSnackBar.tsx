import React from "react"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"
import { AppDispatchType, useAppSelector } from "store/store"
import { appAction, ErrorType } from "reducers/app-reducer"
import { useDispatch } from "react-redux"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
  const dispatch = useDispatch<AppDispatchType>()
  const error = useAppSelector<ErrorType>((state) => state.app.error)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    dispatch(appAction.setError({ error: null }))
  }
  return (
    <Snackbar open={!!error} autoHideDuration={3000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error}
      </Alert>
    </Snackbar>
  )
}
