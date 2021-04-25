import { useState, useContext } from 'react'
import MenuBar from '../components/shared/MenuBar.js'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import VacancyTable from '../components/addbooking/VacancyTable'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Snackbar from '../components/shared/Snackbar'
import * as yup from 'yup'
import axios from '../config/axios'
import { useHistory } from 'react-router-dom'
import nightsGenerator from '../utilities/nightsGenerator'
import { AuthContext } from '../contexts/AuthContextProvider'

const { DateTime } = require('luxon')

const schema = yup.object().shape({
  guest: yup.string().required('Guest Name is required.'),
  checkIn: yup.date().required('Check-in Date is required.'),
  checkOut: yup.date().required('Check-in Date is required.')
})

export default function AddBookingPage() {
  const [dateIn, setDateIn] = useState('')
  const [dateOut, setDateOut] = useState('')
  const [nightsObj, setNightsObj] = useState({})
  const [found, setFound] = useState(false)
  const [nightsChecked, setNightsChecked] = useState([])
  const [details, setDetails] = useState({})
  const [openSnackbar, setOpenSnackbar] = useState(false)
  const history = useHistory()

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const { isAuthenticated } = useContext(AuthContext)

  const onFindClick = () => {
    if (dateIn && dateOut) {
      setNightsObj(nightsGenerator(dateIn, dateOut))
      setFound(true)
    }
  }

  const onSubmit = (data) => {
    setDetails(data)
  }

  const onCreateClick = async () => {
    console.log('HERE', isAuthenticated)
    if (nightsChecked) {
      await axios
        .post('/reservations/', {
          guest: details.guest,
          status: 'enquiry',
          staffId: isAuthenticated.staffId,
          checkIn: nightsChecked[0].date,
          checkOut: DateTime.fromISO(
            nightsChecked[nightsChecked.length - 1].date
          )
            .plus({ days: 1 })
            .toString()
            .slice(0, 10),
          nightsChecked: nightsChecked
        })
        .then(() => {
          setOpenSnackbar({
            open: true,
            status: 'success',
            message: 'Enquiry created successfully!'
          })
        })
    }
  }

  //TODO –––––––––––––– POST API method to create reservation
  //data in:
  // const data = {
  //   guest: 'Guest',
  //   checkIn: '2020-12-12',
  //   checkOut: '2020-12-13',
  //   nightsChecked: [
  //     { room: 110, date: '2021-04-20' },
  //     { room: 110, date: '2021-04-21' },
  //     { room: 111, date: '2021-04-21' }
  //   ]
  // }

  return (
    <div>
      <MenuBar />
      <br />
      <Snackbar
        status="success"
        message="Enquiry created successfully!"
        open={openSnackbar}
        setOpen={setOpenSnackbar}
        redirect={() => history.push('/enquiry')}
      />
      <Container
        name="reservations"
        className="flex flex-row items-center contents-center justify-around"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-min flex flex-row items-center contents-center justify-center m-auto"
          noValidate
          autoComplete="off"
        >
          <div className="mx-3">
            <TextField
              type="text"
              required
              {...register('guest')}
              label="Guest"
              name="guest"
              error={!!errors?.guest}
              helperText={errors?.guest?.message}
            />
          </div>
          <div className="mx-3">
            <TextField
              required
              {...register('checkIn')}
              name="checkIn"
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
              error={!!errors?.checkIn}
              helperText={errors?.checkIn?.message}
            />
          </div>
          <div className="mx-3">
            {dateIn ? (
              <TextField
                {...register('checkOut')}
                required
                name="checkOut"
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
                error={!!errors?.checkOut}
                helperText={errors?.checkOut?.message}
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
            <Button
              variant="contained"
              color="primary"
              type="submit"
              onClick={onFindClick}
            >
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
              nightsChecked={nightsChecked}
              setNightsChecked={setNightsChecked}
              onCreateClick={onCreateClick}
            />
          )}
        </>
      )}
    </div>
  )
}
