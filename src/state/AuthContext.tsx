import React, { createContext, useEffect, useState } from "react"
import { User } from "../types/user"
import { authService } from "../services/authService"

interface AuthContext {
  isAuthLoaded: boolean
  accessToken: string | null
  user: User | null
  setTokenUser: (newAccessToken: string, user: User) => void
  clearTokenUser: () => void
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

  const setTokenUser = (newAccessToken: string, newUser: User) => {
    setAccessToken(newAccessToken)
    setUser(newUser)
  }

  const clearTokenUser = () => {
    setAccessToken(null)
    setUser(null)
  }

  useEffect(() => {
    const refreshAccessToken = async () => {
      try {
        const { accessToken: newAccessToken, user: newUser } =
          await authService.refreshToken()

        setTokenUser(newAccessToken, newUser)
      } catch (error) {
        console.error("Error refreshing token:", error)
      }
      setIsAuthLoaded(true)
    }

    refreshAccessToken()
  }, [])

  return (
    <AuthContext.Provider
      value={{ isAuthLoaded, accessToken, user, setTokenUser, clearTokenUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
