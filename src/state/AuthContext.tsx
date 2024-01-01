import axios from "axios"
import React, { createContext, useEffect, useState } from "react"

interface User {
  id: string
  username: string
}

interface AuthContext {
  isAuthLoaded: boolean
  accessToken: string | null
  user: User | null
  login: (newAccessToken: string, user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContext | null>(null)

export default AuthContext

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  const login = (newAccessToken: string, user: User) => {
    setAccessToken(newAccessToken)
    setUser(user)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    // TODO: logout logic such as invalidating tokens
  }

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const response = await axios.post("/refresh_token")
        const { accessToken, user } = response.data

        login(accessToken, user)
      } catch (error) {
        console.error("Error refreshing token:", error)
      }
      setIsAuthLoaded(true)
    }

    refreshAccessToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthLoaded, accessToken, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}
