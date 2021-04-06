import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  {
    field: 'room',
    headerName: 'Room',
    sortable: true,
    width: 90
  },
  { field: 'guest', headerName: 'Guest', sortable: true, width: 150 },
  { field: 'amount', headerName: 'Amount', type: 'number', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 }
]

const rows = [
  {
    id: 1,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'Amy Jones',
    amount: 1245.5
  },
  {
    id: 2,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5
  }
]

export default function DataGridDemo({ className }) {
  return (
    <div
      // style={{ height: 1000, width: '66.7%' }}
      className={`${className ? className : ''}`}
    >
      <DataGrid rows={rows} columns={columns} pageSize={17} />
    </div>
  )
}
