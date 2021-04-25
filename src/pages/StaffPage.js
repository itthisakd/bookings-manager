import { useState, useEffect } from 'react'
import React from 'react'
import MenuBar from '../components/shared/MenuBar.js'
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
import StaffCreateModal from '../components/staff/StaffCreateModal'
import StaffRemoveModal from '../components/staff/StaffRemoveModal'
import axios from '../config/axios'

export default function StaffPage() {
  const [openCreateModal, setOpenCreateModal] = useState(false)
  const [openRemoveModal, setOpenRemoveModal] = useState(false)
  const [currentRow, setCurrentRow] = useState(0)
  const [staffList, setStaffList] = useState([])
  const [openSnackbar, setOpenSnackbar] = useState(false)

  const fetchStaff = async () => {
    const res = await axios.get('/staff/')
    setStaffList(res.data.staffs)
    console.log(res.data.staffs)
  }

  useEffect(() => {
    fetchStaff()
  }, [])

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

  const handleConfirmRemove = async () => {
    await axios.patch('/staff/', { id: currentRow, position: 'deactivated' })
    fetchStaff().then(() => {
      setOpenSnackbar({
        open: true,
        status: 'success',
        message: 'Account deactivated successfully!'
      })
    })
    setOpenRemoveModal(false)
    setCurrentRow(0)
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
              {staffList.map((staff) => {
                return staff.position === 'deactivated' ? null : (
                  <TableRow>
                    <TableCell>{staff.id}</TableCell>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.name}</TableCell>
                    <TableCell>{staff.staffNumber}</TableCell>
                    <TableCell>{staff.position}</TableCell>
                    <TableCell>
                      {staff.position === 'superadmin' ? null : (
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
                      )}
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
        fetchStaff={fetchStaff}
        openSnackbar={openSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        staff={staffList.map((staff) => staff.username)}
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
