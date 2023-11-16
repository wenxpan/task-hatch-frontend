import React from "react"
import { Outlet } from "react-router-dom"

// props types
interface MainContainerProps {
  toggleSidebar: () => void
  isSidebarOpen: boolean
}

const MainContainer: React.FC<MainContainerProps> = ({
  toggleSidebar,
  isSidebarOpen
}) => {
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        ></div>
      )}
      <main className="p-4 md:ml-64 h-auto pt-20">
        <Outlet />
      </main>
    </>
  )
}

export default MainContainer
