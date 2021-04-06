import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import AddCircleIcon from '@material-ui/icons/AddCircle'
import {useHistory} from "react-router-dom"

const menuOptions = [
  "Today's Bookings",
  'Reservations',
  'Enquiries',
  'Inventory',
  'Calendar'
]

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
            // className="flex-col justify-between align-center"
          >
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={() => history.push('/today')}
              color="inherit"
            >
              <AddCircleIcon />
            </IconButton>
            <Tab
              label="Today's Bookings"
              onClick={() => history.push('/today')}
            />
            <Tab
              label="Reservations"
              onClick={() => history.push('/reservations')}
            />
            <Tab label="Enquiries" onClick={() => history.push('/enquiry')} />
            <Tab label="Inventory" onClick={() => history.push('/inventory')} />
            <Tab label="Calendar" onClick={() => history.push('/calendar')} />
            {auth && (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
          </Tabs>
        </div>
      </AppBar>
    </div>
  )
}
