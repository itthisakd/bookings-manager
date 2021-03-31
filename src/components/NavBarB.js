/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import React, { useState } from 'react'

// const { SubMenu } = Menu;

// function Navbar() {
//   const [current, setCurrent] = useState("mail");

//

//   const handleClick = (e) => {
//     console.log("click ", e);
//     setCurrent(e.key);
//   };
//   return (
//     <div>
//       <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
//         <Menu.Item key="today" onClick={() => history.push("/today")}>
//           Today's Bookings
//         </Menu.Item>
//         <Menu.Item
//           key="reservations"
//           onClick={() => history.push("/reservations")}
//         >
//           Reservations
//         </Menu.Item>
//         <Menu.Item key="enquiries" onClick={() => history.push("/enquiry")}>
//           Enquiries
//         </Menu.Item>
//         <Menu.Item key="inventory" onClick={() => history.push("/inventory")}>
//           Inventory
//         </Menu.Item>
//         <Menu.Item key="calendar" onClick={() => history.push("/calendar")}>
//           Calendar
//         </Menu.Item>
//         <Menu.Item
//           key="addbooking"
//           icon={<PlusCircleOutlined />}
//           onClick={() => history.push("/addbooking")}
//           css={css`
//             position: relative;
//             left: 440px;
//           `}
//         >
//           New Booking
//         </Menu.Item>
//         <SubMenu
//           key="account"
//           icon={<UserOutlined />}

//           css={css`
//             position: relative;
//             left: 440px;
//           `}
//         >
//           <Menu.Item key="logout" icon={<LogoutOutlined />}
//           onClick={() => history.push("/login")}>
//             Log out
//           </Menu.Item>
//         </SubMenu>
//       </Menu>
//     </div>
//   );
// }

// export default Navbar;

import 'tailwindcss/tailwind.css'

export default function Navbar(props) {
  const history = useHistory()
  const [current, setCurrent] = useState('mail')

  
    const handleClick = (e) => {
      console.log("click ", e);
      setCurrent(e.key);
    };
  return (
    <div onClick={handleClick}>
      <nav className="bg-white dark:bg-gray-800  shadow ">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            <div className=" flex items-center">
              {/* <a className="flex-shrink-0" href="/">
                <img
                  className="h-8 w-8"
                  src="/icons/rocket.svg"
                  alt="Workflow"
                />
              </a> */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    key="today"
                    className={`${
                      props.page === 'today' ? 'text-gray-800' : 'text-gray-300'
                    }hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={() => history.push('/today')}
                  >
                    Today's Bookings
                  </button>
                  <button
                    key="reservations"
                    className={`${
                      props.page === 'reservations'
                        ? 'text-gray-800'
                        : 'text-gray-300'
                    }hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={() => history.push('/reservations')}
                  >
                    Reservations
                  </button>
                  <button
                    key="enquiry"
                    className={`${
                      props.page === 'enquiry'
                        ? 'text-gray-800'
                        : 'text-gray-300'
                    }hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={() => history.push('/enquiry')}
                  >
                    Enquiries
                  </button>
                  <button
                    className={`${
                      props.page === 'enquiry'
                        ? 'text-gray-800'
                        : 'text-gray-300'
                    }hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={() => history.push('/inventory')}
                  >
                    Inventory
                  </button>
                  {/* <button
                    className="text-gray-300  hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    onClick={() => history.push('/calendar')}
                  >
                    Calendar
                  </button> */}
                  <button
                    className={`${
                      props.page === 'enquiry'
                        ? 'text-gray-800'
                        : 'text-gray-300'
                    }hover:text-gray-800 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                    onClick={() => history.push('/addbooking')}
                  >
                    New Booking
                  </button>
                </div>
              </div>
            </div>
            <div className="block">
              <div className="ml-4 flex items-center md:ml-6">
                <div className="ml-3 relative">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        className="  flex items-center justify-center w-full rounded-md  px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-500"
                        id="options-menu"
                      >
                        <svg
                          width="20"
                          fill="currentColor"
                          height="20"
                          className="text-gray-800"
                          viewBox="0 0 1792 1792"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1 "
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <button
                          className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600"
                          role="menuitem"
                        >
                          <span
                            className="flex flex-col"
                            onClick={() => history.push('/login')}
                          >
                            <span>Logout</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button className="text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
                <svg
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="h-8 w-8"
                  viewBox="0 0 1792 1792"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Home
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Gallery
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Content
            </a>
            <a
              className="text-gray-300 hover:text-gray-800 dark:hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              href="/#"
            >
              Contact
            </a>
          </div>
        </div> */}
      </nav>
    </div>
  )
}
