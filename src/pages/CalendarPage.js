/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import React from 'react'
import MenuBar from '../components/MenuBar.js'

export default function CalendarPage() {
  return (
    <div>
      <MenuBar />
      Calendar here
    </div>
  )
}
