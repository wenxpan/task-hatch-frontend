import React, { useContext } from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import TaskContext from "../state/TaskContext"

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = () => {
  const { isLoaded } = useContext(TaskContext)
  return (
    <>
      <main className="p-4 md:ml-64 h-auto pt-20">
        {isLoaded ? <Outlet /> : <div>Loading...</div>}
      </main>
      <ToastContainer />
    </>
  )
}

export default MainContainer
