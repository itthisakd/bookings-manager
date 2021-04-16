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
import ReservModal from './ReservModal'

const { DateTime, todayDate } = require('luxon')

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1
    while (k--) {
      arr.push(undefined)
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
  return arr // for testing
}

export default function BasicTable(props) {
  const classes = useStyles()
  const { check, date } = props
  const [statusChange, setStatusChange] = useState({})
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState([])
  const [bookingInfoById, setBookingInfoById] = useState({})

  const handleClose = () => {
    setOpen(false)
    //clear state
  }

  //TODO –––––––––––––– add GET API method to get all bookingInfo in the format of
  const bookingInfoFrom = [
    {
      id: 999,
      status: 'booked',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: DateTime.now().toString().slice(0, 10),
      checkOut: new Date(2021, 2, 13).toISOString(),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
      rooms: [
        {
          num: 220,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        },
        {
          num: 221,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        }
      ]
    },
    {
      id: 111,
      status: 'checkedin',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: DateTime.now().toString().slice(0, 10),
      checkOut: new Date(2021, 2, 13).toISOString(),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
      rooms: [
        {
          num: 220,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        },
        {
          num: 221,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        }
      ]
    },
    {
      id: 112,
      status: 'checkedin',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: new Date(2021, 2, 12).toISOString(),
      checkOut: DateTime.now().toString().slice(0, 10),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 0,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
      rooms: [
        {
          num: 220,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        },
        {
          num: 221,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        }
      ]
    },
    {
      id: 115,
      status: 'checkedout',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: new Date(2020, 11, 4).toISOString(),
      checkOut: DateTime.now().toString().slice(0, 10),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
      rooms: [
        {
          num: 220,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        },
        {
          num: 221,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        }
      ]
    }
  ]

  useEffect(() => {
    setBookingInfo(bookingInfoFrom)
  }, [])

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  useEffect(() => {
    //TODO –––––––––––––– PATCH API method and then clear statusChange
  }, [statusChange])

  const accessModal = async (booking) => {
    //then set reservation by id, and set state of bookingInfo with info from reservation
    await setBookingInfoById(
      bookingInfo.filter((res) => res.id == booking.id)[0]
    )
    // then opne modal and display modal with the state
    setOpen(true)
  }

  if (check === 'in')
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
                    (booking.status !== 'enquiry' ||
                      booking.status !== 'cancelled') &&
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
                      {booking.amount.toFixed(2)}
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
                            //REVIEW this part once backend connected
                            setStatusChange({
                              id: booking.id,
                              status: 'checkedin',
                              paid: 1
                            })
                            setBookingInfo(array_move(arr, arr[idx], arr[-1]))
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
                    (booking.status === 'checkedin' ||
                      booking.status === 'checkedout') &&
                    booking.checkOut === date
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
                            //REVIEW this part once backend connected
                            setStatusChange({
                              id: booking.id,
                              status: 'checkedin',
                              paid: 1
                            })
                            setBookingInfo(array_move(arr, arr[idx], arr[-1]))
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
