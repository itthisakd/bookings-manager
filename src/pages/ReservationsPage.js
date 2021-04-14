/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import MenuBar from '../components/MenuBar.js'
import Container from '@material-ui/core/Container'
import ReservationsDataGrid from '../components/ReservationsDataGrid'
import ReservModal from '../components/ResrvModal'

export default function ReservationsPage() {
  //SECTION: states and functions for MODAL
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({})

  const handleClose = () => {
    setOpen(false)
    //clear state
  }
  //––––––––––––––––––––––––––––––––––––––––––––––––

  //TODO –––––––––––––– add GET API method to get all bookingInfo in the format of
  const bookingInfoFrom = [
    {
      id: 999,
      status: 'booked',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: new Date(2021, 2, 12).toISOString(),
      checkOut: new Date(2021, 2, 13).toISOString(),
      guestName: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      rooms: [
        {
          num: 220,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        },
        {
          num: 221,
          type: 'Deluxe',
          inDate: new Date(2021, 2, 12).toISOString(),
          outDate: new Date(2021, 2, 13).toISOString(),
          rate: 1500
        }
      ]
    }
  ].filter((booking) => booking.status !== 'enquiry')
  //––––––––––––––––––––––––––––––––––––––––––––––––

  //SECTION: states and functions for ReservationsDataGrid
  const accessModal = async (row) => {
    console.log('row.id :>> ', row.id)
    //then set reservation by id, and set state of bookingInfo with info from reservation
    await setBookingInfo(
      bookingInfoFrom.filter((booking) => booking.id == row.id)[0]
    )
    // then opne modal and display modal with the state
    setOpen(true)
  }
  //––––––––––––––––––––––––––––––––––––––––––––––––

  return (
    <div>
      <MenuBar />
      <body className="flex flex-col items-center contents-center">
        <br />
        {/* <form name="search-fields" className="outline-black w-11/12 flex ">
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
        </form> */}

        <Container
          name="reservations"
          className="flex flex-row items-center contents-center justify-around p-0 m-0 w-full"
          disableGutters
        >
          <ReservationsDataGrid
            accessModal={accessModal}
            bookingInfo={bookingInfo}
          />
          <ReservModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            bookingInfo={bookingInfo}
          />
        </Container>
      </body>
    </div>
  )
}
