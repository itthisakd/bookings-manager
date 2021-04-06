/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import PostForm from "../components/PostForm.js";
import React from 'react'
import MenuBar from '../components/MenuBar.js'
import ReservationsDataGrid from '../components/ReservationsDataGrid'
import Container from '@material-ui/core/Container'

export default function EnquiriesPage() {
  return (
    <div>
      <MenuBar />
      <br />
      <Container
        name="reservations"
        className="flex flex-row items-center contents-center justify-around"
      >
        <ReservationsDataGrid className="w-11/12 h-screen" />
      </Container>
    </div>
  )
}
