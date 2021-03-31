/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactDOM from 'react-dom'
// import PostForm from "../components/PostForm.js";
import React from 'react'
import ReactDOM from 'react-dom'
// import RegisterForm from "../components/RegisterForm.js";

export default function RegisterPage() {
  const history = useHistory()
  return (
    <div class="flex flex-col items-center contents-center">
      <div class="flex flex-col max-w-lg px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
        <div class="self-center mb-2 text-xl font-light text-gray-800 sm:text-2xl dark:text-white">
          Register
        </div>
        <dpiv class="p-6">
          <form action="#">
            <div class="flex flex-col mb-2">
              <div class=" relative ">
                <input
                  type="text"
                  id="create-account-pseudo"
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="username"
                  placeholder="Username"
                />
              </div>
            </div>
            <div class="flex gap-4 mb-2">
              <div class=" relative ">
                <input
                  type="text"
                  id="create-account-first-name"
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div class=" relative ">
                <input
                  type="text"
                  id="create-account-last-name"
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div class="flex flex-col mb-2">
              <div class=" relative ">
                <input
                  type="text"
                  id="create-account-email"
                  class=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="ID Number"
                />
              </div>
            </div>
            <div class="flex w-full my-4">
              <button
                type="submit"
                class="py-2 px-4  bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Create account
              </button>
            </div>
          </form>
        </dpiv>
      </div>
    </div>
  )
}

// edit mount node
// ReactDOM.render(<Demo />, mountNode);
