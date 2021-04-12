/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
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
import Checkbox from '@material-ui/core/Checkbox'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import TextField from '@material-ui/core/TextField'

const roomTypes = {
  types: [
    {
      id: 1,
      name: 'Standard',
      rate: 1000
    },
    {
      id: 2,
      name: 'Superior',
      rate: 1500
    },
    {
      id: 3,
      name: 'Deluxe',
      rate: 2000
    }
  ]
}

const preloadedRates = Object.fromEntries(
  roomTypes.types.map((type) => [type.id, type.rate])
)

export default function RatesPage() {
  const [editMode, setEditMode] = useState(false)
  const { register, handleSubmit } = useForm({
    defaultValues: preloadedRates
  })

  const handleEditClick = () => {
    setEditMode(true)
  }

  const onSubmit = (data) => {
    console.log(data)
    setEditMode(false)
  }

  return (
    <div>
      <MenuBar />
      <br />
      <Container
        style={{
          width: '30%'
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-end">
            <Typography
              variant="h5"
              component="h2"
              className="w-full text-left p-5"
            >
              <strong>Rates</strong>
            </Typography>
            <div className="p-5">
              {!editMode && (
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={handleEditClick}
                  type="submit"
                >
                  Edit
                </Button>
              )}
              {!!editMode && (
                <Button
                  variant="contained"
                  color="default"
                  size="small"
                  color="secondary"
                  startIcon={<SaveAltIcon />}
                  type="submit"
                >
                  Save
                </Button>
              )}
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table
              className={{ minWidth: 650 }}
              size="medium"
              aria-label="dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Room Type</TableCell>
                  <TableCell>Rate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {roomTypes.types.map((type) => {
                  console.log(type.id)
                  return editMode ? (
                    <TableRow>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>
                        <TextField
                          //FIXME ––––––––––––––––––––––––––––––––––––values not registered
                          {...register(`${type.id}`)}
                          key={type.id}
                          name={type.id}
                          variant="outlined"
                          size="small"
                          type="interger"
                          style={{ width: '100px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ) : (
                    <TableRow>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>{type.rate}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </form>
      </Container>
    </div>
  )
}
