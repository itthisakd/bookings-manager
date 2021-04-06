/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import PostForm from "../components/PostForm.js";
import MenuBar from '../components/MenuBar.js'
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import VacancyTable from '../components/VacancyTable'

let found = true

export default function AddBookingPage() {
  return (
    <div>
      <MenuBar />
      <br />
      <Container
        name="reservations"
        className="flex flex-row items-center contents-center justify-around"
      >
        <form
          name="search-fields"
          className="w-min flex flex-row items-center contents-center justify-around m-auto"
        >
          <div className="mx-3">
            <TextField
              id="dateIn"
              label="Check-in Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              onChange={(e) => console.log(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="mx-3">
            <TextField
              id="dateOut"
              label="Check-out Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="mx-3">
            <Button variant="contained" color="primary">
              Find
            </Button>
          </div>
        </form>
      </Container>
      <VacancyTable />
      {/* {!found && <VacancyTable />} */}
    </div>
  )
}
