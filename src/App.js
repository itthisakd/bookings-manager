import { BrowserRouter, Switch, Route } from 'react-router-dom'
import React from 'react'
import ReactDOM from 'react-dom'
import LogInPage from './pages/LogInPage'
import InventoryPage from './pages/InventoryPage'
import TodayPage from './pages/TodayPage'
import AddBookingPage from './pages/AddBookingPage'
import EnquiryPage from './pages/EnquiryPage'
import ReservationsPage from './pages/ReservationsPage'
import RegisterPage from './pages/RegisterPage'

import './App.css'

const routesConfig = [
  { path: '/login', component: LogInPage },
  { path: '/register', component: RegisterPage },
  { path: '/inventory', component: InventoryPage },
  { path: '/today', component: TodayPage },
  { path: '/addbooking', component: AddBookingPage },
  { path: '/enquiry', component: EnquiryPage },
  { path: '/reservations', component: ReservationsPage }
  // { path: '/calendar', component: CalendarPage }
]



function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          {routesConfig.map(({ path, component }) => {
            return <Route {...{ path, component }} />
          })}
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
