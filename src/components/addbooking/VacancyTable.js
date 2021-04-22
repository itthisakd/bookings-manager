import React, { useState, useEffect } from 'react'
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
import axios from '../../config/axios'
import dynamicSort from '../../utilities/dynamicSort'

const { DateTime } = require('luxon')

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
})

export default function DenseTable(props) {
  const { nightsObj, nightsChecked, setNightsChecked, onCreateClick } = props
  const classes = useStyles()
  const [bookedNights, setBookedNights] = useState({})
  const [roomNo, setRoomNo] = useState([])

  const fetchVacancy = async () => {
    const res = await axios.get('/reservations/vacancy')
    setBookedNights(res.data.bookedNights)
    setRoomNo(res.data.rooms)
  }

  useEffect(() => {
    fetchVacancy()
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Room No.</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Rate</TableCell>
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
            <TableRow hover key={room.num}>
              <TableCell component="th" scope="row">
                {room.num}
              </TableCell>
              <TableCell component="th" scope="row">
                {room.rate}
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
