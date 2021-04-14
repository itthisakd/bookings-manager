/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import React from 'react'
import MenuBar from '../components/MenuBar.js'
import Container from '@material-ui/core/Container'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import StaffCreateModal from '../components/StaffCreateModal'
import StaffRemoveModal from '../components/StaffRemoveModal'

export default function StaffPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)

  const handleCreateClick = () => {
    setOpenCreateModal(true)
  }

  const handleCreateModalClose = () => {
    setOpenCreateModal(false)
  }

  const handleRemoveModalClose = () => {
    setOpenRemoveModal(false)
    setCurrentRow(0)
  }

  const handleConfirmRemove = (id) => {
    // TODO –––––––––––– add DELETE API method
    // set the position of the staff with this ID to deactivated
    setOpenRemoveModal(false)
    setCurrentRow(0)
  }

  // TODO –––––––––––––– add GET API method to get following data
  const staffList = {
    staff: [
      {
        id: 1,
        username: 'aum',
        password: '1234',
        name: 'Itthisak D.',
        staffNumber: '112',
        position: 'superadmin'
      },
      {
        id: 2,
        username: 'chris',
        password: 'qwer',
        name: 'Chris W.',
        staffNumber: '113',
        position: 'admin'
      }
    ]
  }

  // TODO –––––––––––––––––––– add loading & delete completed pop up

  return (
    <div>
      <MenuBar />
      <br />
      <Container
        style={{
          width: '50%'
        }}
      >
        <div className="flex justify-end">
          <Typography
            variant="h5"
            component="h2"
            className="w-full text-left p-5"
          >
            <strong>Staff</strong>
          </Typography>
          <div className="p-5">
            <Button
              variant="contained"
              color="default"
              size="small"
              startIcon={<AddCircleIcon />}
              onClick={handleCreateClick}
              type="submit"
              color="primary"
            >
              Create
            </Button>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table className={{ minWidth: 650 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Staff No.</TableCell>
                <TableCell>Position</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffList.staff.map((staff) => {
                return (
                  <TableRow>
                    <TableCell>{staff.id}</TableCell>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.staffNumber}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="default"
                        size="small"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => {
                          setOpenRemoveModal(true)
                          setCurrentRow(staff.id)
                        }}
                      >
                        REMOVE
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <StaffCreateModal
        open={openCreateModal}
        handleClose={handleCreateModalClose}
      />
      <StaffRemoveModal
        open={openRemoveModal}
        handleClose={handleRemoveModalClose}
        handleConfirmRemove={handleConfirmRemove}
        currentRow={currentRow}
      />
    </div>
  )
}
