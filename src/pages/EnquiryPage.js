/** @jsxImportSource @emotion/react */
import React from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import MenuBar from '../components/MenuBar.js'
import Container from '@material-ui/core/Container'
import EnquiryDataGrid from '../components/EnquiryDataGrid'
import EnquiryModal from '../components/EnquiryModal'
import { useForm } from 'react-hook-form'

export default function EnquiryPage() {
  //SECTION: states and functions for MODAL
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({})
  const [editRemarks, setEditRemarks] = useState(false)
  const { handleSubmit, register, getValues } = useForm()

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
      status: 'enquiry',
      createdAt: new Date(2020, 11, 4).toISOString(),
      updatedAt: null,
      checkIn: new Date(2021, 2, 12).toISOString(),
      checkOut: new Date(2021, 2, 13).toISOString(),
      guest: 'Amy Jones',
      phoneNumber: null,
      email: null,
      amount: 1245.5,
      paid: 0,
      remarks: null,
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
  ].filter((booking) => booking.status === 'enquiry')
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
          <EnquiryDataGrid accessModal={accessModal} />
          <EnquiryModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            bookingInfo={bookingInfo}
            editRemarks={editRemarks}
            setEditRemarks={setEditRemarks}
            register={register}
            handleSubmit={handleSubmit}
            getValues={getValues}
          />
        </Container>
      </body>
    </div>
  )
}
