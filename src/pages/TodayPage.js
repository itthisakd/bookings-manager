/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import PostForm from "../components/PostForm.js";
import React from 'react'
import MenuBar from '../components/MenuBar.js'
import DatePicker from '../components/DatePicker'
import Container from '@material-ui/core/Container'
import CheckOutTodayGrid from '../components/CheckOutTodayGrid'
import CheckInTodayGrid from '../components/CheckInTodayGrid'
// import 'fontsource-roboto'
import Typography from '@material-ui/core/Typography'

export default function TodayPage() {
  return (
    <div>
      <MenuBar />
      <body className="flex flex-col items-center contents-center">
        <br />
        <DatePicker
          label="Date"
          default={new Date().toISOString().slice(0, 10)}
        />
        <Container name="reservations" className="p-0 m-0 h-full w-full">
          <div className="inline-block w-1/2 h-screen p-0 m-0">
            <Typography
              variant="h5"
              component="h2"
              className="w-full text-center p-0"
            >
              <strong>Check-in</strong>
            </Typography>
            <CheckInTodayGrid className="inline-block w-full h-screen p-0 m-0" />
          </div>
          <div className="inline-block w-1/2 h-screen p-0 m-0">
            <Typography
              variant="h5"
              component="h2"
              className="w-full text-center p-0"
            >
              <strong>Check-out</strong>
            </Typography>
            <CheckOutTodayGrid className="inline-block w-full h-screen p-0 m-0" />
          </div>
          {/* <Container
            name="checkin"
            className="inline w-min p-0 m-0"
          ></Container>
          <Container
            name="checkout"
            className=" inline w-min p-0 m-0"
          ></Container> */}
        </Container>
      </body>
    </div>
  )
}
