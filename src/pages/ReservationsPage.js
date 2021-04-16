/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import MenuBar from '../components/MenuBar.js'
import Container from '@material-ui/core/Container'
import ReservationsDataGrid from '../components/ReservationsDataGrid'
import ReservModal from '../components/ReservModal'

const { DateTime } = require('luxon')

export default function ReservationsPage() {
  //SECTION: states and functions for MODAL
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({})
  const [editRemarks, setEditRemarks] = useState(false)

  const handleClose = () => {
    setOpen(false)
    setEditRemarks(false)
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
      checkIn: DateTime.now().toString().slice(0, 10),
      checkOut: new Date(2021, 2, 13).toISOString(),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
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
    },
    {
      id: 111,
      status: 'checkedin',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: DateTime.now().toString().slice(0, 10),
      checkOut: new Date(2021, 2, 13).toISOString(),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
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
    },
    {
      id: 112,
      status: 'checkedin',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: new Date(2021, 2, 12).toISOString(),
      checkOut: DateTime.now().toString().slice(0, 10),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 0,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
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
    },
    {
      id: 115,
      status: 'checkedout',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: new Date(2020, 11, 4).toISOString(),
      checkOut: DateTime.now().toString().slice(0, 10),
      guest: 'Amy Jones',
      phoneNumber: '0925436174',
      email: 'yoohoo@yahoo.com',
      amount: 1245.5,
      paid: 1,
      remarks: 'non-smoking',
      bookedNights: [
        {
          reservationId: 999,
          roomNum: 220,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        },
        {
          reservationId: 999,
          roomNum: 221,
          nightlyDate: new Date(2021, 2, 12).toISOString()
        }
      ],
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

        <Container
          name="reservations"
          className="flex flex-row items-center contents-center justify-around p-0 m-0 w-full"
          disableGutters
        >
          <ReservationsDataGrid accessModal={accessModal} />
          <ReservModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            bookingInfo={bookingInfo}
            editRemarks={editRemarks}
            setEditRemarks={setEditRemarks}
            bookedNightsByResv={bookingInfo.bookedNights}
          />
        </Container>
      </body>
    </div>
  )
}
