import React from "react"
import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"

interface MainContainerProps {
  isLoaded: boolean
}

const MainContainer: React.FC<MainContainerProps> = ({ isLoaded }) => {
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
