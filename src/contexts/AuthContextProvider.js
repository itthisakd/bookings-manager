import { createContext } from 'react'
import { useState } from 'react'
import localStorageService from '../services/localStorageService'

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorageService.getToken()
  )
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
