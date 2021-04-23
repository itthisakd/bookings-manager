import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useForm } from 'react-hook-form'
import { useContext, useState } from 'react'
import axios from '../config/axios'
import { useHistory } from 'react-router-dom'
import localStorageService from '../services/localStorageService'
import { AuthContext } from '../contexts/AuthContextProvider'
import Snackbar from '../components/shared/Snackbar'
import jwt_decode from 'jwt-decode'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function LogInPage() {
  const classes = useStyles()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

  const [openSnackbar, setOpenSnackbar] = useState(false)

  const handleLogin = async (data) => {
    try {
      const res = await axios.post('/login', {
        username: data.username,
        password: data.password
      })
      reset()
      localStorageService.setToken(res.data.token)
      console.log('res.data', res.data)

      const decoded = jwt_decode(res.data.token)
      const role = decoded.position.toUpperCase()
      await setIsAuthenticated({ token: res.data.token, role })

      role === 'SUPERADMIN' ? history.push('/staff') : history.push('/today')
    } catch (err) {
      console.dir(err)
      if (err) setOpenSnackbar(true)
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      {console.log('IsAuthenticated :>> ', isAuthenticated)}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <form className={classes.form} onSubmit={handleSubmit(handleLogin)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            {...register('username')}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            {...register('password')}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Snackbar
            status="error"
            message="Incorrect username or password."
            open={openSnackbar}
            setOpen={setOpenSnackbar}
          />
        </form>
      </div>
    </Container>
  )
}
