import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import { useSpring, animated } from 'react-spring/web.cjs' // web.cjs is required for IE 11 support
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ClearIcon from '@material-ui/icons/Clear'
import CheckIcon from '@material-ui/icons/Check'
import { useForm } from 'react-hook-form'
import ConfirmModal from '../shared/ConfirmModal'
import axios from '../../config/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
// import { AuthContext } from '../../contexts/AuthContextProvider'

const { DateTime } = require('luxon')

const useStyles = makeStyles((theme) => ({
  smallButton: {
    margin: theme.spacing(1),
    padding: '0'
  },
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
    width: '800px'
  },
  flexContainer: {
    padding: '0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'start'
  },
  key: {
    padding: '6px',
    margin: '0',
    fontWeight: 'bold'
  },
  value: {
    padding: '6px',
    margin: '0'
  },
  subKey: {
    padding: '6px',
    margin: '0',
    fontWeight: 'bold',
    fontSize: '0.75em'
  },
  subValue: {
    padding: '6px',
    margin: '0',
    fontSize: '0.75em'
  },
  uploadButton: {
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  input: {
    display: 'none'
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

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      'Email in incorrect format'
    ),
  phone_number: yup
    .string()
    .required('Phone number is required')
    .matches(/0[0-9]{9}/, 'Phone number in incorrect format.'),
  remarks: yup.string()
})

export default function SpringModal({
  open,
  setOpen,
  // handleOpen,
  handleClose,
  bookingInfo,
  fetchReservations,
  openConfirmModal,
  setOpenConfirmModal
}) {
  const classes = useStyles()
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const [paymentSlip, setPaymentSlip] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState({ open: false })
  const [openConfirmBookModal, setOpenConfirmBookModal] = useState(false)

  const handleConfirmBookClick = async (data) => {
    const formData = new FormData()
    formData.append('id', bookingInfo.id)
    formData.append('status', 'booked')
    formData.append('paid', paymentSlip ? 1 : 0)
    if (paymentSlip) formData.append('image', paymentSlip)
    if (data.phone_number) formData.append('phone_number', data.phone_number)
    if (data.remarks) formData.append('remarks', data.remarks)
    if (data.email) formData.append('email', data.email)

    await axios.patch('/reservations/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setOpen(false)
    setOpenConfirmBookModal(false)
    fetchReservations().then(() => {
      setOpenSnackbar({
        open: true,
        status: 'success',
        message: 'Reservation booked successfully!'
      })
    })
  }

  const handleConfirmDeleteClick = async () => {
    await axios.delete(`/reservations/enquiry/${bookingInfo.id}`)
    setOpen(false)
    setOpenConfirmModal(false)
    fetchReservations().then(() => {
      setOpenSnackbar({
        open: true,
        status: 'success',
        message: 'Enquiry deleted successfully'
      })
    })
  }

  return (
    <div>
      <Modal
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
          <div className={classes.paper}>
            <div className="flex row justify-between align-center p-3">
              <Typography variant="h5" component="h2">
                {`(Resv. ${bookingInfo.id})`}
                {'   '}
                <strong>{bookingInfo.guest}</strong>
              </Typography>
              <Typography
                variant="h5"
                component="h2"
                style={
                  bookingInfo.status === 'enquiry' ? { color: '#ff9800' } : null
                }
              >
                <strong>{bookingInfo.status?.toUpperCase()}</strong>
              </Typography>
            </div>

            <Container className={classes.flexContainer}>
              <div className="w-1/2 p-0">
                <Grid container>
                  <Grid item xs={6} className={classes.key}>
                    Check-in:{' '}
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {DateTime.fromISO(bookingInfo.checkIn).toFormat(
                      'dd LLL yyyy'
                    )}
                  </Grid>
                  <Grid item xs={6} className={classes.key}>
                    Check-out:{' '}
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {DateTime.fromISO(bookingInfo.checkOut).toFormat(
                      'dd LLL yyyy'
                    )}
                  </Grid>
                  <Grid item xs={6} className={classes.key}>
                    Staff:{' '}
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {bookingInfo.staff}
                  </Grid>
                </Grid>
              </div>
              <div className="w-1/2 p-0">
                <Grid container>
                  <Grid item xs={6} className={classes.key}>
                    Payment Status:
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {bookingInfo.paid ? 'PAID' : 'UNPAID'}
                  </Grid>
                  <Grid item xs={6} className={classes.key}>
                    Amount:
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {Number(bookingInfo.amount).toFixed(2)}
                  </Grid>
                  <Grid item xs={12} className={classes.key}></Grid>
                </Grid>
              </div>
            </Container>
            <form
              onSubmit={
                paymentSlip
                  ? handleSubmit(handleConfirmBookClick)
                  : (e) => {
                      e.preventDefault()
                    }
              }
            >
              <Grid container>
                <TableContainer>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Room No.</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Check-in</TableCell>
                        <TableCell>Check-out</TableCell>
                        <TableCell>Rate</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {bookingInfo.rooms?.map((row) => {
                        return (
                          <TableRow key={row.name}>
                            <TableCell>{row.num}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>
                              {DateTime.fromISO(row.checkIn).toFormat(
                                'dd LLL yyyy'
                              )}
                            </TableCell>
                            <TableCell>
                              {DateTime.fromISO(row.checkOut).toFormat(
                                'dd LLL yyyy'
                              )}
                            </TableCell>
                            <TableCell>{row.rate}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>

              <Grid container>
                <Grid item xs={12} style={{ margin: '10px 0' }}>
                  <Typography variant="body1" component="div">
                    To confirm this booking, please enter details below...
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.value}>
                  Mobile:
                </Grid>
                <Grid item xs={4} className={classes.value}>
                  <TextField
                    {...register('phone_number')}
                    name="phone_number"
                    variant="outlined"
                    size="small"
                    error={!!errors?.phone_number}
                    helperText={errors?.phone_number?.message}
                  />
                </Grid>
                <Grid item xs={3} className={classes.value}>
                  Payment Slip:
                </Grid>
                <Grid item xs={3} className={classes.value}>
                  <div className={classes.uploadButton}>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      type="file"
                      onChange={(e) => {
                        setPaymentSlip(e.target.files[0])
                      }}
                      name="payment_slip"
                    />
                    <label htmlFor="contained-button-file">
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        size="small"
                      >
                        Upload
                      </Button>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={2} className={classes.value}>
                  Email:
                </Grid>
                <Grid item xs={4} className={classes.value}>
                  <TextField
                    {...register('email')}
                    name="email"
                    variant="outlined"
                    defaultValue={bookingInfo.remarks}
                    size="small"
                    error={!!errors?.email}
                    helperText={errors?.email?.message}
                  />
                </Grid>
                <Grid item xs={3} className={classes.value}></Grid>
                <Grid item xs={3} className={classes.value}>
                  <Typography variant="caption" component="p">
                    {paymentSlip.name}
                  </Typography>
                </Grid>
                <Grid item xs={2} className={classes.value}>
                  Remarks:
                </Grid>
                <Grid item xs={4} className={classes.value}>
                  <TextField
                    {...register('remarks')}
                    name="remarks"
                    variant="outlined"
                    size="small"
                    multiline="true"
                    error={!!errors?.remarks}
                    helperText={errors?.remarks?.message}
                  />
                </Grid>
                <Grid item xs={6}></Grid>
              </Grid>

              <div className="w-full p-0 my-3 flex row align-center justify-between">
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  startIcon={<ClearIcon />}
                  onClick={() => {
                    setOpenConfirmModal(true)
                  }}
                  style={{ margin: '0 5px' }}
                >
                  DELETE ENQUIRY
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  startIcon={<CheckIcon />}
                  type="submit"
                  style={{ margin: '0 5px' }}
                  onClick={() =>
                    !!!paymentSlip ? setOpenConfirmBookModal(true) : null
                  }
                >
                  CONFIRM BOOKING
                </Button>
              </div>
            </form>
            <ConfirmModal
              open={openConfirmModal}
              setOpenConfirmModal={setOpenConfirmModal}
              handleConfirmClick={handleConfirmDeleteClick}
              confirmMessage={`You are deleting enquiry ID: ${bookingInfo.id}, Guest: ${bookingInfo.guest}.`}
              confirmTitle={'Delete enquiry...'}
            />
            <ConfirmModal
              open={openConfirmBookModal}
              setOpenConfirmModal={setOpenConfirmBookModal}
              handleConfirmClick={handleConfirmBookClick}
              confirmMessage={`Confirm reservation ${bookingInfo.id}, Guest: ${bookingInfo.guest} without payment?`}
              confirmTitle={'Confirm unpaid booking...'}
            />
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
