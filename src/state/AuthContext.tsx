import React, { createContext, useState } from "react"
import { User } from "../types/user"

interface AuthContext {
  isAuthLoaded: boolean
  setIsAuthLoaded: (isAuthLoaded: boolean) => void
  accessToken: string
  user: User | null
  setTokenUser: (newAccessToken: string, user: User) => void
  clearTokenUser: () => void
}

const AuthContext = createContext<AuthContext>({
  isAuthLoaded: false,
  setIsAuthLoaded: () => {},
  accessToken: "",
  user: null,
  setTokenUser: () => {},
  clearTokenUser: () => {}
})

export default AuthContext

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string>('')
  const [user, setUser] = useState<User | null>(null)
  const [isAuthLoaded, setIsAuthLoaded] = useState(false)

  const setTokenUser = (newAccessToken: string, newUser: User) => {
    setAccessToken(newAccessToken)
    setUser(newUser)
  }

  const clearTokenUser = () => {
    setAccessToken("")
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthLoaded,
        setIsAuthLoaded,
        accessToken,
        user,
        setTokenUser,
        clearTokenUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
