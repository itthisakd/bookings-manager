/** @jsxImportSource @emotion/react */
import React from 'react'
import { useState, useEffect } from 'react'
import MenuBar from '../components/shared/MenuBar.js'
import Container from '@material-ui/core/Container'
import EnquiryDataGrid from '../components/enquiry/EnquiryDataGrid'
import EnquiryModal from '../components/enquiry/EnquiryModal'
import axios from '../config/axios'

export default function EnquiryPage() {
  //SECTION: states and functions for MODAL
  const [open, setOpen] = useState(false)
  const [bookingInfo, setBookingInfo] = useState({})
  const [editRemarks, setEditRemarks] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [bookingInfoFrom, setBookingInfoFrom] = useState([])

  const handleClose = () => {
    setOpen(false)
    setEditRemarks(false)
    setOpenConfirmModal(false)
    //clear state
  }

  const fetchReservations = async () => {
    const res = await axios.get('/reservations/')
    setBookingInfoFrom(
      res.data.result.filter((booking) => booking.status === 'enquiry')
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
          <EnquiryDataGrid
            accessModal={accessModal}
            bookingInfoFrom={bookingInfoFrom}
          />
          <EnquiryModal
            open={open}
            setOpen={setOpen}
            handleClose={handleClose}
            bookingInfo={bookingInfo}
            fetchReservations={fetchReservations}
            editRemarks={editRemarks}
            setEditRemarks={setEditRemarks}
            setOpenConfirmModal={setOpenConfirmModal}
            openConfirmModal={openConfirmModal}
          />
        </Container>
      </body>
    </div>
  )
}
