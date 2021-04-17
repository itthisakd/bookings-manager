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
import UploadButton from '../components/UploadButton'

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
    register,
    handleSubmit,
    getValues
  } = props
  // const [modifyMode, setModifyMode] = useState(false)

  const handleEditRemarksDone = () => {
    //TODO ––––––––––––––patch API method to change the remarks of the bookign
    setEditRemarks(false)
  }

  // const handleModifyDone = () => {
  //   //TODO ––––––––––––––put API method to update booking with new nightsBooked
  //   //TODO ––––––––––––––patch API method to change the booking status to MODIFIED

  //   setModifyMode(false)
  // }

  const handleCancelBooking = () => {
    //TODO ––––––––––––patch API method to change booking status to CANCELLED
    console.log('cancel booking')
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
                    {bookingInfo.amount}
                  </Grid>
                </Grid>
              </div>
            </Container>

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
                            {DateTime.fromISO(row.inDate).toFormat(
                              'dd LLL yyyy'
                            )}
                          </TableCell>
                          <TableCell>
                            {DateTime.fromISO(row.outDate).toFormat(
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
                  name="mobile"
                  variant="outlined"
                  value={getValues('remarks') ? getValues('remarks') : null}
                  defaultValue={bookingInfo.remarks}
                  size="small"
                  {...register('remarks')}
                  // style={{ width: '500px' }}
                />
              </Grid>
              <Grid item xs={3} className={classes.value}>
                Payment Slip:
              </Grid>
              <Grid item xs={3} className={classes.value}>
                <UploadButton />
              </Grid>
              <Grid item xs={2} className={classes.value}>
                Email:
              </Grid>
              <Grid item xs={4} className={classes.value}>
                <TextField
                  name="email"
                  variant="outlined"
                  defaultValue={bookingInfo.remarks}
                  size="small"
                  // style={{ width: '500px' }}
                />
              </Grid>
              <Grid item xs={6} className={classes.value}></Grid>
              <Grid item xs={2} className={classes.value}>
                Remarks:
              </Grid>
              <Grid item xs={4} className={classes.value}>
                <TextField
                  name="remarks"
                  variant="outlined"
                  defaultValue={bookingInfo.remarks}
                  size="small"
                  multiline="true"
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
                onClick={handleCancelBooking}
                //TODO ask "Confirm delete enquiry?"
                type="submit"
                size="small"
                style={{ margin: '0 5px' }}
              >
                DELETE ENQUIRY
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                startIcon={<CheckIcon />}
                onClick={() => {
                  // setModifyMode(true)
                  //TODO if no payment upload, ask "Confirm this booking without payment?"
                }}
                type="submit"
                size="small"
                style={{ margin: '0 5px' }}
              >
                CONFIRM BOOKING
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
