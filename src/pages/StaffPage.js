/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import PostForm from "../components/PostForm.js";
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
import EditIcon from '@material-ui/icons/Edit'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

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

export default function StaffPage() {
  return (
    <div>
      <MenuBar />
      <br />
      <Container
        style={{
          width: '50%'
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          className="w-full text-left p-5"
        >
          <strong>Staff</strong>
        </Typography>
        <TableContainer component={Paper}>
          <Table className={{ minWidth: 650 }} size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Staff No.</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Edit</TableCell>
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
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  )
}
