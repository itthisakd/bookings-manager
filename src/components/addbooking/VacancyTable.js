import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'

const { DateTime } = require('luxon')

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

function dynamicSort(property) {
  var sortOrder = 1
  if (property[0] === '-') {
    sortOrder = -1
    property = property.substr(1)
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0
    return result * sortOrder
  }
}

export default function DenseTable(props) {
  const { nightsObj, nightsChecked, setNightsChecked, onCreateClick } = props
  const classes = useStyles()

  //–––––––––––––––DATA REQUIRED––––––––––––––––––

  const roomNo = [
    {
      num: 110,
      type: 'Standard'
    },
    {
      num: 111,
      type: 'Standard'
    },
    {
      num: 112,
      type: 'Standard'
    },
    {
      num: 210,
      type: 'Superior'
    },
    {
      num: 211,
      type: 'Superior'
    },
    {
      num: 212,
      type: 'Superior'
    }
  ]

  //from this
  // const bookedNights = [
  //   {
  //     reservationId: 999
  //     room_id: 220,
  //     nightlyDate: new Date(2021, 2, 12).toISOString(),
  //   },
  // {
  //     reservationId: 999
  //     room_id: 221,
  //     nightlyDate: new Date(2021, 2, 12).toISOString(),
  //   },
  // ]

  //to this
  const bookedNights = {
    '2021-04-10': [112],
    '2021-04-11': [112, 211],
    '2021-04-15': [212],
    '2021-03-12': [212]
  }

  //–––––––––––––––––––––––––––––––––––––––––––––––

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Room No.</TableCell>
            <TableCell>Type</TableCell>
            {nightsObj.datesReformatted.map((date) => (
              <TableCell align="center">
                <div>{date[0]}</div>
                <h2>{date[1]}</h2>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {roomNo.map((room) => (
            <TableRow hover="true">
              <TableCell component="th" scope="row">
                {room.num}
              </TableCell>
              <TableCell>{room.type}</TableCell>

              {nightsObj.datesISO.map((date) => {
                if (
                  Object.keys(bookedNights).includes(date) === false ||
                  bookedNights[date].includes(room.num) === false
                ) {
                  return (
                    <TableCell align="center">
                      <Checkbox
                        room={room.num}
                        date={date}
                        color="primary"
                        onChange={(e) => {
                          e.target.checked
                            ? setNightsChecked(
                                [
                                  ...nightsChecked,
                                  { room: room.num, date }
                                ].sort(dynamicSort('date'))
                              )
                            : setNightsChecked(
                                nightsChecked
                                  .filter((night) => {
                                    return !(
                                      night.room === room.num &&
                                      night.date === date
                                    )
                                  })
                                  .sort(dynamicSort('date'))
                              )
                        }}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    </TableCell>
                  )
                } else {
                  return (
                    <TableCell align="center">
                      <Checkbox
                        disabled
                        checked
                        room={room.num}
                        date={date}
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    </TableCell>
                  )
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end row">
        <div className="m-3">
          <Button variant="contained" color="primary" onClick={onCreateClick}>
            CREATE ENQUIRY
          </Button>
        </div>
      </div>
    </TableContainer>
  )
}

//return data
const data = {
  guest: 'Guest',
  checkIn: '2020-12-12',
  checkOut: '2020-12-13',
  nightsChecked: [
    { room: 110, date: '2021-04-20' },
    { room: 110, date: '2021-04-21' },
    { room: 111, date: '2021-04-21' }
  ]
}

//REVIEW THIS ADDITION LATER, omit with chnage of plans and decide not to do
// addition:
// else if (modify === 'true') {
//                   bookedNightsByResv?.map((night) => {
//                     if (
//                       night.roomId === room.num &&
//                       night.nightlyDate === date
//                     ) {
//                       return (
//                         <TableCell align="center">
//                           //FIXME
//                           <Checkbox
//                             checked
//                             room={room.num}
//                             date={date}
//                             color="primary"
//                             onChange={(e) => {
//                               e.target.checked
//                                 ? setNightsChecked([
//                                     ...nightsChecked,
//                                     { room: room.num, date }
//                                   ])
//                                 : setNightsChecked(
//                                     nightsChecked.filter((night) => {
//                                       return !(
//                                         night.room === room.num &&
//                                         night.date === date
//                                       )
//                                     })
//                                   )
//                             }}
//                             inputProps={{ 'aria-label': 'secondary checkbox' }}
//                           />
//                         </TableCell>
//                       )
//                       //FIXME
//                     } else {
//                       return (
//                         <TableCell align="center">
//                           <Checkbox
//                             disabled
//                             checked
//                             room={room.num}
//                             date={date}
//                             color="primary"
//                             inputProps={{ 'aria-label': 'secondary checkbox' }}
//                           />
//                         </TableCell>
//                       )
//                     }
//                   })
//                 }
