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
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import TextField from '@material-ui/core/TextField'
import EventIcon from '@material-ui/icons/Event'
import IconButton from '@material-ui/core/IconButton'

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

export default function SpringModal(props) {
  const classes = useStyles()
  const { open, setOpen, handleOpen, handleClose, bookingInfo } = props
  const [editMode, setEditMode] = useState(false)
  const [rescheduleMode, setRescheduleMode] = useState(false)
  const [editRemarks, setEditRemarks] = useState(false)

  const handleRescheduleClick = () => {
    setRescheduleMode(true)
  }

  const handleEditRemarksClick = () => {
    setEditRemarks(true)
  }

  return (
    <div>
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
          <div className={classes.paper}>
            <div className="flex justify-end">
              <Typography
                variant="h5"
                component="h2"
                className="w-full text-left py-5 px-0"
              >
                <strong>{bookingInfo.guestName}</strong>
              </Typography>
              <div className="py-5 px-0">
                {!editMode && (
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    startIcon={<EventIcon />}
                    onClick={handleRescheduleClick}
                    type="submit"
                    size="small"
                  >
                    RESCHEDULE
                  </Button>
                )}
                {!!editMode && (
                  <Button
                    variant="contained"
                    color="default"
                    size="small"
                    color="secondary"
                    startIcon={<SaveAltIcon />}
                    type="submit"
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
            <Container className={classes.flexContainer}>
              <div className="w-1/2 p-0">
                <Grid container>
                  <Grid item xs={6} className={classes.key}>
                    ID:{' '}
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {bookingInfo.id}
                  </Grid>
                  <Grid item xs={6} className={classes.key}>
                    Booking Status:
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {bookingInfo.status?.toUpperCase()}
                  </Grid>
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
                  <Grid item xs={6} className={classes.key}>
                    Created At:{' '}
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {DateTime.fromISO(bookingInfo.createdAt).toFormat(
                      'dd LLL yyyy'
                    )}
                  </Grid>
                  <Grid item xs={6} className={classes.key}>
                    Updated At:{' '}
                  </Grid>
                  <Grid item xs={6} className={classes.value}>
                    {bookingInfo.updatedAt
                      ? DateTime.fromISO(bookingInfo.updatedAt).toFormat(
                          'dd LLL yyyy'
                        )
                      : null}
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
                  {!handleEditRemarksClick && (
                    <>
                      {bookingInfo.remarks ? bookingInfo.remarks : null}
                      <IconButton
                        className={classes.smallButton}
                        onClick={handleEditRemarksClick}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </>
                  )}
                  {handleEditRemarksClick && (
                    <>
                      <TextField
                        name="remarks"
                        variant="outlined"
                        defaultValue={bookingInfo.remarks}
                        size="small"
                        className={{ length: '150px' }}
                      />
                    </>
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
                      console.log('inside')
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
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
