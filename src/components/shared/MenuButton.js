import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { useHistory } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

const menuOptions = [
  { path: '/addbooking', name: 'New Booking' },
  { path: '/today', name: 'Today' },
  { path: '/reservations', name: 'Reservations' },
  { path: '/enquiry', name: 'Enquiries' },
  // { path: '/inventory', name: 'Inventory' },
  // { path: '/calendar', name: 'Calendar' },
  { path: '/rates', name: 'Rates' },
  { path: '/staff', name: 'Staff' }
  // { path: '/rooms', name: 'Room Status' }
]

export default function SimpleMenu() {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null)

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
        {menuOptions.map(({ path, name }) => {
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
