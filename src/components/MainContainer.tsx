import React from "react"
import { Outlet } from "react-router-dom"

// props types
interface MainContainerProps {
  toggleOverlay: () => void
  isOverlayOn: boolean
}

const MainContainer: React.FC<MainContainerProps> = ({
  toggleOverlay,
  isOverlayOn
}) => {
  return (
    <>
      <main className="p-4 md:ml-64 h-auto pt-20">
        <Outlet />
      </main>
      {isOverlayOn && (
        <div
          className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-30"
          onClick={toggleOverlay}
        ></div>
      )}
    </>
  )
}

export default MainContainer
