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

const inDate = DateTime.fromISO('2021-01-01')
const outDate = DateTime.fromISO('2021-01-04')

//returns arrays of nights
const nightsArr = (inD, outD) => {
  const nights = outD.diff(inD, 'days').toObject().days
  let datesISO = []
  let i = 0
  let tempDate = inDate
  while (datesISO.length !== nights) {
    datesISO.push(tempDate.plus({ days: i++ }).toISODate())
  }
  const datesReformatted = datesISO.map((night) =>
    DateTime.fromISO(night)
      .toLocaleString(DateTime.DATE_MED)
      .slice(0, 6)
      .toUpperCase()
  )
  return { nights, datesISO, datesReformatted }
}

function createData(d) {
  return { ...d }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

export default function DenseTable() {
  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox inputProps={{ 'aria-label': 'disabled checkbox' }} />
            </TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
