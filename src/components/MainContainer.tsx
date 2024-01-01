import React, { useContext, useState } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import TaskContext from "../state/TaskContext"
import NavBar from "./NavBar"
import SideBar from "./SideBar"
import Overlay from "./Overlay"

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = ({}) => {
  const [isOverlayOn, setIsOverlayOn] = useState(false)

  const toggleOverlay = (): void => {
    setIsOverlayOn((prev: boolean) => !prev)
  }

  const { isLoaded } = useContext(TaskContext)
  return (
    <>
      <NavBar
        title="Task Hatch"
        logo="/task-hatch-logo.png"
        toggleOverlay={toggleOverlay}
      />
      <SideBar isOverlayOn={isOverlayOn} />
      <main className="p-4 md:ml-64 h-auto pt-20">
        {isLoaded ? <Outlet /> : <div>Loading...</div>}
      </main>
      <ToastContainer />
      <Overlay isOpen={isOverlayOn} toggleOverlay={toggleOverlay} zIndex={30} />
    </>
  )
}

export default MainContainer
