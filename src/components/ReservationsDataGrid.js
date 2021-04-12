import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'

const columns = [
  { field: 'id', headerName: 'Res ID', width: 100 },
  { field: 'status', headerName: 'Status', width: 100 },
  {
    field: 'created',
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
  { field: 'remarks', headerName: 'Remarks', type: 'string', width: 300 }
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
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'Amy Jones',
    amount: 1245.5,
    remarks: 'non-smoking'
  },
  {
    id: 2,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 3,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 4,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 5,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 999,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  },
  {
    id: 7,
    status: 'BOOKED',
    created: Date(2020, 11, 4),
    checkIn: Date(2021, 2, 12),
    checkOut: Date(2021, 2, 13),
    guest: 'David Thims',
    amount: 12245.5,
    remarks: 'non-smoking'
  }
]

export default function DataGridDemo(props) {
  const { accessModal } = props
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        // pageSize={10}
        checkboxSelection={false}
        autoPageSize
        rowHeight={45}
        // getRowId={(row) => row.id}
        onRowDoubleClick={accessModal}
      />
    </div>
  )
}
