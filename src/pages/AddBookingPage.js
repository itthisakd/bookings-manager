/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MenuBar from '../components/MenuBar.js'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import VacancyTable from '../components/VacancyTable'
import { makeStyles } from '@material-ui/core/styles'
import InputBox from '../components/InputBox'
const { DateTime } = require('luxon')

let found = true

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  }
}))

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

const inDate = DateTime.fromISO('2021-01-01')
const outDate = DateTime.fromISO('2021-01-30')

//–––––––––––––––––––––––––––––––––––––––––––––––

//returns arrays of nights
const nightsGenerator = (inD, outD) => {
  const nights = outD.diff(inD, 'days').toObject().days
  let datesISO = []
  let i = 0
  let tempDate = inDate
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

const nightsObj = nightsGenerator(inDate, outDate)

export default function AddBookingPage() {
  const classes = useStyles()
  const [dateIn, setDateIn] = useState('')
  const [dateOut, setDateOut] = useState('')
  let temp

  const handleOutChange = (e) => {}

  return (
    <div>
      <MenuBar />
      <br />
      <Container
        name="reservations"
        className="flex flex-row items-center contents-center justify-around"
      >
        <form
          name="search-fields"
          className="w-min flex flex-row items-center contents-center justify-around m-auto"
          noValidate
          autoComplete="off"
        >
          <div className="mx-3">
            <InputBox
              label="Guest"
              defaultValue="Guest"
              id="standard-helperText"
              type="text"
            />
          </div>
          <div className="mx-3">
            <TextField
              required
              id="dateIn"
              label="Check-in Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              onChange={(e) => {
                setDateIn(e.target.value)
                temp = e.target.value
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="mx-3">
            {console.log('dateIn :>> ', dateIn)}
            {dateIn ? (
              <TextField
                required
                id="dateOut"
                label="Check-out Date"
                type="date"
                defaultValue={new Date(temp)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            ) : (
              <TextField
                disabled
                required
                id="dateOut"
                label="Check-out Date"
                type="date"
                defaultValue={new Date().toISOString().slice(0, 10)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          </div>
          <div className="mx-3">
            <Button variant="contained" color="primary">
              Find
            </Button>
          </div>
        </form>
      </Container>

      {found && (
        <>
          <VacancyTable nightsObj={nightsObj} roomNo={roomNo} />
          <div className="mx-3">
            <Button variant="contained" color="primary">
              CLEAR ALL
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
