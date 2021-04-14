/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
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

export default function RatesPage() {
  //TODO –––––––––––––– GET API method to get following data
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
  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

  const preloadedRates = Object.fromEntries(
    roomTypes.types.map((type) => [type.id, type.rate])
  )

  const [editMode, setEditMode] = useState(false)
  const { register, handleSubmit, getValues, errors } = useForm({
    defaultValues: preloadedRates
  })
  //FIXME ––––––––––––––––––– BUG: data entered not set into data of useForm
  // problem seems to be that the input vale cant override default value

  const handleEditClick = () => {
    setEditMode(true)
  }

  const onSubmit = (data) => {
    console.log(getValues())
    setEditMode(false)
  }

  //TODO ––––––––––––––––– POST API method to update with data below
  const data = getValues()

  //TODO ––––––––––––––––– add loading & sucess

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
                  const roomId = type.id
                  return editMode ? (
                    <TableRow>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>
                        {/* <Controller
                          as={TextField}
                          key={type.id}
                          name={type.id}
                          variant="outlined"
                          size="small"
                          type="interger"
                          style={{ width: '100px' }}
                          control={control}
                          defaultValue={type.rate}
                          ref={register(`${type.id}`)}
                        /> */}
                        <TextField
                          {...register(`${type.id}`, {
                            required: 'Rate required!'
                          })}
                          key={type.id}
                          name={type.id}
                          variant="outlined"
                          size="small"
                          type="number"
                          defaultValue={type.rate}
                          style={{ width: '100px' }}
                          error={!!errors?.roomId}
                          helperText={
                            !!errors?.message && errors?.message?.roomId
                          }
                          //FIXME ––––––––––––––––––– BUG: error messages not showing
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
