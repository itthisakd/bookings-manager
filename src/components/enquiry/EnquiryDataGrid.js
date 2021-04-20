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

export default function DataGridDemo(props) {
  const { accessModal, bookingInfoFrom } = props

  const rows = bookingInfoFrom
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
