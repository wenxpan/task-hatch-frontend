import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface Props {}

const PublicRoute: React.FC<Props> = ({}) => {
  const { isAuthLoaded, accessToken } = useAuth()

  const nav = useNavigate()

  useEffect(() => {
    if (accessToken) {
      nav("/home")
    }
  }, [accessToken])

  if (!isAuthLoaded) return null

  return <Outlet />
}

export default PublicRoute
