import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface Props {}

const PublicRoute: React.FC<Props> = ({}) => {
  const { isAuthLoaded, accessToken } = useAuth()

  if (!isAuthLoaded) return null
  if (accessToken) return <Navigate to="/home" />

  return <Outlet />
}

export default PublicRoute
