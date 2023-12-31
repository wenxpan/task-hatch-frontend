import React from "react"
// import React, { useContext } from "react"
// import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
// import TaskContext from "../state/TaskContext"

interface MainContainerProps {
  children: React.ReactNode
}

const MainContainer: React.FC<MainContainerProps> = ({ children }) => {
  // const { isLoaded } = useContext(TaskContext)
  return (
    <>
      <main className="p-4 md:ml-64 h-auto pt-20">
        {/* {isLoaded ? <Outlet /> : <div>Loading...</div>} */}
        {children}
      </main>
      <ToastContainer />
    </>
  )
}

export default MainContainer
