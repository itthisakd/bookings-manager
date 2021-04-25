import React from 'react'
import axios from '../config/axios'
import { useState, useEffect } from 'react'
import MenuBar from '../components/shared/MenuBar.js'
import Container from '@material-ui/core/Container'
import ReservationsDataGrid from '../components/reservations/ReservationsDataGrid'
import ReservModal from '../components/reservations/ReservModal'

export default function ReservationsPage() {
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({})
  const [editRemarks, setEditRemarks] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [bookingInfoFrom, setBookingInfoFrom] = useState([])

  const handleClose = () => {
    setOpen(false)
    setEditRemarks(false)
    setOpenConfirmModal(false)
  }

  const fetchReservations = async () => {
    const res = await axios.get('/reservations/')
    setBookingInfoFrom(
      res.data.result.filter((booking) => booking.status !== 'enquiry')
    )
  }

  useEffect(() => {
    fetchReservations()
  }, [])

  const accessModal = async (row) => {
    await setBookingInfo(
      bookingInfoFrom.filter((booking) => booking.id === row.id)[0]
    )
    setOpen(true)
  }

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
          <ReservationsDataGrid
            accessModal={accessModal}
            bookingInfoFrom={bookingInfoFrom}
          />
          <ReservModal
            open={open}
            setOpen={setOpen}
            accessModal={accessModal}
            handleClose={handleClose}
            bookingInfo={bookingInfo}
            editRemarks={editRemarks}
            setEditRemarks={setEditRemarks}
            fetchReservations={fetchReservations}
            bookedNightsByResv={bookingInfo.bookedNights}
            setOpenConfirmModal={setOpenConfirmModal}
            openConfirmModal={openConfirmModal}
          />
        </Container>
      </body>
    </div>
  )
}
