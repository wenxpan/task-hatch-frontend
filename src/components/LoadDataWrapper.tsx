import React, { useEffect } from "react"
import useTasks from "../hooks/useTasks"
import { useAuth } from "../hooks/useAuth"

interface Props {
  children: React.ReactNode
}

const LoadDataWrapper: React.FC<Props> = ({ children }) => {
  const { accessToken, refreshAccessToken, isAuthLoaded } = useAuth()
  const { fetchAllTasks } = useTasks()

  useEffect(() => {
    const loadData = async () => {
      if (!isAuthLoaded) {
        await refreshAccessToken()
      }
      if (accessToken) {
        await fetchAllTasks()
      }
    }
    loadData()
  }, [isAuthLoaded, accessToken])

  return <>{children}</>
}

export default LoadDataWrapper
