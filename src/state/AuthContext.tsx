import React, { createContext, useState } from "react"

interface User {
  id: string
  username: string
}

interface AuthContext {
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

  const login = (newAccessToken: string, user: User) => {
    setAccessToken(newAccessToken)
    setUser(user)
  }

  const logout = () => {
    setAccessToken(null)
    setUser(null)
    // TODO: logout logic such as invalidating tokens
  }

  return (
    <AuthContext.Provider value={{ accessToken, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
