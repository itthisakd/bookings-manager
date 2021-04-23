import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2)
    }
  }
}))

export default function CustomizedSnackbars({
  status,
  message,
  open,
  setOpen,
  redirect
}) {
  const classes = useStyles()

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    if (redirect) {
      redirect()
    }
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <Snackbar
        // anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert severity={status} onClose={handleClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

{
  /* 
  const [openSnackbar, setOpenSnackbar] = useState({open: false})
  
    setOpenSnackbar({
        open: true,
        status: 'success',
        message: 'Account deactivated successfully!'
      })

  <Snackbar
        status="success"
        message="Staff created successfully!"
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      /> */
}
