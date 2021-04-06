/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import MenuBar from '../components/MenuBar.js'
import DatePicker from '../components/DatePicker'
import Container from '@material-ui/core/Container'
import DropDown from '../components/DropDown'
import InputBox from '../components/InputBox'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ReservationsDataGrid from '../components/ReservationsDataGrid'

export default function ReservationsPage() {
  return (
    <div>
      <MenuBar />
      <body className="flex flex-col items-center contents-center">
        <br />
        <form name="search-fields" className="outline-black w-11/12 flex ">
          <div className="h-1">
            <InputBox label="Reservation ID" type="number" />
          </div>
          <div>
            <InputBox label="Guest Name" type="search" />
          </div>
          <div>
            <DropDown
              label="Show Dates By"
              options={[
                { value: 'checkin', label: 'Check-in' },
                { value: 'checkout', label: 'Check-out' },
                { value: 'createdat', label: 'Created At' }
              ]}
            />
          </div>

          <div>
            <TextField
              id="date"
              label="Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <DropDown
              label="Filter By"
              options={[
                { value: 'all', label: 'All' },
                { value: 'booked', label: 'Booked' },
                { value: 'modified', label: 'Modified' },
                { value: 'cancelled', label: 'Cancelled' }
              ]}
            />
          </div>
          <div>
            <Button variant="contained" color="primary">
              Clear All
            </Button>
          </div>
          <div>
            <Button variant="contained" color="primary">
              Search
            </Button>
          </div>
        </form>

        <Container
          name="reservations"
          className="flex flex-row items-center contents-center justify-around"
        >
          <ReservationsDataGrid className="w-11/12 h-screen" />
        </Container>
      </body>
    </div>
  )
}
