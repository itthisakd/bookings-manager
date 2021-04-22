import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import TextField from '@material-ui/core/TextField'
import axios from '../config/axios'

export default function RatesPage() {
  const [roomTypes, setRoomTypes] = useState([])
  const [editMode, setEditMode] = useState(false)
  const { register, handleSubmit, getValues, errors, reset } = useForm()

  const fetchRates = async () => {
    const res = await axios.get('/rates/')
    setRoomTypes(res.data.roomTypes)
  }

  useEffect(() => {
    fetchRates()
  }, [])

  const handleEditClick = () => {
    setEditMode(true)
  }

  // const handleRateUpdates = () => {
  //   const newRates = {...getValues()}
  //   const updatedRates = roomTypes?.map((type) => {
  //     return { ...type, rates: newRates.id }
  //   })
  //   await axios.put('/rates/', { updatedRates })
  //   fetchRates()
  //   e.target.reset()
  //   setEditMode(false)
  // }

  const onSubmit = async (data, e) => {
    const newRates = { ...data }
    reset()
    console.log({ ...data })
    const updatedRates = roomTypes?.map((type) => {
      return { id: type.id, name: type.name, rate: Number(newRates[type.id]) }
    })
    await axios.put('/rates/', { updatedRates })
    fetchRates()
    setEditMode(false)
    // window.location.reload()
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
                {console.log(roomTypes)}
                {roomTypes?.map((type) => {
                  return editMode ? (
                    <TableRow>
                      <TableCell>{type.name}</TableCell>
                      <TableCell>
                        <TextField
                          required
                          {...register(`${type.id}`)}
                          key={type.id}
                          name={type.id}
                          variant="outlined"
                          size="small"
                          type="number"
                          placeholder={type.rate}
                          style={{ width: '100px' }}
                          error={!!errors?.typeId}
                          helperText={
                            !!errors?.message && errors?.message?.typeId
                          }
                          //FIXME ––––––––––––––––––– BUG: error messages not showin
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
