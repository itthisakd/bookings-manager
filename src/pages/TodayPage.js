import { useState } from 'react'
import React from 'react'
import MenuBar from '../components/shared/MenuBar.js'
import { makeStyles } from '@material-ui/core/styles'
import TodayDataGrid from '../components/today/TodayDataGrid'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'

const { DateTime } = require('luxon')

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}))

export default function TodayPage() {
  const classes = useStyles()

  const [date, setDate] = useState(DateTime.now().toString().slice(0, 10))
  return (
    <div>
      <MenuBar />
      <body className="flex flex-col items-center contents-center">
        <br />
        <TextField
          id="date"
          label="Date"
          type="date"
          defaultValue={new Date().toISOString().slice(0, 10)}
          className={classes.textField}
          InputLabelProps={{
            shrink: true
          }}
          onChange={(e) => {
            setDate(e.target.value)
          }}
        />
        <div className="w-11/12 flex flex-row items-top justify-center">
          <div className="inline-block w-1/2 h-screen p-0 m-0 flex flex-col items-top justify-center">
            <Typography
              variant="h5"
              component="h2"
              className="w-full text-center p-0"
            >
              <strong>Check-in</strong>
            </Typography>
            <TodayDataGrid check="in" date={date} />
          </div>
          <div className="inline-block w-1/2 h-screen p-0 m-0 flex flex-col items-top justify-center">
            <Typography
              variant="h5"
              component="h2"
              className="w-full text-center p-0"
            >
              <strong>Check-out</strong>
            </Typography>
            <TodayDataGrid check="out" date={date} />
          </div>
        </div>
      </body>
    </div>
  )
}
