import LogInPage from '../auth/LogInPage'
import TodayPage from '../pages/TodayPage'
import AddBookingPage from '../pages/AddBookingPage'
import EnquiryPage from '../pages/EnquiryPage'
import ReservationsPage from '../pages/ReservationsPage'
import StaffPage from '../pages/StaffPage'
import RatesPage from '../pages/RatesPage'

const pages = {
  today: { path: '/today', page: TodayPage },
  addbooking: { path: '/addbooking', page: AddBookingPage },
  enquiry: { path: '/enquiry', page: EnquiryPage },
  reservations: { path: '/reservations', page: ReservationsPage },
  staff: { path: '/staff', page: StaffPage },
  rates: { path: '/rates', page: RatesPage },
  login: { path: '/login', page: LogInPage }
}

const roles = {
  ADMIN: [pages.today, pages.addbooking, pages.enquiry, pages.reservations],
  SUPERADMIN: [pages.staff, pages.rates],
  GUEST: [pages.login]
}

export default roles
