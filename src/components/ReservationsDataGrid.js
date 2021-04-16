import * as React from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { DateTime } from 'luxon'

const columns = [
  { field: 'id', headerName: 'Res ID', width: 100 },
  { field: 'status', headerName: 'Status', width: 150 },
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
].map((booking) => {
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
    amount: booking.amount.toFixed(2),
    remarks: booking.remarks
  }
})

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
