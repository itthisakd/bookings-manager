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

//from this
// const bookedNights = [
//   {
//     room_id: 112,
//     nightlyDate: '10-04-2021'
//   },
//   {
//     room_id: 112,
//     nightlyDate: '11-04-2021'
//   },
//   {
//     room_id: 220,
//     nightlyDate: '15-04-2021'
//   },
//   {
//     room_id: 223,
//     nightlyDate: '11-04-2021'
//   }
// ]

//to this
const bookedNights = {
  '2021-04-10': [112],
  '2021-04-11': [112, 211],
  '2021-04-15': [212]
}

//–––––––––––––––––––––––––––––––––––––––––––––––

//returns arrays of nights
const nightsGenerator = (inDD, outDD) => {
  const inD = DateTime.fromISO(inDD)
  const outD = DateTime.fromISO(outDD)
  const nights = outD.diff(inD, 'days').toObject().days
  let datesISO = []
  let i = 0
  let tempDate = inD
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

export default function AddBookingPage() {
  const classes = useStyles()
  const [dateIn, setDateIn] = useState('')
  const [dateOut, setDateOut] = useState('')
  const [nightsObj, setNightsObj] = useState({})
  const [found, setFound] = useState(false)
  const [nightsChecked, setNightsChecked] = useState([])

  const onFindClick = () => {
    if (dateIn && dateOut) {
      setNightsObj(nightsGenerator(dateIn, dateOut))
      setFound(true)
      console.log('Clicked')
    }
  }

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
              format="dd/MM/yyyy"
              onChange={(e) => {
                setDateIn(e.target.value)
                //––––––––––––––––––––––––––––––––––––––––––-FIGURE OUT HOW TO FIX THE BUG THAT THE CHECK OUT DATE CAN BE BEFORE CHECK IN DATE
                if (dateOut < dateIn)
                  setDateOut(
                    DateTime.fromISO(e.target.value)
                      .plus({ days: 1 })
                      .toISODate()
                  )
              }}
              InputProps={{
                inputProps: { min: new Date().toISOString().slice(0, 10) }
              }}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="mx-3">
            {dateIn ? (
              <TextField
                required
                id="dateOut"
                label="Check-out Date"
                type="date"
                format="dd/MM/yyyy"
                value={dateOut}
                defaultValue={DateTime.fromISO(dateIn)
                  .plus({ days: 1 })
                  .toISODate()}
                onChange={(e) => setDateOut(e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  inputProps: {
                    min: DateTime.fromISO(dateIn).plus({ days: 1 }).toISODate()
                  }
                }}
              />
            ) : (
              <TextField
                disabled
                required
                id="dateOut"
                label="Check-out Date"
                type="date"
                format="dd/MM/yyyy"
                InputLabelProps={{
                  shrink: true
                }}
              />
            )}
          </div>
          <div className="mx-3">
            <Button variant="contained" color="primary" onClick={onFindClick}>
              Find
            </Button>
          </div>
        </form>
      </Container>

      {found && (
        <>
          {nightsObj && (
            <VacancyTable
              nightsObj={nightsObj}
              roomNo={roomNo}
              bookedNights={bookedNights}
              setNightsChecked={setNightsChecked}
              nightsChecked={nightsChecked}
            />
          )}

          <div className="m-3">
            <Button variant="contained" color="primary">
              CLEAR ALL
            </Button>
          </div>
          <div className="m-3">
            <Button variant="contained" color="primary">
              CREATE ENQUIRY
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
