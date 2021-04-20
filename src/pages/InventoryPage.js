/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
// import PostForm from "../components/PostForm.js";
import React from 'react'
import MenuBar from '../components/shared/MenuBar.js'
import Button from '@material-ui/core/Button'
import { Container, IconButton, TextField } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'

export default function InventoryPage() {
  return (
    <div>
      <MenuBar />
      <Container
        name="reservations"
        className="flex flex-row items-center contents-center justify-around"
      >
        <form
          name="search-fields"
          className="w-min flex flex-row items-center contents-center justify-around my-3"
        >
          <div className="mx-1">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              // onClick={handleClick}
            >
              <SkipPreviousIcon />
            </IconButton>
          </div>
          <div className="mx-1">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              // onClick={handleClick}
            >
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <div className="mx-1">
            <TextField
              id="dateIn"
              label="Check-in Date"
              type="date"
              defaultValue={new Date().toISOString().slice(0, 10)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div className="mx-1">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              // onClick={handleClick}
            >
              <ChevronRightIcon />
            </IconButton>
          </div>
          <div className="mx-1">
            <IconButton
              aria-controls="simple-menu"
              aria-haspopup="true"
              // onClick={handleClick}
            >
              <SkipNextIcon />
            </IconButton>
          </div>
        </form>
      </Container>
    </div>
  )
}
