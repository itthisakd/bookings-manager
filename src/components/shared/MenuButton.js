import React, { useContext, useState } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import localStorageService from '../../services/localStorageService'
import { AuthContext } from '../../contexts/AuthContextProvider'

const menuOptions = {
  ADMIN: [
    { path: '/addbooking', name: 'New Booking' },
    { path: '/today', name: 'Today' },
    { path: '/reservations', name: 'Reservations' },
    { path: '/enquiry', name: 'Enquiries' }
  ],
  SUPERADMIN: [
    { path: '/staff', name: 'Staff' },
    { path: '/rates', name: 'Rates' }
  ]
}

export default function SimpleMenu() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)
  let role = isAuthenticated.role || 'GUEST'

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuOptions[role]?.map(({ path, name }) => {
          return (
            <MenuItem key={path} onClick={() => history.push(path)}>
              {name}
            </MenuItem>
          )
        })}
      </Menu>
    </div>
  )
}
