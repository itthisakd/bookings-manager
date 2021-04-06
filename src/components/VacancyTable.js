import React from 'react'
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
  const { nightsObj, roomNo } = props
  const classes = useStyles()

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
            <TableRow>
              <TableCell component="th" scope="row">
                {room.num}
              </TableCell>
              <TableCell>{room.type}</TableCell>
              {nightsObj.datesISO.map((date) => (
                <TableCell align="center">
                  <Checkbox
                    room={room.num}
                    date={date}
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
