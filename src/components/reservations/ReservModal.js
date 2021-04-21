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
import EditIcon from '@material-ui/icons/Edit'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import ConfirmModal from '../shared/ConfirmModal'
import Snackbar from '../shared/Snackbar'
import axios from '../../config/axios'

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

const nightsGenerator = (inDD, outDD) => {
  const inD = DateTime.fromISO(inDD)
  const outD = DateTime.fromISO(outDD)
  const nights = outD.diff(inD, 'days').toObject().days
  let datesISO = []
  let i = 0
  let tempDate = inD
  while (datesISO.length !== nights) {
    datesISO.push(tempDate.plus({ days: i++ }).toISODate())
  }
  const datesReformatted = datesISO.map((night) => {
    let temp = DateTime.fromISO(night)
      .toLocaleString(DateTime.DATE_MED)
      .toUpperCase()
      .split(',')
      .map((item) => item.split(' '))
    return temp[0]
  })
  return { nights, datesISO, datesReformatted }
}

export default function SpringModal(props) {
  const classes = useStyles()
  const {
    open,
    setOpen,
    handleOpen,
    handleClose,
    bookingInfo,
    editRemarks,
    setEditRemarks,
    bookedNightsByResv,
    today,
    accessModal,
    openConfirmModal,
    fetchReservations,
    setOpenConfirmModal
  } = props
  const [remarks, setRemarks] = useState('')
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false
  })

  const handleConfirmClick = async () => {
    console.log({
      id: bookingInfo.id,
      status: 'cancelled'
    })
    await axios.patch('/reservations/', {
      id: bookingInfo.id,
      status: 'cancelled'
    })
    setOpen(false)
    setOpenConfirmModal(false)
    fetchReservations().then(() => {
      setOpenSnackbar({
        open: true,
        status: 'success',
        message: 'Reservation cancelled successfully!'
      })
    })
  }

  const handleSubmitRemarks = async (e) => {
    e.preventDefault()
    handleClose()
    await axios.patch('/reservations/', {
      id: bookingInfo.id,
      remarks: remarks
    })
    setEditRemarks(false)
    setRemarks('')
    fetchReservations().then(() => {
      setOpenSnackbar({
        open: true,
        status: 'success',
        message: 'Remarks updated successfully!'
      })
    })
  }

  return (
    <div>
      <Snackbar
        status={openSnackbar.status}
        message={openSnackbar.message}
        open={openSnackbar.open}
        setOpen={setOpenSnackbar}
      />
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
                  bookingInfo.status === 'booked'
                    ? { color: '#06a94d' }
                    : bookingInfo.status === 'modified'
                    ? { color: '#03a9f4' }
                    : bookingInfo.status === 'cancelled'
                    ? { color: '#ff3d00' }
                    : bookingInfo.status === 'checkedin'
                    ? { color: '#000000' }
                    : bookingInfo.status === 'checkedout'
                    ? { color: '#00000' }
                    : null
                }
              >
                <strong>
                  {bookingInfo.status === 'checkedin'
                    ? 'CHECKED-IN'
                    : bookingInfo.status === 'checkedout'
                    ? 'CHECKED-OUT'
                    : bookingInfo.status?.toUpperCase()}
                </strong>
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
                </Grid>
              </div>
            </Container>
            <div className="w-full">
              <Grid container>
                <Grid item xs={3} className={classes.key}>
                  Remarks:
                </Grid>
                <Grid item xs={9} className={classes.value}>
                  {!editRemarks && (
                    <>
                      {bookingInfo.remarks ? bookingInfo.remarks : null}
                      <IconButton
                        className={classes.smallButton}
                        onClick={() => {
                          setRemarks(bookingInfo.remarks)
                          setEditRemarks(true)
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                  {editRemarks && (
                    <form onSubmit={handleSubmitRemarks}>
                      <TextField
                        onChange={(e) => setRemarks(e.target.value)}
                        value={remarks}
                        name={`${bookingInfo.id}`}
                        variant="outlined"
                        size="small"
                        multiline="true"
                        style={{ width: '500px' }}
                      />
                      <IconButton
                        className={classes.smallButton}
                        color="primary"
                        type="submit"
                      >
                        <DoneIcon fontSize="small" />
                      </IconButton>
                    </form>
                  )}
                </Grid>
              </Grid>
            </div>

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
            <div className="w-full p-1 my-3">
              <Grid container>
                <Grid item xs={2} className={classes.subKey}>
                  Created At:{' '}
                </Grid>
                <Grid item xs={3} className={classes.subValue}>
                  {DateTime.fromISO(bookingInfo.createdAt).toFormat(
                    'dd LLL yyyy'
                  )}
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={1} className={classes.subKey}>
                  Mobile:
                </Grid>
                <Grid item xs={3} className={classes.subValue}>
                  {bookingInfo.phoneNumber}
                </Grid>
                <Grid item xs={2} className={classes.subKey}>
                  Update At:{' '}
                </Grid>
                <Grid item xs={3} className={classes.subValue}>
                  {bookingInfo.updatedAt
                    ? DateTime.fromISO(bookingInfo.updatedAt).toFormat(
                        'dd LLL yyyy'
                      )
                    : null}
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={1} className={classes.subKey}>
                  Email
                </Grid>
                <Grid item xs={3} className={classes.subValue}>
                  {bookingInfo.email}
                </Grid>
              </Grid>
            </div>
            {bookingInfo.status !== 'cancelled' && (
              <>
                {!today && (
                  <div className="w-full p-0 flex row align-center justify-end">
                    <Button
                      variant="contained"
                      color="default"
                      size="small"
                      startIcon={<ClearIcon />}
                      onClick={() => {
                        setOpenConfirmModal(true)
                      }}
                      type="submit"
                      size="small"
                      style={{ margin: '0 5px' }}
                    >
                      CANCEL BOOKING
                    </Button>
                    <ConfirmModal
                      open={openConfirmModal}
                      setOpenConfirmModal={setOpenConfirmModal}
                      handleConfirmClick={handleConfirmClick}
                      confirmMessage={`You are cancelling this reservation ID: ${bookingInfo.id}, Guest: ${bookingInfo.guest}.`}
                      confirmTitle={'Cancel this reservation...'}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
