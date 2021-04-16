import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { DateTime } from 'luxon'

const columns = [
  { field: 'id', headerName: 'Res ID', width: 100 },
  {
    field: 'createdAt',
    headerName: 'Created',
    type: 'date',
    sortable: true,
    width: 150
  },
  {
    field: 'checkIn',
    headerName: 'Check-in',
    type: 'date',
    sortable: true,
    width: 150
  },
  {
    field: 'checkOut',
    headerName: 'Check-out',
    type: 'date',
    sortable: true,
    width: 150
  },
  { field: 'guest', headerName: 'Guest', sortable: true, width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 130 },
  { field: 'type', headerName: 'Type', width: 300 }
  //exmaple
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${
  //       params.getValue('lastName') || ''
  //     }`
  // }
]

const rows = [
  {
    id: 1,
    status: 'BOOKED',
    createdAt: new Date(2020, 11, 4).toISOString(),
    updatedAt: null,
    checkIn: new Date(2021, 2, 12).toISOString(),
    checkOut: new Date(2021, 2, 13).toISOString(),
    guest: 'Amy Jones',
    amount: 1245.5,
    remarks: 'non-smoking'
  },
  {
    id: 2,
    status: 'BOOKED',
    createdAt: new Date(2020, 11, 4).toISOString(),
    updatedAt: null,
    checkIn: new Date(2021, 2, 12).toISOString(),
    checkOut: new Date(2021, 2, 13).toISOString(),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 3,
    status: 'BOOKED',
    createdAt: new Date(2020, 11, 4).toISOString(),
    updatedAt: null,
    checkIn: new Date(2021, 2, 12).toISOString(),
    checkOut: new Date(2021, 2, 13).toISOString(),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 4,
    status: 'BOOKED',
    createdAt: new Date(2020, 11, 4).toISOString(),
    updatedAt: null,
    checkIn: new Date(2021, 2, 12).toISOString(),
    checkOut: new Date(2021, 2, 13).toISOString(),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 5,
    status: 'BOOKED',
    createdAt: new Date(2020, 11, 4).toISOString(),
    updatedAt: null,
    checkIn: new Date(2021, 2, 12).toISOString(),
    checkOut: new Date(2021, 2, 13).toISOString(),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
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
      },
      {
        num: 212,
        type: 'Superior',
        inDate: new Date(2021, 2, 12).toISOString(),
        outDate: new Date(2021, 2, 13).toISOString(),
        rate: 1500
      }
    ]
  },
  {
    id: 7,
    status: 'BOOKED',
    createdAt: new Date(2020, 11, 4).toISOString(),
    updatedAt: null,
    checkIn: new Date(2021, 2, 12).toISOString(),
    checkOut: new Date(2021, 2, 13).toISOString(),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  }
]
  .filter((booking) => booking.status === 'enquiry')
  .map((booking) => {
    console.log(
      booking.rooms
        .map((room) => room.type)
        .filter((v, i, a) => a.indexOf(v) === i)
        .join(', ')
        .slice(0, -2)
    )
    return {
      id: booking.id,
      status: booking.status.toUpperCase(),
      createdAt: DateTime.fromISO(booking.createdAt).toFormat('dd LLL yyyy'),
      checkIn: DateTime.fromISO(booking.checkIn).toFormat('dd LLL yyyy'),
      checkOut: DateTime.fromISO(booking.checkOut).toFormat('dd LLL yyyy'),
      guest: booking.guest,
      amount: booking.amount.toFixed(2),
      type: Object.entries(
        booking.rooms
          .map((room) => room.type)
          .reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
              acc[curr] = 1
            } else {
              acc[curr] += 1
            }

            return acc
          }, {})
      )
        .map((item) => item.join(' x'))
        .join(', ')
    }
  })

export default function DataGridDemo(props) {
  const { accessModal } = props
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection={false}
        autoPageSize
        rowHeight={45}
        onRowDoubleClick={accessModal}
      />
    </div>
  )
}
