import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import LogInPage from './auth/LogInPage'
import InventoryPage from './pages/InventoryPage'
import TodayPage from './pages/TodayPage'
import AddBookingPage from './pages/AddBookingPage'
import EnquiryPage from './pages/EnquiryPage'
import ReservationsPage from './pages/ReservationsPage'
import CalendarPage from './pages/CalendarPage'
import CreateStaffPage from './pages/CreateStaffPage'
import StaffPage from './pages/StaffPage'
import RatesPage from './pages/RatesPage'
import localStorageService from './services/localStorageService'
import './App.css'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'

//SECTION: customise select

const publicRoutes = [{ path: '/login', component: LogInPage }]

const privateRoutes = [
  { path: '/inventory', component: InventoryPage },
  { path: '/today', component: TodayPage },
  { path: '/addbooking', component: AddBookingPage },
  { path: '/enquiry', component: EnquiryPage },
  { path: '/reservations', component: ReservationsPage },
  { path: '/calendar', component: CalendarPage },
  { path: '/staff/create', component: CreateStaffPage },
  { path: '/staff', component: StaffPage },
  { path: '/rates', component: RatesPage }
]

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorageService.getToken()
  )

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {privateRoutes.map(({ path, component }) => {
            return <Route key={path} exact {...{ path, component }} />
          })}
          {publicRoutes.map(({ path, component }) => {
            return <Route key={path} exact {...{ path, component }} />
          })}

          {/* FIXME OPEN AFTER TOKEN IS FINISHED */}
          {/* {localStorageService.getToken() &&
            privateRoutes.map(({ path, component }) => {
              return <Route exact {...{ path, component }} />
            })}
          {!localStorageService.getToken() &&
            publicRoutes.map(({ path, component }) => {
              return <Route exact {...{ path, component }} />
            })} */}
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
