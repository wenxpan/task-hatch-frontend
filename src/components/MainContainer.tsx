import React, { useState } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import Overlay from "./Overlay"
import { useAuth } from "../hooks/useAuth"
import useTasks from "../hooks/useTasks"

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = ({}) => {
  const [isOverlayOn, setIsOverlayOn] = useState(false)

  const toggleOverlay = (): void => {
    setIsOverlayOn((prev: boolean) => !prev)
  }

  const { isAuthLoaded, accessToken } = useAuth()
  const { isTasksLoaded } = useTasks()

  if (!isAuthLoaded) {
    return null
  }

  if (!accessToken) {
    return <Navigate to="/login" />
  }

  return (
    <>
      <NavBar
        title="Task Hatch"
        logo="/task-hatch-logo.png"
        toggleOverlay={toggleOverlay}
      />
      <SideBar isOverlayOn={isOverlayOn} />
      <main className="p-4 md:ml-64 h-auto pt-20">
        {isTasksLoaded ? <Outlet /> : <div>Loading...</div>}
      </main>
      <ToastContainer />
      <Overlay isOpen={isOverlayOn} toggleOverlay={toggleOverlay} zIndex={30} />
    </>
  )
}

export default MainContainer
