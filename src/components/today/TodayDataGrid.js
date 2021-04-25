import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import CheckIcon from '@material-ui/icons/Check'
import ReservModal from '../reservations/ReservModal'
import axios from '../../config/axios'
import Snackbar from '../shared/Snackbar'
const { DateTime } = require('luxon')

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

// function array_move(arr, old_index, new_index) {
//   if (new_index >= arr.length) {
//     var k = new_index - arr.length + 1
//     while (k--) {
//       arr.push(undefined)
//     }
//   }
//   arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
//   return arr // for testing
// }

export default function BasicTable(props) {
  const classes = useStyles()
  const { check, date } = props
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState([])
  const [editRemarks, setEditRemarks] = useState(false)
  const [bookingInfoById, setBookingInfoById] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false
  })

  const handleClose = () => {
    setOpen(false)
    //clear state
  }

  const fetchReservations = async () => {
    const res = await axios.get('/reservations/')
    setBookingInfo(res.data.result)
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const handleStatusChange = async (bkInfo) => {
    await axios.patch('/reservations/', {
      id: bkInfo.id,
      paid: 1,
      status: bkInfo.status === 'checkedin' ? 'checkedout' : 'checkedin'
    })
    fetchReservations().then(() => {
      setOpenSnackbar({
        open: true,
        status: 'success',
        message: `${
          bkInfo.status === 'checkedin' ? 'Checked-out' : 'Checked-in'
        } successfully!`
      })
    })
  }

  // const accessModal = async (booking) => {
  //   //then set reservation by id, and set state of bookingInfo with info from reservation
  //   await setBookingInfoById(
  //     bookingInfo.filter((res) => res.id == booking.id)[0]
  //   )
  //   // then opne modal and display modal with the state
  //   setOpen(true)
  // }

  if (check === 'in')
    return (
      <div className="inline-block w-full h-screen p-0 m-0">
        <ReservModal
          today="true"
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          bookingInfo={bookingInfoById}
          editRemarks={editRemarks}
          setEditRemarks={setEditRemarks}
          fetchReservations={fetchReservations}
          bookedNightsByResv={bookingInfo.bookedNights}
        />

        <Snackbar
          status={openSnackbar.status}
          message={openSnackbar.message}
          open={openSnackbar.open}
          setOpen={setOpenSnackbar}
        />
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Guest</TableCell>
                <TableCell>Nights</TableCell>
                <TableCell>Rooms</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingInfo
                .filter(
                  (booking) =>
                    booking.status !== 'enquiry' &&
                    booking.status !== 'cancelled' &&
                    booking.status !== 'uncompleted' &&
                    booking.checkIn === date
                )
                .map((booking, idx, arr) => (
                  <TableRow
                    hover="true"
                    key={booking.id}
                    onDoubleClick={async () => {
                      //then set reservation by id, and set state of bookingInfo with info from reservation
                      await setBookingInfoById(
                        bookingInfo.filter((res) => res.id === booking.id)[0]
                      )
                      // then opne modal and display modal with the state
                      setOpen(true)
                    }}
                  >
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.guest}</TableCell>

                    <TableCell>
                      {
                        DateTime.fromISO(booking.checkOut).diff(
                          DateTime.fromISO(booking.checkIn),
                          'days'
                        ).days
                      }
                    </TableCell>
                    <TableCell>
                      {booking.rooms.map((room) => room.num).join(', ')}
                    </TableCell>
                    <TableCell>
                      {booking.remarks ? booking.remarks : null}
                    </TableCell>
                    <TableCell
                      align="right"
                      style={
                        booking.paid === 0
                          ? { color: '#ff3d00', fontWeight: 'bold' }
                          : null
                      }
                    >
                      {Number(booking.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {booking.status === 'booked' ||
                      booking.status === 'modified' ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          startIcon={<CheckIcon />}
                          onClick={() => {
                            handleStatusChange(booking)
                          }}
                        ></Button>
                      ) : booking.status === 'checkedin' ? (
                        <Button variant="outlined" color="default" size="small">
                          CHECKED-IN
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  else if (check === 'out')
    return (
      <div className="inline-block w-full h-screen p-0 m-0">
        <ReservModal
          today="true"
          open={open}
          setOpen={setOpen}
          handleClose={handleClose}
          bookingInfo={bookingInfoById}
          bookedNightsByResv={bookingInfo.bookedNights}
        />
        <Snackbar
          status={openSnackbar.status}
          message={openSnackbar.message}
          open={openSnackbar.open}
          setOpen={setOpenSnackbar}
        />
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Guest</TableCell>
                <TableCell>Rooms</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingInfo
                .filter(
                  (booking) =>
                    (booking.status === 'checkedin' &&
                      booking.checkOut === date) ||
                    (booking.status === 'checkedout' &&
                      booking.checkOut === date)
                )
                .map((booking, idx, arr) => (
                  <TableRow
                    hover="true"
                    key={booking.id}
                    onDoubleClick={async () => {
                      //then set reservation by id, and set state of bookingInfo with info from reservation
                      await setBookingInfoById(
                        bookingInfo.filter((res) => res.id === booking.id)[0]
                      )
                      // then opne modal and display modal with the state
                      setOpen(true)
                    }}
                  >
                    <TableCell>{booking.id}</TableCell>
                    <TableCell>{booking.guest}</TableCell>
                    <TableCell>
                      {booking.rooms.map((room) => room.num).join(', ')}
                    </TableCell>
                    <TableCell>
                      {booking.remarks ? booking.remarks : null}
                    </TableCell>
                    <TableCell>
                      {booking.status === 'checkedin' ? (
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            handleStatusChange(booking)
                          }}
                          startIcon={<CheckIcon />}
                        ></Button>
                      ) : booking.status === 'checkedout' ? (
                        <Button variant="outlined" color="default" size="small">
                          CHECKED-OUT
                        </Button>
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
}
