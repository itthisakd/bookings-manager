import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { useSpring, animated } from 'react-spring/web.cjs' // web.cjs is required for IE 11 support
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import { useForm } from 'react-hook-form'
import Button from '@material-ui/core/Button'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import Snackbar from '../shared/Snackbar'

const schema = yup.object().shape({
  username: yup
    .string()
    .matches(
      /^[a-z_0-9]{4,15}$/g,
      'Username must be alphanumeric and between 4 and 15 characters.'
    )
    .required('Username is required.'),
  name: yup
    .string()
    .matches(/^[a-zA-Z. ]{3,15}$/g, 'Name must be alphabetical.')
    .required('Name is required.'),
  staffNumber: yup
    .string()
    .matches(/^[0-9]{1,7}$/g, 'Staff number must be numeric.')
    .required('Staff number is required.'),
  password: yup
    .string()
    .matches(
      /^[a-z_0-9]{6,15}$/g,
      'Password must be contain at least one number and one alphabet and be between longer than 6 characters.'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .matches(
      /^[a-z_0-9]{6,15}$/g,
      'Password must be contain at least one number and one alphabet and be between longer than 6 characters.'
    )
    .required('Password is required')
})

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '700px'
  },
  input: {
    margin: '10px'
  }
}))

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter()
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited()
      }
    }
  })

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  )
})

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func
}

export default function SpringModal({ open, handleClose }) {
  const classes = useStyles()
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    //TODO POST API method to create staff account
    console.log(data)
    console.log('errors :>> ', errors)
    setOpenSnackbar(true)
    if (data) handleClose()
  }

  return (
    <div>
      <Snackbar
        status="success"
        message="Staff created successfully!"
        open={openSnackbar}
        setOpen={setOpenSnackbar}
      />
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 50
        }}
      >
        <Fade in={open}>
          <form className={classes.paper} onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  component="h4"
                  className={classes.input}
                >
                  Create new account
                </Typography>
              </Grid>
              <Grid item xs={4}>
                {' '}
                <TextField
                  label="Username"
                  name="username"
                  type="text"
                  variant="outlined"
                  className={classes.input}
                  {...register('username', {
                    required: 'Username required!'
                  })}
                  error={!!errors?.username}
                  helperText={errors?.username?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  className={classes.input}
                  {...register('name', {
                    required: 'Name required!'
                  })}
                  error={!!errors?.name}
                  helperText={errors?.name?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Staff No."
                  name="staffNumber"
                  type="number"
                  variant="outlined"
                  className={classes.input}
                  {...register('staffNumber', {
                    required: 'Staff Number required!'
                  })}
                  error={!!errors?.staffNumber}
                  helperText={errors?.staffNumber?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  className={classes.input}
                  {...register('password')}
                  error={!!errors?.password}
                  helperText={errors?.password?.message}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  className={classes.input}
                  {...register('confirmPassword')}
                  error={!!errors?.confirmPassword}
                  helperText={errors?.confirmPassword?.message}
                />
              </Grid>
            </Grid>

            <div className="p-5 block flex row justify-right align-center ">
              <Button
                variant="contained"
                color="default"
                size="small"
                startIcon={<AddCircleIcon />}
                type="submit"
                color="primary"
              >
                Create
              </Button>
            </div>
          </form>
        </Fade>
      </Modal>
    </div>
  )
}
