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
  { field: 'status', headerName: 'Status', width: 150 },

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
  {
    field: 'nights',
    headerName: 'Nights',
    type: 'date',
    sortable: true,
    width: 100
  },
  { field: 'guest', headerName: 'Guest', sortable: true, width: 150 },

  { field: 'amount', headerName: 'Amount', type: 'number', width: 130 },
  { field: 'remarks', headerName: 'Remarks', type: 'string', width: 300 }
]

export default function DataGridDemo(props) {
  const { bookingInfoFrom, accessModal } = props

  const rows = bookingInfoFrom.map((booking) => {
    return {
      id: booking.id,
      status:
        booking.status === 'checkedin'
          ? 'CHECKED-IN'
          : booking.status === 'checkedout'
          ? 'CHECKED-OUT'
          : booking.status.toUpperCase(),
      createdAt: DateTime.fromISO(booking.createdAt).toFormat('dd LLL yyyy'),
      updatedAt: booking.updatedAt
        ? DateTime.fromISO(booking.updatedAt).toFormat('dd LLL yyyy')
        : null,
      checkIn: DateTime.fromISO(booking.checkIn).toFormat('dd LLL yyyy'),
      checkOut: DateTime.fromISO(booking.checkOut).toFormat('dd LLL yyyy'),
      guest: booking.guest,
      amount: Number(booking.amount).toFixed(2),
      remarks: booking.remarks,
      nights: DateTime.fromISO(booking.checkOut).diff(
        DateTime.fromISO(booking.checkIn),
        'days'
      ).days
    }
  })

  return (
    <div style={{ height: '80vh', width: '100%' }}>
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
