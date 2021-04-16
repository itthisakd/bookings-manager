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

const { DateTime } = require('luxon')

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function DenseTable(props) {
  const { nightsObj, modify, bookedNightsByResv } = props
  const classes = useStyles()
  const [nightsChecked, setNightsChecked] = useState([])

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
                            ? setNightsChecked([
                                ...nightsChecked,
                                { room: room.num, date }
                              ])
                            : setNightsChecked(
                                nightsChecked.filter((night) => {
                                  return !(
                                    night.room === room.num &&
                                    night.date === date
                                  )
                                })
                              )
                        }}
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                      />
                    </TableCell>
                  )
                } else {
                  //FIXME
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
    </TableContainer>
  )
}

//REVIEW THIS ADDITION LATER
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
