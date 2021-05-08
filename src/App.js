import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import React from 'react'
import { useContext } from 'react'
import './App.css'
import roles from './config/roles'
import { AuthContext } from './contexts/AuthContextProvider'

function App() {
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext)

  let role = isAuthenticated ? isAuthenticated.role : 'GUEST'

  return (
    <div>
      <BrowserRouter>
        <Switch>
          {roles[role].map(({ path, page: PageComponent }, idx) => {
            console.log('path, page', path, PageComponent)
            return (
              <Route key={idx} exact path={path}>
                <PageComponent />
              </Route>
            )
          })}
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

// function PrivateRoutes(props) {
//   let role = props.role || 'GUEST'

//   return (
//     <BrowserRouter>
//       <Switch>
//         {RolesList[role].map(({ path, page: PageComponent }, idx) => (
//           <Route key={idx} exact path={path}>
//             <PageComponent />
//           </Route>
//         ))}
//         <Route path="*" component={NotFound} />
//       </Switch>
//     </BrowserRouter>
//   )
// }

// import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
// import React from 'react'
// import { useState } from 'react'
// import LogInPage from './auth/LogInPage'
// import TodayPage from './pages/TodayPage'
// import AddBookingPage from './pages/AddBookingPage'
// import EnquiryPage from './pages/EnquiryPage'
// import ReservationsPage from './pages/ReservationsPage'
// import StaffPage from './pages/StaffPage'
// import RatesPage from './pages/RatesPage'
// import localStorageService from './services/localStorageService'
// import './App.css'

// //SECTION: customise select

// const publicRoutes = [{ path: '/login', component: LogInPage }]

// const privateRoutes = [
//   { path: '/today', component: TodayPage },
//   { path: '/addbooking', component: AddBookingPage },
//   { path: '/enquiry', component: EnquiryPage },
//   { path: '/reservations', component: ReservationsPage },
//   { path: '/staff', component: StaffPage },
//   { path: '/rates', component: RatesPage }
// ]

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(
//     localStorageService.getToken()
//   )

//   return (
//     <div>
//       <BrowserRouter>
//         <Switch>
//           {privateRoutes.map(({ path, component }) => {
//             return <Route key={path} exact {...{ path, component }} />
//           })}
//           {publicRoutes.map(({ path, component }) => {
//             return <Route key={path} exact {...{ path, component }} />
//           })}

//           {/* {localStorageService.getToken() &&
//             privateRoutes.map(({ path, component }) => {
//               return <Route exact {...{ path, component }} />
//             })}
//           {!localStorageService.getToken() &&
//             publicRoutes.map(({ path, component }) => {
//               return <Route exact {...{ path, component }} />
//             })} */}
//           <Redirect to="/login" />
//         </Switch>
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App
