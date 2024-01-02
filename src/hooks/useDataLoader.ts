import { useEffect } from "react"
import { useAuth } from "./useAuth"
import useTasks from "./useTasks"

const useDataLoader = () => {
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
}

export default useDataLoader
